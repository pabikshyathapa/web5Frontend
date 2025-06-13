import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      // Handle login
      console.log("Logging in with:", values);
    },
  });

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side Image */}
      <div className="w-1/2 bg-[#e0d8cc] flex items-center justify-center">
        <img
          src="/images/login.png" // Use your actual image path
          alt="Jewelry display"
          className="object-contain max-h-full"
        />
      </div>

      {/* Right Side Form */}
      <div className="w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-red-600 text-xl font-semibold text-center">Log In</h2>
          <p className="text-center text-black font-bold">Welcome Back!</p>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-red-600 block">Email Address</label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter your email"
                className="w-full border rounded px-4 py-2 bg-gray-100"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-red-600 block">Password</label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Enter password"
                className="w-full border rounded px-4 py-2 bg-gray-100"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500">{formik.errors.password}</p>
              )}
              <div className="text-right mt-1">
                <a href="/forgot-password" className="text-xs text-red-500 hover:underline">
                  Forgot your Password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
            >
              Log In
            </button>
          </form>

          {/* Divider */}
          <div className="text-center mt-4 text-black">Or</div>

          Social Login
          <div className="flex justify-center space-x-6">
            <button className="text-2xl">
              <img src="/images/google-icon.svg" alt="Google" className="h-8" />
            </button>
            <button className="text-2xl">
              <img src="/images/facebook-icon.svg" alt="Facebook" className="h-8" />
            </button>
          </div>

          {/* Sign Up Redirect */}
          <div className="text-center">
            <span className="text-black">Don’t have an account? </span>
            <a href="/register" className="text-red-600 hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
