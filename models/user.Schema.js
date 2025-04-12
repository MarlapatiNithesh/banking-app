import mongoose from "mongoose";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";


const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address1: String,
  city: String,
  state: String,
  postalCode: String,
  dateOfBirth: String,
  ssn: String,
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });


UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (e) {
    next(e);
  }
});


UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


UserSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


export const User = mongoose.models.User || mongoose.model("User", UserSchema);
