import { SlateCustomElement, SlateHeaderDropDownType } from "@/common.type";
import { Listbox } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useSlate } from "slate-react";
import { Editor, Element as SlateElement } from "slate";
import { AiFillCaretDown } from "react-icons/ai";
import { toggleBlock } from "@/util/slate";
const blockSlected: SlateHeaderDropDownType[] = [
  { id: 1, name: "Paragraph", style: "paragraph" },
  { id: 2, name: "Heading One", style: "header-one" },
  { id: 3, name: "Heading Two", style: "header-two" },
  { id: 4, name: "Heading Three", style: "header-three" },
  { id: 5, name: "Heading Four", style: "header-four" },
  { id: 6, name: "Heading Five", style: "header-five" },
  { id: 7, name: "Heading Six", style: "header-six" },
];

const SlateHeaderDropDown = () => {
  const [selectedStyle, setSelectedBlock] = useState<SlateHeaderDropDownType>(
    blockSlected[0]
  );

  const editor = useSlate();
  useEffect(() => {
    const { selection } = editor;
    if (!selection) return;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n),
      })
    );

    const element = match[0] as SlateCustomElement;

    setSelectedBlock(
      blockSlected.find((b) => b.style === element.type) ?? blockSlected[0]
    );
  }, [editor.selection]);

  return (
    <Listbox value={selectedStyle} onChange={setSelectedBlock}>
      <div className="relative">
        <Listbox.Button
          tabIndex={-1}
          className="flex justify-between items-center w-[160px] rounded border px-4 py-2 text-gray-500"
        >
          <p>{selectedStyle.name}</p>
          <AiFillCaretDown size={16} />
        </Listbox.Button>
        <Listbox.Options className="absolute z-20 top-fill bg-white rounded py-2 overflow-hidden shadow space-y-2 ">
          {blockSlected.map((b) => (
            <Listbox.Option
              key={b.id}
              onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, b.style);
              }}
              className={`px-3 py-2 ${
                selectedStyle.style === b.style
                  ? "bg-sky-200"
                  : "hover:bg-gray-200"
              } `}
              value={b}
              //   onClick={() => handleChangeStyle(b.style)}
            >
              {b.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default SlateHeaderDropDown;
