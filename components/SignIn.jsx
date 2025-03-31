"use client";
import React, { useContext } from "react";
import { AuthContext } from "@/lib/context/auth-context";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const { googleLoginHandler } = useContext(AuthContext);
  return (
    <main className="container max-w-2xl mx-auto px-6">
      <h1 className="mb-6 text-6xl font-bold text-center">Welcome 🧤</h1>
      <div className="flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rouneded-2xl">
        <div className="h-52">
          <img
            className="object-cover w-full h-full"
            src="https://images.pexels.com/photos/5898313/pexels-photo-5898313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>

        <div className="p-4">
          <h3 className="text-2xl text-center">Sign In to Continue</h3>
          <button
            onClick={googleLoginHandler}
            className="flex self-start gap-2 p-4 mx-auto mt-6 font-medium align-middle bg-gray-700 rounded-2xl"
          >
            <FcGoogle className="text-2xl" />
            Google
          </button>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
