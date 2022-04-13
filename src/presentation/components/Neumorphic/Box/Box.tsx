import React from "react";
import "./box-styles.css";
import { NeumorphicBoxProps } from "./box-types";

export const NeumorphicBox: React.FC<NeumorphicBoxProps> = ({
  size,
  children,
  className,
}: NeumorphicBoxProps) => {
  return (
    <div className={`neumorphic-box-light ${size} ${className}`}>
      {children}
    </div>
  );
};
