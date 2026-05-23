// Login.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { addUser } from "../features/authSlice";
import { useNavigate } from "react-router";
import { loginAction } from "../features/authAction";

const Login = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let res = await axiosInstance.post("/auth/login", data);
    console.log(res);
    dispatch(loginAction(data));
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-zinc-400 text-center mb-8">Login to continue</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 text-white border border-zinc-700 outline-none focus:ring-2 focus:ring-violet-500"
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 text-white border border-zinc-700 outline-none focus:ring-2 focus:ring-violet-500"
            />

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 transition-all text-white font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-zinc-400 text-center mt-6">
          Don’t have an account?
          <span
            onClick={() => navigate("/register")}
            className="text-violet-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;