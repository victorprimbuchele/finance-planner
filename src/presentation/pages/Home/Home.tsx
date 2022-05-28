import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useReducer } from "react";
import { Button } from "../../components/abstract/Button/Button";
import { Sidebar } from "../../components/abstract/Sidebar/Sidebar";
import { LogoutModal } from "../../components/Logout/Modal";
import { hide, hideIt } from "./HideReducer";

export const Home: React.FC = () => {
  const [isHidden, dispatch] = useReducer(hideIt, hide);

  return (
    <div>
      <Button
        onClick={() =>
          dispatch({ type: "TOGGLE", payload: !isHidden.isHidden })
        }
        type="button"
        className={`p-3 ml-2 mt-2 md:hidden ${
          !isHidden.isHidden ? "hidden" : ""
        }`}
      >
        <FontAwesomeIcon icon={faBars} size="2x" color="#354674" />
      </Button>
      <Sidebar hide={isHidden} dispatch={dispatch}>
        <div className="foto"></div>
        <div className="botoes"></div>
        <div className="logout">
          <LogoutModal />
        </div>
      </Sidebar>
    </div>
  );
};
