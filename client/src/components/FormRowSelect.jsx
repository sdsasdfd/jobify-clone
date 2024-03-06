import React from "react";

const FormRowSelect = ({ name, labelText, list, defaultValue = "" }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name || labelText}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
      >
        {list.map((itemsValue) => {
          return (
            <option key={itemsValue} value={itemsValue}>
              {" "}
              {itemsValue}{" "}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
