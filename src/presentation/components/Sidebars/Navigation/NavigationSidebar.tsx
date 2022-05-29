// terceiros
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useReducer } from "react";
// meus
import { hide, hideIt } from "../../../../reducer/sidebar/HideReducer";
import { Button } from "../../abstract/Button/Button";
import { Sidebar } from "../../abstract/Sidebar/Sidebar";
import { LogoutModal } from "../../Logout/LogoutModal";
import yoda from "../../../../data/assets/yoda.jpg";
import { NavigationSidebarButton } from "./Button/NavigationSidebarButton";

export const NavigationSidebar: React.FC = () => {
  const [isHidden, dispatch] = useReducer(hideIt, hide);

  return (
    <>
      <Button
        onClick={() =>
          dispatch({ type: "TOGGLE", payload: !isHidden.isHidden })
        }
        type="button"
        className={`p-3 ml-2 mt-2 md:hidden ${
          !isHidden.isHidden ? "hidden" : ""
        }`}
      >
        <FontAwesomeIcon icon="bars" size="2x" color="#354674" />
      </Button>
      <Sidebar hide={isHidden}>
        <div className="text-lg md:flex md:flex-col md:h-full">
          {/* User + logout container */}
          <div className="flex md:flex-col w-full md:w-auto items-center justify-between md:h-1/6">
            {/* User info container */}
            <div className="flex md:flex-col md:w-auto items-center">
              {/* User photo container */}
              <div className="w-12 h-12 md:w-12 md:h-12 xl:w-16 xl:h-16 rounded-full overflow-hidden md:my-2">
                <img
                  className="w-full h-full object-cover"
                  src={yoda}
                  alt="User photo"
                />
              </div>
              <div className="h-px xl:h-0.5 hidden md:block md:w-12 xl:w-16 bg-neutral-300"></div>
              {/* User name */}
              <span className="mx-2 text-xl md:text-base xl:text-lg">
                Victor
              </span>
            </div>
            {/* Logout button container */}
            <div className="flex flex-row w-auto mr-1">
              {!isHidden.isHidden && (
                <Button
                  className="text-base items-center md:hidden"
                  type="button"
                  onClick={() =>
                    dispatch({ type: "TOGGLE", payload: !isHidden.isHidden })
                  }
                >
                  close X
                </Button>
              )}
            </div>
          </div>
          {/* Functions container */}
          <div className="mt-4 md:flex md:flex-col md:h-4/6 md:justify-start">
            <NavigationSidebarButton
              color="#354674"
              icon={["home", "table", "chart-line"]}
              iconSize="lg"
              akg={["btn-home", "btn-table", "btn-chart"]}
              link={["/home", "/transfers", "/statistics"]}
            />
            <p className="md:hidden block">Home</p>
            {/* CRUD de transferências */}

            <p className="md:hidden block">Transfers</p>
            {/* CRUD de métricas */}

            <p className="md:hidden block">Statistics</p>
          </div>
          <div className="mt-2  h-px xl:h-0.5 bg-neutral-300"></div>
          <div className="logout md:h-1/6 md:mt-2">
            <LogoutModal />
          </div>
        </div>
      </Sidebar>
    </>
  );
};
