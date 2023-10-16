"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Tab } from "@headlessui/react";
import { MdAddPhotoAlternate } from "react-icons/md";
import Image from "next/image";
import { BsUpload } from "react-icons/bs";
import Model, { ModelHandle } from "./Model";
import { classNames } from "@/util";
import { Transforms } from "slate";
import { SlateBlockImage, SlateCustomEditor } from "@/common.type";
import { useSlate } from "slate-react";

const insertImage = (
  editor: SlateCustomEditor,
  url: string,
  caption: string
) => {
  const text = { text: "" };
  const image: SlateBlockImage = {
    type: "image",
    url,
    caption,
    children: [text],
  };
  Transforms.insertNodes(editor, image);
};

const SlateImage = () => {
  const editor = useSlate();
  const ref = useRef<ModelHandle>(null);
  const [data, setData] = useState<{ caption: string; image: string }>({
    caption: "",
    image: "",
  });

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (data.image) {
      setData({ ...data, image: "" });
    }
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      alert("Please upload an image!");

      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;
      setData({ ...data, image: result });
    };
  };

  const handleAddBtn = () => {
    if (data.caption.length > 0 && data.image.length > 0) {
      insertImage(editor, data.image, data.caption);
      ref.current?.setIsHidden(true);
      setData({
        caption: "",
        image: "",
      });
    }
  };

  return (
    <>
      <button
        onClick={() => {
          ref.current?.setIsHidden(false);
          setData({
            caption: "",
            image: "",
          });
        }}
        className={`p-2 rounded-full cursor-pointer ${
          false
            ? "hover:bg-sky-100 text-sky-500"
            : "hover:bg-gray-100 text-gray-500"
        }`}
      >
        <MdAddPhotoAlternate size={24} />
      </button>
      <Model ref={ref}>
        <div className="flex flex-col space-y-2">
          <p className="text-base font-medium mb-2">Thêm ảnh</p>
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-[#ecf2ff] p-1">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#5d87ff] outline-none",
                    selected
                      ? "bg-white shadow"
                      : "hover:bg-indigo-200 hover:text-white"
                  )
                }
              >
                Tập tin cục bộ
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#5d87ff] outline-none",
                    selected
                      ? "bg-white shadow"
                      : "hover:bg-indigo-200 hover:text-white"
                  )
                }
              >
                Trung tâm phương tiện
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center text-gray-400 py-2 cursor-pointer w-[550px] h-[300px] rounded border-dashed border-[2px] border-gray-300"
                >
                  {!data.image && (
                    <>
                      <BsUpload size={36} />
                      <p className="font-medium text-sm">Tải ảnh lên</p>
                    </>
                  )}

                  <input
                    type="file"
                    id="image-upload"
                    name="image-upload"
                    accept="image/*"
                    className="hidden"
                    required
                    onChange={(e) => handleChangeImage(e)}
                  />
                  {data.image && (
                    <div className="relative object-contain w-[300px] h-[300px]">
                      <Image fill src={data.image} alt="Thumnail" />
                    </div>
                  )}
                </label>
              </Tab.Panel>
              <Tab.Panel>
                <div className="grid grid-flow-row gap-2 grid-cols-5 overflow-y-scroll w-[550px] h-[300px] p-2 border rounded-md">
                  <label
                    htmlFor="thumbnail"
                    className="flex flex-col items-center justify-center text-gray-400 py-2 cursor-pointer w-[100px] h-[100px] rounded border-dashed border-[2px] border-gray-300 mb-4"
                  >
                    <BsUpload size={24} />
                    <p className="text-center font-medium text-sm">
                      Tải ảnh lên
                    </p>

                    <input
                      type="file"
                      id="thumbnail"
                      name="image"
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                  <div
                    onClick={() => {
                      if (
                        data.image === "https://source.unsplash.com/kFrdX5IeQzI"
                      ) {
                        setData({
                          ...data,
                          image: "",
                        });
                      } else {
                        setData({
                          ...data,
                          image: "https://source.unsplash.com/kFrdX5IeQzI",
                        });
                      }
                    }}
                    className="relative group"
                  >
                    <div className="relative h-[100px] w-full rounded overflow-hidden">
                      <Image
                        alt="image"
                        src="https://source.unsplash.com/kFrdX5IeQzI"
                        fill
                        sizes="100"
                      />
                    </div>
                    <p>image name</p>
                    <input
                      checked={
                        data.image === "https://source.unsplash.com/kFrdX5IeQzI"
                      }
                      className={`${
                        data.image === "https://source.unsplash.com/kFrdX5IeQzI"
                          ? ""
                          : "hidden group-hover:block"
                      } absolute top-0 left-0 mt-2 ml-2`}
                      type="checkbox"
                    />
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          <input
            value={data.caption}
            onChange={(e) => setData({ ...data, caption: e.target.value })}
            className="rounded-md border p-2"
            required
            type="text"
            name=""
            placeholder="Tiêu đề"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                ref.current?.setIsHidden(true);
              }}
              type="button"
              className="px-3 py-2 bg-red-500 rounded hover:bg-red-600 text-white disabled:bg-red-600/60"
            >
              Huỷ
            </button>
            {data.caption.length > 0 && data.image.length > 0 ? (
              <button
                onClick={() => handleAddBtn()}
                type="button"
                className="px-3 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 disabled:bg-blue-600/60"
              >
                Thêm
              </button>
            ) : (
              <p className="px-3 py-2 bg-blue-500 rounded text-white bg-blue-600/60">
                Thêm
              </p>
            )}
          </div>
        </div>
      </Model>
    </>
  );
};

export default SlateImage;
