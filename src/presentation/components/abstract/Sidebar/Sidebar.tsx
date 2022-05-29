import { hide, HideActionProps } from "../../../../reducer/sidebar/HideReducer";
import { NeumorphicBox } from "../Neumorphic/Box/NeumorphicBox";

type SidebarProps = {
  hide: typeof hide;
  children: React.ReactNode;
};

export const Sidebar: React.FC<SidebarProps> = ({
  hide,
  children,
}: SidebarProps) => {
  return (
    <NeumorphicBox
      size="md"
      key="sidebar"
      className={`p-3 h-full w-full ${
        hide.isHidden ? "invisible" : ""
      }  md:w-20 xl:w-24 md:h-screen md:visible`}
    >
      {children}
    </NeumorphicBox>
  );
};
