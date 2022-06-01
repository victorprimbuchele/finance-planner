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
      className={`p-3 h-auto md:h-full w-full ${
        hide.isHidden ? "hidden" : ""
      }  md:w-20 xl:w-24 md:h-screen md:block`}
    >
      {children}
    </NeumorphicBox>
  );
};
