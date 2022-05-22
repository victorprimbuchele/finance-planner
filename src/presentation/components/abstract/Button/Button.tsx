import React from "react";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  className: string;
};

export const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  children,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick ? onClick : () => console.log("")}
    >
      {children}
    </button>
  );
};
