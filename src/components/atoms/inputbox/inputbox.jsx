import React from "react";
import "../inputbox/inputbox.css"
const Inputbox = ({ input, handleChange, values }) => {
  const { type, placeholder, name } = input;

  return (
    <>
      <label>{placeholder}</label>
      <input
        type={type}
        name={name}
        className="input"
        placeholder={placeholder}
        value={values}
        onChange={handleChange}
      />
    </>
  );
};
export default Inputbox;
