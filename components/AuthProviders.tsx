"use client";
import { getProviders, signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | undefined;
};

type Providers = Record<string, Provider>;

const AuthProviders = ({ type }: { type: "signin" | "signup" }) => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  if (providers) {
    return (
      <>
        <div className="flex mt-6 space-x-4 items-center justify-center">
          {Object.values(providers)
            .filter((provider) => provider.id !== "credentials")
            .map((provider) =>
              provider.id === "google" ? (
                <button
                  key={provider.id}
                  onClick={() => signIn(provider?.id)}
                  tabIndex={-1}
                  className="group flex items-center space-x-2 rounded-md px-4 py-2 border border-gray-300 hover:bg-gray-50"
                >
                  <FcGoogle size={20} />
                  <span className="group-hover:text-[#5D87FF]">
                    {type === "signin"
                      ? "Sign in with Google"
                      : "Sign up with Google"}
                  </span>
                </button>
              ) : (
                provider.id === "github" && (
                  <button
                    key={provider.id}
                    onClick={() => signIn(provider?.id)}
                    tabIndex={-1}
                    className="group flex items-center space-x-2 rounded-md px-4 py-2 border border-gray-300 hover:bg-gray-50"
                  >
                    <AiFillGithub size={20} />
                    <span className="group-hover:text-[#5D87FF]">
                      {type === "signin"
                        ? "Sign in with Github"
                        : "Sign up with Github"}
                    </span>
                  </button>
                )
              )
            )}
        </div>

        <div className="my-6 flex items-center before:content-[''] before:flex before:flex-1 before:border-b after:content-[''] after:flex after:flex-1 after:border-b after:border-gray-300">
          <p className="px-2 ">or sign up with</p>
        </div>
      </>
    );
  }
};

export default AuthProviders;
