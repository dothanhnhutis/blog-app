"use client";
import Image from "next/image";
import { Combobox, Tab, Transition } from "@headlessui/react";
import React, { ChangeEvent, Fragment, useRef, useState } from "react";
import { AiOutlineCheck, AiOutlineCloudUpload } from "react-icons/ai";
import { HiChevronUpDown } from "react-icons/hi2";

import RichTextEditor from "./RichTextEditor";
import { SessionInterface } from "@/common.type";
import Model, { ModelHandle } from "./Model";
import { classNames } from "@/util";
import { BsUpload } from "react-icons/bs";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];
type PostData = {
  thumnail: string;
  title: string;
  author: string;
  content: string;
};
type Props = {
  session: SessionInterface;
  type: "create" | "edit";
  data?: PostData;
};

const CreatePostForm = ({ session, type, data }: Props) => {
  const [payload, setPayload] = useState<PostData>({
    thumnail: "",
    title: "",
    author: session.user.id,
    content: JSON.stringify([{ type: "paragraph", children: [{ text: "" }] }]),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(payload);
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (payload.thumnail) {
      setPayload({ ...payload, thumnail: "" });
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
      console.log(result);
      setPayload({ ...payload, thumnail: result });
    };
  };

  const [selected, setSelected] = React.useState(people[0]);
  const [query, setQuery] = React.useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const ref = useRef<ModelHandle>(null);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-6 p-6 rounded-lg overflow-hidden border-gray-200 border-[1px]"
      >
        <h3 className="font-bold text-xl text-gray-600 mb-4">
          Create New Post
        </h3>

        <div className="flex items-center justify-center text-gray-400 py-2 cursor-pointer w-full rounded border-dashed border-[2px] border-gray-300 mb-4">
          <label
            htmlFor=""
            className="flex flex-col items-center justify-center"
          >
            <AiOutlineCloudUpload size={48} />
            <p className="text-black text-xs">Select file to Upload</p>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleChangeImage(e)}
            />
          </label>
          <div>
            <AiOutlineCloudUpload size={48} />
            <p className="text-black font-medium text-sm">
              Select file to Upload
            </p>
          </div>
        </div>

        {session.user.role === "admin" ? (
          <Combobox value={selected} onChange={setSelected}>
            <label htmlFor="author" className="block text-lg font-medium">
              Author
            </label>
            <div className="relative mt-1 mb-4">
              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  displayValue={(person) => "asd"}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <HiChevronUpDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="absolute z-[8] mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredPeople.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredPeople.map((person) => (
                      <Combobox.Option
                        key={person.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-teal-600 text-white" : "text-gray-900"
                          }`
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {person.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
                                <AiOutlineCheck
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        ) : (
          <div>
            <label htmlFor="author" className="block text-lg font-medium">
              Author
            </label>
            <div className="flex items-center space-x-4 py-6 w-full">
              <img
                className="w-9 h-9 overflow-hidden rounded-full flex-shrink-0"
                src={`${session.user.avatarUrl ?? "/images/user-1.jpg"}`}
                alt="User Avatar"
              />
              <div className="w-full overflow-hidden">
                <p className="font-medium text-md">
                  {`${session.user.username ?? ""}`}
                </p>
                <p className="font-normal text-sm text-gray-500">
                  {`${session.user.role ?? ""}`}
                </p>
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="block text-lg font-medium" htmlFor="title">
            Title
          </label>
          <input
            className="border-[1px] border-gray-300 rounded-lg p-2 w-full mb-4 mt-2"
            type="text"
            id="title"
            onChange={(e) => setPayload({ ...payload, title: e.target.value })}
            placeholder="Input title"
          />
        </div>

        <p className="block text-lg font-medium">Content</p>

        <RichTextEditor
          init={JSON.parse(payload.content)}
          onChange={(data) =>
            setPayload({ ...payload, content: JSON.stringify(data) })
          }
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
            Create
          </button>
        </div>

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
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center text-gray-400 py-2 cursor-pointer w-[550px] h-[300px] rounded border-dashed border-[2px] border-gray-300"
                  >
                    <input
                      type="file"
                      id="image-upload"
                      name="image-upload"
                      accept="image/*"
                      className="hidden"
                      required
                      onChange={(e) => handleChangeImage(e)}
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
                        className={`absolute top-0 left-0 mt-2 ml-2`}
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
                onClick={() => {
                  ref.current?.setIsHidden(true);
                }}
                type="button"
                className="px-3 py-2 bg-red-500 rounded hover:bg-red-600 text-white disabled:bg-red-600/60"
              >
                Cancel
              </button>
              {false ? (
                <button
                  type="button"
                  className="px-3 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 disabled:bg-blue-600/60"
                >
                  Add
                </button>
              ) : (
                <p className="px-3 py-2 bg-blue-500 rounded text-white bg-blue-600/60">
                  Add
                </p>
              )}
            </div>
          </div>
        </Model>
      </form>
    </>
  );
};

export default CreatePostForm;
