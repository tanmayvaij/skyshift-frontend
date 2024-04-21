import React, { ChangeEventHandler, FocusEventHandler } from "react";
import { IoIosAlert } from "react-icons/io";

interface SkyShiftDropDownInputProps {
  label?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  onBlur?: FocusEventHandler<HTMLSelectElement>;
  name?: string;
  errorMessage?: string;
  list?: string[];
  placeholder?: string;
}

export const SkyShiftDropDownInput: React.FC<SkyShiftDropDownInputProps> = ({
  label,
  value,
  onChange,
  onBlur,
  name,
  errorMessage,
  list,
  placeholder
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-base font-medium text-gray-700 pl-1 pb-1">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="border p-3 rounded-md"
        name={name}
      >
        <option value={""}>{placeholder}</option>
        {list?.map((val) => (
          <option value={val}>{val}</option>
        ))}
      </select>

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
