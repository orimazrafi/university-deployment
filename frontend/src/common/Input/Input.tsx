import React from "react";

export const Input = ({ value, handleChange, name, placeholder, label, type = "type" }: any) => {
    return (<div className="form-control">
        <label>
            {label}:
        </label>
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={handleChange} />
    </div>)
}