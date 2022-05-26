import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../../store/slices/user/users.slice";
import { RootState } from "../../../store/store";
import { Button } from "../abstract/Button/Button";

import { Modal } from "../abstract/Modal/Modal";

export const LogoutModal: React.FC = () => {
  const actualUser = useSelector((state: RootState) => state.user);
  console.log(actualUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    try {
      // verificar se existe um usuário logado
      if (actualUser.user.loggedUser.id) {
        // chamar função de logout
        dispatch(userLogout(actualUser.user.loggedUser.id));
        navigate("/");
        return;
      }

      // remover token da localStorage
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <div>
      <button id="btn-logout-modal" onClick={() => setIsOpen(true)}>
        Open
      </button>
      {isOpen ? (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="flex flex-col justify-center">
            <div className="flex flex-row text-center justify-center items-center  font-sans text-lg text-slate-700">
              <FontAwesomeIcon
                icon={faWarning}
                color="rgb(202 138 4)"
                size="4x"
                className="my-5 mx-2"
              />
              <h1 className="mx-2">Are you sure you want to logout?</h1>
            </div>
            <div
              className="mt-1 mb-3 h-0 sm:h-px xl:h-0.5 
              bg-slate-300"
            ></div>
            <div className="flex flex-row justify-end">
              <Button
                type="button"
                className="bg-gray-400 hover:bg-gray-500 rounded-lg px-5 py-2 text-white font-normal text-lg duration-500 mx-1"
                onClick={() => setIsOpen(false)}
              >
                No
              </Button>
              <Button
                type="button"
                className="bg-yellow-600 hover:bg-yellow-700 rounded-lg px-5 py-2 text-white font-normal text-lg duration-500 mx-1"
                onClick={handleLogout}
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};
