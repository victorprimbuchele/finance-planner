import React from "react";
import { IModalParams } from "./modal-types";

export const Modal: React.FC<IModalParams> = ({
  closeButton = true,
  children,
  onClose,
  hasTopBar,
}: IModalParams) => {
  return (
    <div
      id="modal"
      className="w-full h-screen absolute top-0 left-0 bg-black/50 flex justify-center items-center"
    >
      <div
        id="modal-container"
        className="bg-white w-auto h-auto rounded-lg p-3 pt-2"
      >
        {closeButton && (
          <>
            <button
              type="button"
              id="btn-close"
              className="w-8 h-8 outline-none"
              onClick={onClose}
            >
              X
            </button>

            {hasTopBar ? (
              <div
                className="mt-1 mb-3 h-0 sm:h-px xl:h-0.5 
              bg-slate-300"
              ></div>
            ) : null}
          </>
        )}
        <div id="modal-content">{children}</div>
      </div>
    </div>
  );
};
