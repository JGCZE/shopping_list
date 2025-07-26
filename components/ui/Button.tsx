import { EButtonVariant } from "@/lib/enums";
import { clsx } from "clsx";
import { on } from "events";
import React from "react";

interface IButtonProps {
  children: React.ReactNode;
  variant: EButtonVariant;
  type?: "button" | "submit";
  onClick?: () => void;
}

const Button = ({ children, variant, type = "button", onClick }: IButtonProps) => (
  <button
    type={type}
    className={clsx(variant === EButtonVariant.DELETE && "bg-red-600")}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
