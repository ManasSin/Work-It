import React from "react";
import Tooltip from "./Tooltip";

const Button = ({ onClick, role, ghost, primary, icon, body }) => {
  return (
    <button
      className={`outline-transparent
    font-semibold 
    px-2.5
    py-2
    text-base
    rounded-sm
    ${ghost ? `border-2 border-blue-600` : "border-none"}
    ${ghost ? "bg-transparent" : `bg-blue-500`}
    ${primary ? "uppercase" : "normal-case"}
    ${primary ? `text-white` : "text-black"}
    ${icon ? "w-fit" : "w-full grow"} 
    outline outline-[1px] 
    text-start `}
      role={role}
      onClick={onClick}
    >
      {/* {icon && arrowDownSvg} */}
      {body}
    </button>
  );
};

export default Button;
