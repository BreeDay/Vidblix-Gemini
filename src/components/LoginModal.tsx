"use client";
import React, { useState } from "react";
import { auth } from "../lib/firebase/clientApp";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let email = e.currentTarget.email.value;
    let password = e.currentTarget.password.value;

    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        router.push("/configure/upload");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleSignUp = () => {
    let email = document.getElementsByName("email")[0] as HTMLInputElement;
    let password = document.getElementsByName(
      "password"
    )[0] as HTMLInputElement;

    setLoading(true);

    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setLoading(false);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        router.push("/configure/upload");
        setLoading(false);
        // ..
      });
  };
  return (
    <div className="w-full h-full absolute top-0 backdrop-filter backdrop-brightness-75 backdrop-blur-md flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow px-16">
        <div className="p-5">
          <h3 className="text-2xl mb-0.5 font-medium"></h3>
          <p className="mb-4 text-sm font-normal text-gray-800"></p>

          <div className="text-center">
            <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
              Login to your account
            </p>
            <p className="mt-2 text-sm leading-4 text-slate-600">
              You must be logged in to perform this action.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-2">
            <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
              <Image
                width={100}
                height={100}
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-[18px] w-[18px]"
              />
              Continue with Google
            </button>
          </div>

          <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
            <div className="h-px w-full bg-slate-200"></div>
            OR
            <div className="h-px w-full bg-slate-200"></div>
          </div>

          <form className="w-full" onSubmit={handleSignIn}>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              placeholder="Email Address"
            />
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              placeholder="Password"
            />
            <p className="mb-3 mt-2 text-sm text-gray-500">
              <a
                href="/forgot-password"
                className="text-blue-800 hover:text-blue-600"
              >
                Reset your password?
              </a>
            </p>
            <button
              type="submit"
              // onClick={handleSignIn}
              className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
            >
              Continue
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account? <br />
            <button
              type="button"
              className="font-medium text-[#4285f4]"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
            <p className="text-center">{loading ? "Signing in..." : ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
console.log("Login Modal");
