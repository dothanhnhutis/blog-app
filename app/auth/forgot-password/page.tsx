"use client";
import { useOutsideClick } from "@/hook/useOutsideClick";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { z } from "zod";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");

  const [isOnFocusEmailField, setOnFocusEmailField] = useState<boolean>(false);
  const refEmail = useOutsideClick<HTMLInputElement>((isOutSide) => {
    setOnFocusEmailField(!isOutSide);
  });

  return (
    <>
      <h6 className="text-center font-normal text-sm mt-6">
        <p>Please enter the email address associated with your account and</p>
        <p>We will email you a link to reset your password.</p>
      </h6>

      <form className="mt-8">
        <div className="flex flex-col mb-3">
          <label className="text-base font-medium pb-1" htmlFor="email">
            Email
          </label>
          <input
            ref={refEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            autoCapitalize="false"
            className="p-2 border rounded-md overflow-hidden"
          />
          {!isOnFocusEmailField &&
            email.length > 0 &&
            !z.string().email().safeParse(email).success && (
              <p className="text-red-500 font-normal text-xs">
                Enter a valid email address
              </p>
            )}
        </div>

        {email.length > 0 && z.string().email().safeParse(email).success ? (
          <button
            className="rounded-lg bg-[#5d87ff] text-white py-2 w-full"
            type="submit"
          >
            Forgot Password
          </button>
        ) : (
          <p className="rounded-lg bg-[#5d87ff] text-white py-2 w-full text-center opacity-60">
            Forgot Password
          </p>
        )}
      </form>

      <Link
        href="/auth/signin"
        className="block rounded-lg text-indigo-500 bg-indigo-50 py-2 w-full text-center hover:bg-[#5d87ff] hover:text-white mt-3"
      >
        Back to Sign In
      </Link>
    </>
  );
};

export default ForgotPassword;
