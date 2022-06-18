import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../Button/Button";
import "./button-styles.css";

import { INeumorphicButtonParams } from "./button-types";

export const NeumorphicButton: React.FC<INeumorphicButtonParams> = ({
  children,
  icon,
  link,
  lala,
  className,
  onClick,
}: INeumorphicButtonParams) => {
  return (
    <div className="hover:scale-110 duration-300">
      {link ? (
        <Link
          className={`py-2.5 px-3 neumorphic-button ${className}`}
          to={link}
          key={lala}
          title={lala}
          aria-label="Go to register page"
        >
          {children}
          {icon && <FontAwesomeIcon icon={icon} color="#354674" />}
        </Link>
      ) : (
        <Button
          className={`py-2.5 px-3 neumorphic-button ${className} w-full`}
          type="button"
          id={lala}
          onClick={onClick}
        >
          {children}
        </Button>
      )}
    </div>
  );
};
