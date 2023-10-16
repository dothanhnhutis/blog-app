import Image from "next/image";
import React from "react";
import { FiFileText, FiUserCheck } from "react-icons/fi";
import { SlSocialFacebook } from "react-icons/sl";
import { BiChevronLeft, BiChevronRight, BiLogoTiktok } from "react-icons/bi";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import PostCard from "@/components/PostCard";

const Profile = () => {
  return (
    <>
      <div className="rounded-lg overflow-hidden mb-6">
        <div className="relative w-full h-[330px]">
          <Image src="/images/profilebg.jpg" alt="thumnail" fill sizes="" />
        </div>
        <div className="relative bg-white flex flex-wrap xl:flex-nowrap tems-center justify-center">
          <div className="flex items-center justify-around m-6 gap-2 order-2 basis-5/12 xl:basis-1/3 xl:max-w-1/3 flex-grow-0 xl:order-none">
            <div className="flex flex-col items-center justify-center">
              <FiFileText size={20} />
              <p className="text-2xl font-bold">900</p>
              <p className="text-xl font-light">Posts</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <FaRegUserCircle size={20} />
              <p className="text-2xl font-bold">900</p>
              <p className="text-xl font-light">Followers</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <FiUserCheck size={20} />
              <p className="text-2xl font-bold">900</p>
              <p className="text-xl font-light">Following</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center basis-full xl:basis-1/3 xl:max-w-1/3 flex-grow-0 mt-[-85px]">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full overflow-hidden p-2">
              <div className="relative w-[92px] h-[92px] rounded-full overflow-hidden ring-4 ring-white">
                <Image
                  src="/images/user-2.jpg"
                  alt="thumnail"
                  fill
                  sizes="92"
                />
              </div>
            </div>
            <h4 className="text-xl font-medium">Julia Roberts</h4>
            <p className="text-sm font-normal">Project Manager</p>
          </div>

          <div className="flex items-center justify-center m-4 gap-3 order-3 xl:order-none basis-full xl:basis-1/3 xl:max-w-1/3 flex-grow-0">
            <div className="text-white bg-blue-500 p-2 rounded-full">
              <SlSocialFacebook size={16} />
            </div>
            <div className="text-white bg-black p-2 rounded-full">
              <BiLogoTiktok size={16} />
            </div>
            <div className="text-white bg-red-600 p-2 rounded-full">
              <AiOutlineYoutube size={16} />
            </div>
          </div>
        </div>
        <div className="bg-gray-100 flex justify-end items-center order-1 basis-full xl:order-none">
          adasd
        </div>
      </div>
      <div className="flex flex-wrap -mt-6 -ml-6">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
      <div className="flex items-center justify-center mt-6">
        <nav>
          <ul className="flex items-center justify-center space-x-1">
            <li>
              <button
                disabled
                className="p-2 rounded-full disabled:text-gray-500 text-gray-700 hover:bg-gray-200 disabled:bg-transparent"
              >
                <BiChevronLeft size={20} />
              </button>
            </li>
            <li>
              <button className="w-9 h-9 rounded-full text-white bg-blue-400 hover:bg-blue-600">
                <span>1</span>
              </button>
            </li>
            <li>
              <button className="w-9 h-9 rounded-full text-gray-500 hover:bg-gray-100">
                <span>2</span>
              </button>
            </li>
            <li>
              <div className="w-9 h-9 text-center">...</div>
            </li>

            <li>
              <button className="p-2 rounded-full disabled:text-gray-500 text-gray-700 hover:bg-gray-200 disabled:bg-transparent">
                <BiChevronRight size={24} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Profile;
