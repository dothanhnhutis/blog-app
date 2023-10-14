import { SlateCustomElement } from "@/common.type";
import { isBlockActive, toggleBlock } from "@/util/slate";
import { useSlate } from "slate-react";

const SlateBlockButton = ({
  format,
  icon,
}: {
  format: Exclude<SlateCustomElement["type"], "image" | "list-item">;
  icon: JSX.Element;
}) => {
  const editor = useSlate();
  const isActive = isBlockActive(editor, format);

  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      tabIndex={-1}
      type="button"
      className={`p-2 rounded-full ${
        isActive
          ? "hover:bg-sky-100 text-sky-500"
          : "hover:bg-gray-100 text-gray-500"
      }`}
    >
      {icon}
    </button>
  );
};
export default SlateBlockButton;
