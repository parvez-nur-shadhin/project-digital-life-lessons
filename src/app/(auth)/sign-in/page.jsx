"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { data: res, error } = await authClient.signIn.email({
      email: data.email, // required
      password: data.password, // required
      rememberMe: true,
      callbackURL: "/",
    });

    if (res) {
      toast.success("You've signed in successfully");
    } else if (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    // This single line handles the entire Google redirect!
    await authClient.signIn.social({
      provider: "google",
    });

    if (error) {
      console.error("Google login failed:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <h1 className="text-center text-lg font-bold">
            Join Digital Life Lessons
          </h1>
          <p className="text-center">
            Your personal archive for growth, insights, and wisdom. Login to
            your account today and never lose a life lesson.
          </p>

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Enter Your Email..."
            {...register("email")}
          />

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter Your Password..."
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Length must be at least 6 characters",
                },
                validate: {
                  hasUpperCase: (value) =>
                    /[A-Z]/.test(value) || "Must have an uppercase letter",
                  hasLowerCase: (value) =>
                    /[a-z]/.test(value) || "Must have a lowercase letter",
                },
              })}
            />
            {errors.password && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.password.message}
                </span>
              </label>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-neutral bg-[#355dcb] text-white mt-4"
          >
            Sign In
          </button>
          <h1 className="text-center text-lg font-bold">Or</h1>
          <button
            onClick={handleGoogleLogin}
            className="btn bg-white text-black border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Sign In with Google
          </button>
          <h1 className="mt-4">
            Don't Have an Account?{" "}
            <Link href={"/sign-up"}>
              <span className="text-[#355dcb] hover:underline">Sign Up</span>
            </Link>
          </h1>
        </fieldset>
      </form>
    </div>
  );
};

export default SignInPage;
