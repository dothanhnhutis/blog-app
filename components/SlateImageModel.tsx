"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import { BsUpload } from "react-icons/bs";
import Model, { ModelHandle } from "./Model";
import { classNames } from "@/util";
import { MdAddPhotoAlternate } from "react-icons/md";

const SlateImageModel = () => {
  const ref = useRef<ModelHandle>(null);
  return (
    <>
      <button
        onClick={() => {
          ref.current?.setIsHidden(false);
        }}
        className={`p-2 rounded-full cursor-pointer ${
          false
            ? "hover:bg-sky-100 text-sky-500"
            : "hover:bg-gray-100 text-gray-500"
        }`}
      >
        <MdAddPhotoAlternate size={24} />
      </button>
      {ref.current?.getState() && (
        <Model ref={ref}>
          <div className="flex flex-col space-y-2">
            <p className="text-base font-medium mb-2">Insert Image</p>
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
                  Upload
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
                  In Labrary
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <label
                    htmlFor="thumbnail"
                    className="flex flex-col items-center justify-center text-gray-400 py-2 cursor-pointer w-[550px] h-[300px] rounded border-dashed border-[2px] border-gray-300"
                  >
                    <>
                      <BsUpload size={36} />
                      <p className="font-medium text-sm">
                        Select file to Upload
                      </p>
                    </>
                    <input
                      type="file"
                      id="thumbnail"
                      name="image"
                      accept="image/*"
                      className="hidden"
                    />
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
                        Select file to Upload
                      </p>

                      <input
                        type="file"
                        id="thumbnail"
                        name="image"
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                    <div className="relative group">
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
                        className="hidden group-hover:block absolute top-0 left-0 mt-2 ml-2"
                        type="checkbox"
                      />
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            <input
              className="rounded-md border p-2"
              required
              type="text"
              name=""
              placeholder="Caption"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-3 py-2 bg-red-500 rounded hover:bg-red-600 text-white disabled:bg-red-600/60"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 disabled:bg-blue-600/60"
              >
                Add
              </button>
            </div>
          </div>
        </Model>
      )}
    </>
  );
};

export default SlateImageModel;
