import React from "react";
import CreatePostForm from "@/components/CreatePostForm";
import { getCurrentUser } from "@/util/session";

const CreateNewPost = async () => {
  const session = await getCurrentUser();
  return (
    <div>
      <div className="relative bg-[#ecf2ff] rounded-xl overflow-hidden px-[25px] pt-[30px] pb-5 mb-6">
        <h4 className="font-semibold text-2xl">Blog app</h4>
        <h6 className="font-normal text-lg">Create new post now</h6>
        <div className="absolute right-[20px] top-0 w-[165px] h-[165px] ">
          <img src="/images/mediachat.png" alt="mediachat" />
        </div>
      </div>
      <CreatePostForm session={session} type="create" />
    </div>
  );
};

export default CreateNewPost;
