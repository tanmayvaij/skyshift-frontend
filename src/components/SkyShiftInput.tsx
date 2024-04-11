import React, {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
} from "react";
import { IoIosAlert } from "react-icons/io";

interface SkyShiftInputProps {
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name?: string;
  errorMessage?: string;
}

export const SkyShiftInput: React.FC<SkyShiftInputProps> = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  onBlur,
  name,
  errorMessage,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-base font-medium text-gray-700 pl-1 pb-1">
        {label}
      </label>
      <input
        className="border p-3 rounded-md"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
      />
      {errorMessage && (
        <p className="flex items-center pt-2">
          <IoIosAlert className="text-red-500" />
          <span className="text-sm text-red-500 font-medium px-1">
            {errorMessage}
          </span>
        </p>
      )}
    </div>
  );
};
