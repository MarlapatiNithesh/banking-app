"use server";
import { cookies } from "next/headers";
import { connected } from "@/database/db";
import { User } from "@/models/user.Schema";
import jwt from "jsonwebtoken";

export const registerUser = async (formData) => {
  try {
    await connected();

    const existingUser = await User.findOne({ email: formData.email });
    if (existingUser) {
      return { error: "User already exists" };
    }

    const defaultServices = ["dashboard-access", "basic-plan"];
    const newUser = new User({
      ...formData,
      services: defaultServices,
    });

    await newUser.save();

    const token = newUser.generateJWT();
    const cookiestore = cookies();
    cookiestore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      message: "User registered successfully",
      token,
    };
  } catch (error) {
    console.error("[REGISTER_USER_ERROR]", error);
    return {
      error: error?.message || "Something went wrong while registering the user",
    };
  }
};

export const loginUser = async (formData) => {
  try {
    await connected();

    const { email, password } = formData;
    const user = await User.findOne({ email });

    if (!user) {
      return { error: "User not found" };
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return { error: "Invalid email or password" };
    }

    const token = user.generateJWT();

    const cookiestore = cookies();
    cookiestore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id.toString(),
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
    };
  } catch (error) {
    console.error("[LOGIN_USER_ERROR]", error);
    return {
      error: error?.message || "Something went wrong while logging in",
    };
  }
};

export const loggedInUser = async () => {
  const cookiestore = cookies();
  const token = cookiestore.get("token");

  if (!token) {
    console.log("Token not found.");
    return null;
  }

  try {
    const userData = jwt.verify(token.value, process.env.JWT_SECRET);
    console.log(userData?.userId)
    if (!userData || !userData.userId) {
      return null;
    }
    const user = await User.findById(userData.userId);
    if(!user){
      return null;
    }
    return {
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
    };
  } catch (e) {
    console.error("Invalid or expired token", e);
    return null;
  }
};


export const logout = async () => {
  const cookiestore = cookies();
  cookiestore.delete("token"); // ✅ this works
  return { success: true, message: "Logged out successfully" };
};



