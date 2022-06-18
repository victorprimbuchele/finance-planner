import React from "react";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  className: string;
  id: string;
};

export const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  children,
  className,
  id,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick ? onClick : () => console.log("")}
      id={id}
    >
      {children}
    </button>
  );
};
