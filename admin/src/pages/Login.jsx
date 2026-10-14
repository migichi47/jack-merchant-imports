import React from "react";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-120 mx-auto my-auto flex flex-col px-5 h-screen mt-30 space-y-20">
      <Logo />
      <div className="space-y-5">
        <div className="space-y-3">
          <h1 className="capitalize font-bold text-4xl">Welcome back</h1>
          <p className="text-gray-500 text-[15px] font-semibold">
            Sign in to manage customer enquiries and past imports.
          </p>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              placeholder="johndoe@example.com"
              className="border border-gray-300 rounded-lg px-3 text-xs h-10 outline-pink-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="border border-gray-300 rounded-lg px-3 text-xs h-10 outline-pink-500"
            />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="cursor-pointer" />
              <span className="text-zinc-600 text-sm">Remember Me</span>
            </div>
            <span className="text-pink-500 hover:underline cursor-pointer text-sm">
              Forgot Password
            </span>
          </div>
        </div>

        <Button onClick={() => navigate("/")}>Sign In</Button>
      </div>
    </div>
  );
};

export default Login;
