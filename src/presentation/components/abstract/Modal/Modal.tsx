import React from "react";
import { IModalParams } from "./modal-types";

export const Modal: React.FC<IModalParams> = ({
  children,
  onClose,
}: IModalParams) => {
  return (
    <div
      id="modal"
      className="w-full h-screen absolute top-0 left-0 bg-black/50 flex justify-center items-center"
    >
      <div id="modal-container" className="bg-white w-60 h-60 rounded-lg">
        <button
          type="button"
          id="btn-close"
          className="w-8 h-8 outline-none"
          onClick={onClose}
        >
          X
        </button>
        <div id="modal-content">{children}</div>
      </div>
    </div>
  );
};
