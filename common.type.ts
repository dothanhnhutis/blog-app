import { User, Session } from "next-auth";

export type SiderBarActionType =
  | {
      type: "default";
      data: {
        icon: JSX.Element;
        name: string;
        path: string;
      };
    }
  | {
      type: "number";
      data: {
        icon: JSX.Element;
        name: string;
        path: string;
        count: number;
      };
    }
  | {
      type: "list";
      data: {
        icon: JSX.Element;
        name: string;
        list: {
          path: string;
          name: string;
        }[];
      };
    };

export type LoginSubmit = {
  email: string;
  password: string;
};

export type RegisterSubmit = LoginSubmit & {
  otp: string;
};

export type NavBarLink = {
  link: string;
  name: string;
  sublinks?: SubLink[];
};

export type SubLink = {
  link: string;
  name: string;
};

export type UserProfile = {
  id: string;
  username: string;
  email: string;
  role: string;
  avatarUrl: string;
  password?: string;
  updatedAt: string;
  createdAt: string;
};

export type OTPSearch = {
  id: string;
  code: string;
  type: string;
  verified: boolean;
  email: string;
  expireAt: string;
  updatedAt: string;
  createdAt: string;
};

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    role: string;
    username: string;
    email: string;
    avatarUrl: string;
  };
}

// Slate Type
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";
export type SlateCustomEditor = BaseEditor & ReactEditor & HistoryEditor;
export type SlateLeafText = {
  text: string;
};
export type SlateLeaf = SlateLeafText & {
  text: string;
  bold?: true;
  italic?: true;
  underline?: true;
  url?: string;
};
export type SlateBlockListItem = {
  type: "list-item";
  children: SlateLeaf[];
};

export type SlateBlockImage = {
  type: "image";
  url: string;
  caption: string;
  children: SlateLeafText[];
};
export type SlateCustomElement =
  | SlateBlockListItem
  | SlateBlockImage
  | {
      type: "paragraph";
      children: SlateLeaf[];
    }
  | {
      type: "header-one";
      children: SlateLeaf[];
    }
  | {
      type: "header-two";
      children: SlateLeaf[];
    }
  | {
      type: "header-three";
      children: SlateLeaf[];
    }
  | {
      type: "header-four";
      children: SlateLeaf[];
    }
  | {
      type: "header-five";
      children: SlateLeaf[];
    }
  | {
      type: "header-six";
      children: SlateLeaf[];
    }
  | {
      type: "numbered-list";
      children: SlateBlockListItem[];
    }
  | {
      type: "bulleted-list";
      children: SlateBlockListItem[];
    };
export type SlateHeaderDropDownType = {
  id: number;
  name: string;
  style: Exclude<SlateCustomElement["type"], "image" | "list-item">;
};
