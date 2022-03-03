import React, { useState, useEffect } from "react";
import { white, darkGreen, lightGrey } from "../../style/colors";

const buttonStyle = (color) => {
  return {
    backgroundColor: color,
    border: color === darkGreen ? "none" : "0.5px solid " + lightGrey,
    fontSize: "0.80em",
    maxWidth: "6em",
    borderRadius: "0.5em",
    padding: "0.5em 0",
  };
};
export default function ButtonFilter({ handleChangeInFilters, value, filter }) {
  //TODO: choose final colors
  useEffect(() => {
    if (filter === value) setColor(darkGreen);
    else setColor(white);
  }, [filter, value]);

  const handleClick = () => {
    handleChangeInFilters(value);
  };

  const [color, setColor] = useState("blue");
  return (
    <button onClick={handleClick} style={buttonStyle(color)}>
      {value}
    </button>
  );
}
