import { FC } from "react";
import { ButtonProps } from "@/lib/interface";
import { cn } from "@/lib/shadcn";

const Button: FC<ButtonProps> = ({
  isLoading = false,
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const baseStyles = "font-semibold p-2 w-full rounded-md transition-colors";
  const variants = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
