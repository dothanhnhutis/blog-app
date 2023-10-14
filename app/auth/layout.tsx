import { getCurrentUser } from "@/util/session";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const userCurr = await getCurrentUser();
  if (userCurr && userCurr.user) {
    return redirect("/manager");
  }
  return (
    <div className="flex w-full h-screen items-center justify-center bg-auth overflow-scroll">
      <div className="bg-white opacity-100 shadow rounded-lg p-8 min-w-[480px]">
        <div className="flex items-center justify-center w-full">
          <div className="relative w-[110px] h-[110px]">
            <Image
              priority
              src="/images/logo.png"
              fill
              sizes="110"
              alt="Logo"
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
