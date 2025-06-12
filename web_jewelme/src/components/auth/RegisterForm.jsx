import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegisterUser as userRegisterUserTan } from "../../hooks/useRegisteruser";

export default function RegisterForm() {
  const { mutate, data, error, isLoading, isSuccess, isError } = userRegisterUserTan();

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = {
        username: values.username,
        firstName: values.firstname,
        lastName: values.lastname,
        email: values.email,
        password: values.password,
      };

      mutate(formData, {
        onSuccess: () => {
          alert("Registration successful!");
          formik.resetForm();
        },
        onError: (err) => {
          alert("Registration failed: " + (err.message || "Unknown error"));
        },
      });
    },
  });

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side Image */}
      <div className="w-1/2 bg-[#e0d8cc] flex items-center justify-center">
        <img
          src="/images/register.png" // Replace with your actual image path
          alt="Jewelry model"
          className="object-contain max-h-full"
        />
      </div>

      {/* Right Side Form */}
<div className="w-1/2 flex items-center justify-center p-10">
  <div className="w-full max-w-md space-y-4">
    <h2 className="text-red-600 text-xl font-semibold text-center">Create Account</h2>
    <p className="text-center text-gray-800">Create an account for faster checkout.</p>

    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {/* First Name */}
      <div>
        <label className="text-red-600 block">Name</label>
        <input
          type="text"
          name="firstname"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstname}
          placeholder="Enter your name"
          className="w-full border rounded px-4 py-2 bg-gray-100"
        />
        {formik.touched.firstname && formik.errors.firstname && (
          <p className="text-sm text-red-500">{formik.errors.firstname}</p>
        )}
      </div>

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
        <label className="text-red-600 block">Create Password</label>
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
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
      >
        {isLoading ? "Registering..." : "Sign Up"}
      </button>
    </form>

    <div className="text-center mt-4 text-gray-800">Or</div>

    <div className="text-center">
      <span className="text-black">Don’t have an account? </span>
      <a href="/login" className="text-red-600 hover:underline">Log In</a>
    </div>

    {isSuccess && <p className="text-green-600 text-center">Successfully registered!</p>}
    {isError && <p className="text-red-600 text-center">{error.message}</p>}
  </div>
</div>
/</div>
  );
}
