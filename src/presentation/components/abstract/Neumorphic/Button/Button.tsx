import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./button-styles.css";

import { INeumorphicButtonParams } from "./button-types";

export const NeumorphicButton: React.FC<INeumorphicButtonParams> = ({
  children,
  icon,
  link,
  key,
}: INeumorphicButtonParams) => {
  return (
    <div className="hover:scale-110 duration-300 ">
      <Link
        className="py-2.5 px-3 neumorphic-button"
        to={link}
        key={key}
        title={key}
        aria-label="Go to register page"
      >
        {children}
        {icon && <FontAwesomeIcon icon={icon} color="#354674" />}
      </Link>
    </div>
  );
};
