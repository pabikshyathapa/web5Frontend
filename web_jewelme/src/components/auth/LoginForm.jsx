import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
  try {
    const response = await axios.post("http://localhost:5050/api/auth/login", {
      email: values.email,
      password: values.password,
    });

    if (response.data.success) {
      const userData = response.data.data;
      console.log("User Data:", userData); 

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("userId", userData._id); 


      toast.success("Login successful!", { position: "top-center" });

      setTimeout(() => {
        if (userData.role === "admin") {
          navigate("/admins/categoryy");
        } else {
          navigate("/dashboard");
        }
      }, 800);
    } else {
      setLoginError("Invalid email or password.");
    }
  } catch (err) {
    console.error("Login error:", err);
    setLoginError("Invalid email or password.");
  }
},
  });

  //   onSubmit: async (values) => {
  //     try {
  //       const response = await axios.post("http://localhost:5050/api/auth/login", {
  //         email: values.email,
  //         password: values.password,
  //       });

  //       if (response.data.success) {
  //         // Save token and user data
  //         localStorage.setItem("token", response.data.token);
  //         localStorage.setItem("user", JSON.stringify(response.data.data));

  //         setLoginError(""); 

  //         toast.success("Login successful!", { position: "top-center" });

  //         // Redirect after short delay
  //         setTimeout(() => {
  //           navigate("/dashboard");
  //         }, 800);
  //       } else {
  //         setLoginError("Invalid email or password.");
  //       }
  //     } catch (err) {
  //       console.error("Login error:", err);
  //       setLoginError("Invalid email or password.");
  //     }
  //   },
  // });

  return (
    <div className="flex min-h-screen bg-white">
      <ToastContainer />

      {/* Left Side Image */}
      <div className="w-1/2 bg-[#e0d8cc] flex items-center justify-center">
        <img
          src="/images/login.png"
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

            {/* Login error message */}
            {loginError && (
              <p className="text-sm text-red-500 text-center">{loginError}</p>
            )}

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
