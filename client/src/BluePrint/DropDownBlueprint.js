import React, { useState } from "react";

const DropDownBlueprint = ({ data, onDragStart, id }) => {
  const containerStyle = {
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    width: "100%",
  };

  const titleStyle = {
    fontSize: "1.2em",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  };

  const selectStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1em",
    color: "#555",
    backgroundColor: "#fff",
    cursor: "pointer",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  };
  console.log("Data passed to DropDownBlueprint:", data);

  const isPreselectedOption = (option) => {
    return data.value && data.value === option.value;
  };

  const options = data.options?.dropdownOptions?.map((option, index) => ({
    key: index,
    text: option.label,
    value: option.value,
    selected: isPreselectedOption(option)
})) || [];
  return (
    <div
      id={id}
      draggable={true}
      onDragStart={onDragStart}
      className="dropdown-blueprint"
      style={containerStyle}
    >
      <div className="dropdown-title" style={titleStyle}>
        {data.displayName}
      </div>
      <select className="dropdown-options" style={selectStyle} disabled>
        {data.options &&
          data.options.dropdownOptions &&
          data.options.dropdownOptions.map((option, index) => (
            <option
              key={index}
              value={option.value}
              selected={isPreselectedOption(option)}
            >
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default DropDownBlueprint;
