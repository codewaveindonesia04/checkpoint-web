import { FC } from "react";
import { Field, ErrorMessage } from "formik";
import { InputProps } from "@/lib/interface";
import { cn } from "@/lib/shadcn";

const Input: FC<InputProps> = ({
  name,
  type,
  placeholder,
  label,
  isPassword = false,
}) => {
  const inputType = isPassword ? "password" : type;

  return (
    <div className="mb-4 w-full">
      <label
        htmlFor={name}
        className={cn(
          "block text-sm font-medium",
          "text-gray-700 dark:text-gray-300"
        )}
      >
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={inputType}
        placeholder={placeholder}
        className={cn(
          "mt-1 block w-full rounded-md border p-2 shadow-sm sm:text-sm",
          "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          "dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
        )}
      />
      <ErrorMessage
        name={name}
        component="div"
        className={cn("mt-1 text-sm", "text-red-600 dark:text-red-400")}
      />
    </div>
  );
};

export default Input;
