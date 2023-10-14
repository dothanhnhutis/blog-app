import { useOutsideClick } from "@/hook/useOutsideClick";
import { Transition } from "@headlessui/react";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export type ModelHandle = {
  setIsHidden: (isHidden: boolean) => void;
  getState: () => boolean;
};

const Model = React.forwardRef<ModelHandle, { children: React.ReactNode }>(
  ({ children }, ref) => {
    const [isHidden, setIsHidden] = React.useState<boolean>(true);

    React.useImperativeHandle(ref, () => ({
      setIsHidden(isHidden: boolean) {
        setIsHidden(isHidden);
      },
      getState() {
        return isHidden;
      },
    }));

    const refContainer = useOutsideClick<HTMLDivElement>((isOutSide) => {
      if (isOutSide) {
        setIsHidden(true);
      }
    });

    return (
      <Transition show={!isHidden}>
        <div className="flex items-center justify-center absolute top-0 left-0 bottom-0 right-0 bg-[#1212125c] z-20 overflow-y-scroll">
          <div
            ref={refContainer}
            className="relative bg-white rounded-lg min-w-[300px] min-h-[100px] p-4 max"
          >
            <button
              onClick={() => setIsHidden(true)}
              type="button"
              className="absolute top-2 right-2"
            >
              <div className="p-1 rounded-full hover:bg-slate-200">
                <AiOutlineClose size={12} />
              </div>
            </button>
            {children}
          </div>
        </div>
      </Transition>
    );
  }
);

export default Model;
