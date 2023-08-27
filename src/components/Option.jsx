import React from "react";

function Option({ text, onChange, name, isChecked }) {
  return (
    <label>
      <input
        type="radio"
        name={name}
        value={text}
        checked={isChecked}
        onChange={onChange}
      />
      {text}
    </label>
  );
}

export default Option;
