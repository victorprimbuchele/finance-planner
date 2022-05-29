import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type INeumorphicButtonParams = {
  icon?: IconProp;
  children?: React.ReactNode;
  link?: string;
  lala: string;
  className?: string;
  onClick?: () => void;
};
