import React from "react";

export const Input = ({ value, handleChange, name, placeholder, label, type }: any) => {
    return (<div className="form-group">
        <label>
            {label}
        </label>
        <input
            className="input-block"
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={handleChange} />
    </div>)
}