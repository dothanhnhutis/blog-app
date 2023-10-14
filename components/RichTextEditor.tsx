"use client";
import React, { useCallback } from "react";
import { Descendant } from "slate";
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";

import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import {
  MdFormatUnderlined,
  MdOutlineAddLink,
  MdOutlineFormatBold,
  MdOutlineFormatItalic,
} from "react-icons/md";
import { createEditor } from "slate";
import {
  SlateCustomEditor,
  SlateCustomElement,
  SlateLeaf,
} from "@/common.type";
import Link from "next/link";
import Image from "next/image";
import SlateMarkButton from "./SlateMarkButton";
import SlateBlockButton from "./SlateBlockButton";

import SlateHeaderDropDown from "./SlateHeaderDropDown";
import SlateImage from "./SlateImage";
import SlateImageBlock from "./SlateImageBlock";

declare module "slate" {
  interface CustomTypes {
    Editor: SlateCustomEditor;
    Element: SlateCustomElement;
    Text: SlateLeaf;
  }
}

const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
    case "header-one":
      return (
        <h1
          className="block text-center text-2xl font-medium mb-6 text-blue-400"
          {...attributes}
        >
          {children}
        </h1>
      );
    case "header-two":
      return (
        <h2 className="text-xl text-red-500 font-bold mb-3" {...attributes}>
          {children}
        </h2>
      );
    case "header-three":
      return (
        <h3 className="text-lg text-blue-400 font-bold mb-3" {...attributes}>
          {children}
        </h3>
      );
    case "header-four":
      return <h4 {...attributes}>{children}</h4>;
    case "header-five":
      return <h5 {...attributes}>{children}</h5>;
    case "header-six":
      return <h6 {...attributes}>{children}</h6>;
    case "bulleted-list":
      return (
        <ul
          className="text-base font-light text-black-100 mb-3 list-disc ml-5 space-y-2"
          {...attributes}
        >
          {children}
        </ul>
      );
    case "numbered-list":
      return (
        <ol
          className="text-base font-light text-black-100 mb-3 list-decimal ml-5 space-y-2"
          {...attributes}
        >
          {children}
        </ol>
      );
    case "list-item":
      return <li {...attributes}>{children}</li>;

    case "image":
      return (
        <SlateImageBlock
          attributes={attributes}
          element={element}
          children={children}
        />
      );
    default:
      return (
        <p
          className="text-base font-light text-black-100 mb-3 "
          {...attributes}
        >
          {children}
        </p>
      );
  }
};

const Leaf = ({ leaf, attributes, children }: RenderLeafProps) => {
  const cov = [leaf.bold, leaf.italic, leaf.underline, leaf.url];
  const css = [
    "font-bold",
    "italic",
    "underline",
    "underline text-blue-500 cursor-pointer",
  ]
    .filter((_, i) => cov[i])
    .join(" ")
    .split(" ")
    .filter((value, index, self) => self.indexOf(value) === index)
    .join(" ");
  if (leaf.url)
    return (
      <Link href={leaf.url} {...attributes} className={css}>
        {children}
      </Link>
    );
  return (
    <span {...attributes} className={css}>
      {children}
    </span>
  );
};

type Props = {
  init: Descendant[];
  onChange?: (value: Descendant[]) => void;
  readOnly?: boolean;
};

const RichTextEditor = ({ init, readOnly, onChange }: Props) => {
  const [editor] = React.useState(() => withReact(createEditor()));

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate editor={editor} initialValue={init} onChange={onChange}>
      <div className="rounded-xl shadow-lg overflow-hidden p-4 mt-2 mb-4">
        <div className="flex items-center space-x-2 flex-wrap">
          <SlateHeaderDropDown />
          <SlateMarkButton
            format="bold"
            icon={<MdOutlineFormatBold size={24} />}
          />
          <SlateMarkButton
            format="italic"
            icon={<MdOutlineFormatItalic size={24} />}
          />
          <SlateMarkButton
            format="underline"
            icon={<MdFormatUnderlined size={24} />}
          />
          <SlateBlockButton
            format="numbered-list"
            icon={<AiOutlineOrderedList size={24} />}
          />
          <SlateBlockButton
            format="bulleted-list"
            icon={<AiOutlineUnorderedList size={24} />}
          />
          <SlateMarkButton format="url" icon={<MdOutlineAddLink size={24} />} />
          <SlateImage />
        </div>

        <div className="border mt-4 h-[500px] overflow-scroll rounded-xl p-2">
          <Editable
            readOnly={readOnly}
            spellCheck={false}
            onKeyDown={(event) => {
              // console.log(event.key);
            }}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </div>
      </div>
    </Slate>
  );
};

export default RichTextEditor;
