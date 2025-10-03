import { ButtonHTMLAttributes, FC } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "delete";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    variant: ButtonVariant;
}

const Button: FC<ButtonProps> = ({ variant = "primary", className, disabled, children, ...props }) => {
  const baseStyles =
    "flex items-center gap-2 px-6 h-8 font-semibold text-sm rounded-[5px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 font-titleFont i";

  const variants: Record<ButtonVariant, string> = {
    primary: disabled 
    ? "bg-notAvailableBG text-notAvailableText cursor-not-allowed"
    : "bg-button1 hover:bg-buttonHover text-titlebodytext1 hover:text-white focus:ring-slate-400",
    secondary: disabled
    ? "bg-notAvailableBG text-notAvailableText cursor-not-allowed"
    :  "bg-button2 hover:bg-buttonHover text-bodytext2 hover:text-white focus:ring-slate-300",
    delete:
      "bg-deleteButton hover:bg-deleteButtonHover text-white hover:text-white focus:ring-slate-300",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;