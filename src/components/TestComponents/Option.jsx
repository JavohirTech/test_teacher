import React from "react";

function Option({ text, onChange, name, isChecked }) {
  return (
    <label className="d-flex justify-content-between align-items-center px-4 pe-2">
      <input
        type="radio"
        name={name}
        value={text}
        checked={isChecked}
        onChange={onChange}
      />
      {text}
      <i className="bg-success text-white fa-solid fa-check"></i>
    </label>
  );
}

export default Option;
