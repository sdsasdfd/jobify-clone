import React from "react";

const FormRow = ({ name, type, labelText, defaultValue }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        className="form-input"
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue || ""}
        required
      />
    </div>
  );
};

export default FormRow;
