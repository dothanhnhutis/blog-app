import { SlateCustomEditor, SlateLeaf } from "@/common.type";
import { useOutsideClick } from "@/hook/useOutsideClick";
import { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { Range } from "slate";
import { Editor } from "slate";
import { useSlate } from "slate-react";

const isMarkActive = (
  editor: SlateCustomEditor,
  format: keyof Omit<SlateLeaf, "text">
): boolean => {
  const marks = Editor.marks(editor);
  if (!marks) return false;
  if (format === "url") return marks.url ? true : false;
  return marks[format] === true;
};

const toggleMark = (
  editor: SlateCustomEditor,
  format: keyof Omit<SlateLeaf, "text">
) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const SlateMarkButton = ({
  format,
  icon,
}: {
  format: keyof Omit<SlateLeaf, "text">;
  icon: JSX.Element;
}) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);
  const { selection } = editor;
  if (format === "url") {
    const [show, setShow] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    const marks = Editor.marks(editor);
    const ref = useOutsideClick<HTMLDivElement>((isOutSide) => {
      if (isOutSide) setShow(false);
    });
    const handleAddLink = () => {
      Editor.addMark(editor, "url", input);
      setShow(false);
    };
    useEffect(() => {
      if (editor.selection) {
        setInput(() => {
          if (!marks) return "";
          return marks.url ?? "";
        });
      } else {
        setInput("");
      }
    }, [editor.selection]);
    return (
      <div className="relative" ref={ref}>
        <button
          tabIndex={-1}
          onClick={() => {
            if (isActive) {
              toggleMark(editor, "url");
            } else {
              if (selection && !Range.isCollapsed(selection)) {
                setShow(true);
              }
            }
          }}
          type="button"
          className={`p-2 rounded-full ${
            isActive
              ? "hover:bg-sky-100 text-sky-500"
              : "hover:bg-gray-100 text-gray-500"
          }`}
        >
          {icon}
        </button>
        <div
          className={`absolute z-[2] top-full bg-white rounded-xl shadow ${
            show ? "block" : "hidden"
          }`}
        >
          <div className="flex items-center p-2 space-x-1">
            <input
              spellCheck="false"
              className="border rounded-lg p-1 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="email"
              name="url"
              id="url"
            />
            <button
              tabIndex={-1}
              type="button"
              onClick={handleAddLink}
              className="text-green-500"
            >
              <AiOutlineCheck size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <button
      tabIndex={-1}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
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

export default SlateMarkButton;
