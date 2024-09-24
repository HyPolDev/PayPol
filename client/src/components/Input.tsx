import React, { ChangeEvent } from "react";

interface InputProps {
    placeholder: string;
    classProps?: string;
    name?: string;
    type?: string;
    handleChange?: any;
    value?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, classProps, name, type, handleChange, value }) => {
    return (
        <input
            placeholder={placeholder}
            name={name}
            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
            type={type}
            onChange={(e) => handleChange(e, name)}
            step="0.0002"
            value={value}
        />
    );
}

export default Input;
