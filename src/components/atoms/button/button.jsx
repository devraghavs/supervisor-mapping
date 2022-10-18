import React from "react";
import "./button.css"
const Button = ({ children, className = "", onClick, ...props }) => {
  return (
    <button className={`${className} button-wrapper`} 
    onClick={onClick}
    {...props}>
      {children}
    </button>
  );
};
export default Button;
