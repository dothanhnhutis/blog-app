"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SessionInterface } from "@/common.type";
import { MdOutlineNotificationsActive } from "react-icons/md";
import UserMenu from "../UserMenu";
import SideBar from "../SideBar";

const AdminLayout = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionInterface;
}) => {
  return (
    <div className="relative bg-white h-screen overflow-hidden ">
      <header className="h-[70px] flex items-center sticky top-0 left-0 right-0 bg-white z-[9]">
        <div className="flex items-center justify-between px-6 w-full">
          <Link href="/manager">
            <Image
              src="/images/logo.png"
              width={56}
              height={56}
              alt="I.C.H logo"
            />
          </Link>

          <div className="flex items-center justify-center space-x-2">
            <button className="rounded-full overflow-hidden p-3 hover:bg-gray-100">
              <MdOutlineNotificationsActive size={20} />
            </button>

            <UserMenu session={session} />
          </div>
        </div>
      </header>
      <div className="flex h-[calc(100vh_-_70px)]">
        <SideBar />
        <div className="flex-auto overflow-scroll">
          <div className="xl:max-w-7xl xl:mx-auto px-6 pb-16">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
