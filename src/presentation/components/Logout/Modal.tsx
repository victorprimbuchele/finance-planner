import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../../store/slices/user/users.slice";
import { RootState } from "../../../store/store";

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
      if (actualUser.user.loggedUser.email) {
        // chamar função de logout
        dispatch(userLogout(actualUser.user.loggedUser.email));
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
      <button onClick={() => setIsOpen(true)}>Open</button>
      {isOpen ? (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <h1>Are you sure you want to logout?</h1>
          <button onClick={() => setIsOpen(false)}>No</button>
          <button onClick={handleLogout}>Yes</button>
        </Modal>
      ) : null}
    </div>
  );
};
