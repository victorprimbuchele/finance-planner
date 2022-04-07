import React from "react";
import "./box-styles.scss";
import { NeumorphicBoxProps } from "./box-types";

export const NeumorphicBox: React.FC<NeumorphicBoxProps> = ({
  size,
  theme,
  children,
}: NeumorphicBoxProps) => {
  return (
    <div className="h-100 w-100">
      <div className={`neumorphic-box-${theme} ${size}`}>{children}</div>
    </div>
  );
};
