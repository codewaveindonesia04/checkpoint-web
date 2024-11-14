import { FC } from "react";
import { Field, ErrorMessage } from "formik";
import { InputProps } from "@/lib/interface";

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
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={inputType}
        placeholder={placeholder}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-600 text-sm mt-1"
      />
    </div>
  );
};

export default Input;
