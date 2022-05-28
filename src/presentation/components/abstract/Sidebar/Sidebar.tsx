import { useReducer } from "react";
import { hide, HideActionProps, hideIt } from "../../../pages/Home/HideReducer";
import { Button } from "../Button/Button";
import { NeumorphicBox } from "../Neumorphic/Box/NeumorphicBox";

type SidebarProps = {
  hide: typeof hide;
  dispatch: (value: HideActionProps) => void;
  children: React.ReactNode;
};

export const Sidebar: React.FC<SidebarProps> = ({
  hide,
  dispatch,
  children,
}: SidebarProps) => {
  return (
    <NeumorphicBox
      size="md"
      key="sidebar"
      className={`h-full w-full ${hide.isHidden ? "hidden" : ""} `}
    >
      <h1>Oi, eu sou a sidebar</h1>
      {children}
      {!hide.isHidden && (
        <Button
          className=""
          type="button"
          onClick={() => dispatch({ type: "TOGGLE", payload: !hide.isHidden })}
        >
          close
        </Button>
      )}
    </NeumorphicBox>
  );
};
