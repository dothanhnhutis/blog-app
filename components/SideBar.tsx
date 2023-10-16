import React from "react";
import { sideBarData } from "@/constants";
import SideBarAction from "./SideBarAction";

const SideBar = () => {
  return (
    <div className="flex-shrink-0 w-[64px] xl:w-[220px] m-2 bg-white shadow-xl rounded-xl p-2">
      <ul>
        {sideBarData.map((s, index) => (
          <li key={index}>
            <SideBarAction {...s} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
