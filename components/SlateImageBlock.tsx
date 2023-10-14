import React from "react";
import {
  ReactEditor,
  RenderElementProps,
  useFocused,
  useSelected,
  useSlateStatic,
} from "slate-react";
import Image from "next/image";
import { Transforms } from "slate";
import { classNames } from "@/util";

const SlateImageBlock = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const selected = useSelected();
  const focused = useFocused();
  if (element.type !== "image") return <></>;
  return (
    <figure
      {...attributes}
      className="mb-8 block mx-auto group relative"
      contentEditable={false}
    >
      {children}
      <div className="flex items-center justify-center">
        <div>
          <div className="relative w-[600px] h-[382px]">
            <Image
              fill
              priority
              sizes="auto"
              alt={element.caption}
              src={element.url}
            />
          </div>
          <figcaption className="italic text-center text-sm p-2 bg-gray-50/70 ">
            {element.caption}
          </figcaption>
        </div>
      </div>
      <button
        className={classNames("absolute top-0 right-0")}
        onClick={() => Transforms.removeNodes(editor, { at: path })}
        type="button"
      >
        x
      </button>
    </figure>
  );
};

export default SlateImageBlock;
