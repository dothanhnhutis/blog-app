import { SlateCustomEditor, SlateCustomElement } from "@/common.type";
import { Editor, Transforms, Element as SlateElement } from "slate";

const LIST_TYPES = ["numbered-list", "bulleted-list"];

export const isBlockActive = (
  editor: SlateCustomEditor,
  format: Exclude<SlateCustomElement["type"], "link" | "image" | "list-item">,
  blockType: keyof SlateCustomElement = "type"
) => {
  const { selection } = editor;
  if (!selection) return false;
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );
  return !!match;
};

export const toggleBlock = (
  editor: SlateCustomEditor,
  format: Exclude<SlateCustomElement["type"], "link" | "image" | "list-item">
) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  if (!isActive && isList) {
    const block: SlateCustomElement = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};
