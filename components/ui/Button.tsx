import { EButtonVariant } from "@/lib/enums";
import { clsx } from "clsx";
import React from "react";

interface IButtonProps {
  children: React.ReactNode;
  variant: EButtonVariant;
  type?: "button" | "submit";
}

const Button = ({ children, variant, type = "button" }: IButtonProps) => (
  <button
    type={type}
    className={clsx(variant === EButtonVariant.DELETE && "bg-red-600")}
  >
    {children}
  </button>
);

export default Button;
