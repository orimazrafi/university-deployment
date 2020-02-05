import React from "react";

export const Input = ({ value, handleChange, name, placeholder, label, type = "type" }: any) => {
    return (<div className="form-group row">
        <label>
            {label}:
        </label>
        <input
            className="form-control"
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={handleChange} />
    </div>)
}