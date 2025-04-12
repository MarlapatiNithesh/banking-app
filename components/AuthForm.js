"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "./user.controller";

const AuthForm = ({ type }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const newUser = await registerUser(data);
        setUser(newUser);
        if (newUser?.error) {
          setMessage({ text: newUser.error, type: "error" });
          return;
        }
        setMessage({ text: newUser?.message || "Success!", type: "success" });
      }

      if (type === "sign-in") {
        const response = await loginUser(data);
        if (response?.error) {
          setMessage({ text: response.error, type: "error" });
          return;
        }
        setMessage({ text: response?.message || "Success!", type: "success" });
        router.push("/");
      }
    } catch (e) {
      console.log(e);
      setMessage({ text: "An unexpected error occurred.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white p-8 md:p-12 rounded-xl shadow-md w-full max-w-2xl">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-2">
          <Image src="/icons/logo.svg" width={34} height={34} alt="Horizon logo" />
          <h1 className="text-2xl font-bold text-gray-900">Horizon</h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-xl lg:text-3xl font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-sm text-gray-600">
            {user ? "Link your account to get started" : "Please enter your details"}
          </p>
        </div>
      </header>

      {!user && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6 w-full">
          {type === "sign-up" && (
            <>
              <div className="flex flex-col md:flex-row gap-4">
                <InputField label="First Name" name="firstName" placeholder="Enter your first name" register={register} rules={{
                  required: "First Name is required", minLength: { value: 3, message: "Minimum 3 characters" },
                }} error={errors.firstName} />

                <InputField label="Last Name" name="lastName" placeholder="Enter your last name" register={register} rules={{
                  required: "Last Name is required", minLength: { value: 3, message: "Minimum 3 characters" },
                }} error={errors.lastName} />
              </div>

              <InputField label="Address" name="address1" placeholder="Enter your specific address" register={register} rules={{
                required: "Address is required", maxLength: { value: 50, message: "Max 50 characters" },
              }} error={errors.address1} />

              <InputField label="City" name="city" placeholder="Enter your city" register={register} rules={{
                required: "City is required", maxLength: { value: 50, message: "Max 50 characters" },
              }} error={errors.city} />

              <div className="flex flex-col md:flex-row gap-4">
                <InputField label="State" name="state" placeholder="Example: NY" register={register} rules={{
                  required: "State is required", minLength: { value: 2, message: "Use 2 letters" }, maxLength: { value: 2, message: "Use 2 letters" },
                }} error={errors.state} />

                <InputField label="Postal Code" name="postalCode" placeholder="Example: 11101" register={register} rules={{
                  required: "Postal Code is required", minLength: { value: 3, message: "Min 3 characters" }, maxLength: { value: 6, message: "Max 6 characters" },
                }} error={errors.postalCode} />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <InputField label="Date of Birth" name="dateOfBirth" placeholder="YYYY-MM-DD" register={register} rules={{
                  required: "Date of Birth is required"
                }} error={errors.dateOfBirth} />

                <InputField label="SSN" name="ssn" placeholder="Example: 1234" register={register} rules={{
                  required: "SSN is required", minLength: { value: 3, message: "Min 3 characters" },
                }} error={errors.ssn} />
              </div>
            </>
          )}

          <InputField label="Email" name="email" type="email" placeholder="Enter your email" register={register} rules={{
            required: "Email is required", pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/, message: "Invalid email address"
            },
          }} error={errors.email} />

          <InputField label="Password" name="password" type="password" isPassword showPassword={showPassword} setShowPassword={setShowPassword} placeholder="Enter your password" register={register} rules={{
            required: "Password is required", minLength: { value: 8, message: "Minimum 8 characters" },
          }} error={errors.password} />

          <div className="flex flex-col gap-4 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : type === "sign-in" ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          {message.text && (
            <p
              className={`text-center text-sm mt-4 ${message.type === "success" ? "text-green-500" : "text-red-500"}`}
            >
              {message.text}
            </p>
          )}

          {type === "sign-in" && (
            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link href="/sign-up" className="text-blue-600 hover:underline">Sign up</Link>
            </p>
          )}

          {type === "sign-up" && (
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-blue-600 hover:underline">Sign in</Link>
            </p>
          )}
        </form>
      )}
    </section>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  rules = {},
  error,
  isPassword = false,
  showPassword,
  setShowPassword,
}) => (
  <div className="w-full relative">
    <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={name}
      type={isPassword ? (showPassword ? "text" : "password") : type}
      {...register(name, rules)}
      placeholder={placeholder}
      className="w-full px-4 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm placeholder-gray-400"
    />
    {isPassword && (
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-800"
      >
        {showPassword ? "🙈" : "👁️"}
      </button>
    )}
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default AuthForm;
