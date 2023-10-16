import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disclosure, Transition } from "@headlessui/react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { PiDotOutlineLight } from "react-icons/pi";
import { SiderBarActionType } from "@/common.type";

const SideBarAction = ({ type, data }: SiderBarActionType) => {
  const pathName = usePathname();
  if (type === "number") {
    const { icon, name, path, count } = data;
    return (
      <Link href={path} className="relative group">
        <div
          className={`relative flex items-center justify-center px-[10px] py-2 mb-0.5 rounded-lg${
            pathName === path
              ? " text-white bg-[#5d87ff]"
              : " hover:bg-[#ecf2ff] hover:text-[#5d87ff]"
          } `}
        >
          <div className="xl:min-w-[36px] py-[4px]">{icon}</div>
          <p className="truncate my-[4px] flex-auto hidden xl:block">{name}</p>
          <div className="hidden xl:inline-flex items-center justify-center px-2 bg-sky-400 text-white rounded-full ">
            <span className="max-w-[40px] truncate">
              {count > 99 ? "99+" : count}
            </span>
          </div>
        </div>
        <span className="xl:hidden absolute top-0 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
        </span>
        <div className="hidden group-hover:block xl:group-hover:hidden pl-[13px] absolute left-full top-2 z-[5] before:content-[''] before:absolute before:left-[9px] before:top-3 before:z-[-1] before:rotate-45  before:h-2 before:w-2 before:bg-[#4D4D4D]">
          <div className="bg-[#4D4D4D] text-white px-2 py-1 rounded-lg">
            <p className="text-sm font-normal">{name}</p>
          </div>
        </div>
      </Link>
    );
  }
  if (type === "list") {
    const { icon, list, name } = data;
    return (
      <>
        <Disclosure>
          {({ open }) => (
            <div className="hidden xl:block">
              <Disclosure.Button
                as="div"
                className={`flex items-center justify-center px-[10px] py-2 mb-0.5 rounded-lg${
                  list.some((l) => l.path === pathName)
                    ? " text-white bg-[#5d87ff]"
                    : " hover:bg-[#ecf2ff] hover:text-[#5d87ff]"
                }`}
              >
                <div className="xl:min-w-[36px] py-[4px]">{icon}</div>
                <p className="truncate my-[4px] flex-auto hidden xl:block">
                  {name}
                </p>
                <div className="hidden xl:block">
                  {open ? (
                    <BiChevronUp size={20} />
                  ) : (
                    <BiChevronDown size={20} />
                  )}
                </div>
              </Disclosure.Button>

              <Transition
                className="grid"
                enter="[transition:grid-template-rows_250ms]"
                enterFrom="grid-rows-[0fr]"
                enterTo="grid-rows-[1fr]"
                leave="[transition:grid-template-rows_300ms]"
                leaveFrom="grid-rows-[1fr]"
                leaveTo="grid-rows-[0fr]"
              >
                <Disclosure.Panel>
                  <ul className={`overflow-hidden`}>
                    {list.map((l, index) => (
                      <li key={index}>
                        <Link href={l.path}>
                          <div
                            className={`flex items-center justify-center px-[10px] py-2 mb-0.5 rounded-lg${
                              pathName === l.path
                                ? " text-[#5d87ff]"
                                : " hover:bg-[#ecf2ff] hover:text-[#5d87ff]"
                            }`}
                          >
                            <div className="min-w-[36px] py-[4px]">
                              <PiDotOutlineLight size={20} />
                            </div>
                            <div className="my-[4px] flex-auto">
                              <p className="truncate">{l.name}</p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
        <div className="xl:hidden relative group">
          <div
            className={`flex items-center justify-center px-[10px] py-2 mb-0.5 rounded-lg${
              list.some((l) => l.path === pathName)
                ? " text-white bg-[#5d87ff]"
                : " hover:bg-[#ecf2ff] hover:text-[#5d87ff]"
            }`}
          >
            <div className="xl:min-w-[36px] py-[4px]">{icon}</div>
            <p className="truncate my-[4px] flex-auto hidden xl:block">
              {name}
            </p>
          </div>
          <div className="hidden group-hover:block xl:group-hover:hidden absolute left-full top-0 z-[5]">
            <div className="bg-white border shadow py-2 px-1 rounded-lg min-w-[48px]">
              <p className="text-xs font-normal my-[4px] pl-2 text-gray-500">
                {name}
              </p>
              <ul>
                {list.map((l, index) => (
                  <li key={index}>
                    <Link href={l.path}>
                      <div
                        className={`flex items-center justify-center px-2 py-1 mb-0.5 rounded-lg${
                          pathName === l.path
                            ? " text-[#5d87ff]"
                            : " hover:bg-[#ecf2ff] hover:text-[#5d87ff]"
                        }`}
                      >
                        <div className="my-[4px] flex-auto">
                          <p className="truncate">{l.name}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
  const { icon, name, path } = data;
  return (
    <Link href={path} className="relative group">
      <div
        className={`flex items-center justify-center px-[10px] py-2 mb-0.5 rounded-lg${
          pathName === path
            ? " text-white bg-[#5d87ff]"
            : " hover:bg-[#ecf2ff] hover:text-[#5d87ff]"
        }`}
      >
        <div className="xl:min-w-[36px] py-[4px] ">{icon}</div>
        <p className="truncate my-[4px] flex-auto hidden xl:block">{name}</p>
      </div>
      <div className="hidden group-hover:block xl:group-hover:hidden pl-[13px] absolute left-full top-2 z-[5] before:content-[''] before:absolute before:left-[9px] before:top-3 before:z-[-1] before:rotate-45  before:h-2 before:w-2 before:bg-[#4D4D4D]">
        <div className="bg-[#4D4D4D] text-white px-2 py-1 rounded-lg">
          <p className="text-sm font-normal whitespace-nowrap">{name}</p>
        </div>
      </div>
    </Link>
  );
};

export default SideBarAction;
