import React, { useState } from "react";

const RadioButtonBlueprint = ({ data, onDragStart, id, componentID }) => {
  const [componentName, setComponentName] = useState(`${componentID}`);

  const containerStyle = {
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    width: "100%", // Ensure it takes up the full width
  };

  const titleStyle = {
    fontSize: "1.2em",
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#333",
  };

  const groupStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const optionStyle = {
    marginBottom: "10px",
  };

  const inputStyle = {
    marginRight: "5px",
  };

  const labelStyle = {
    fontSize: "1em",
    color: "#555",
  };

  const isPreselectedOption = (option) => {
    return data.value && data.value === option.key;
  };

  return (
    <div
      id={id}
      draggable={true}
      onDragStart={onDragStart}
      className={`radio-button-blueprint `}
      style={containerStyle}
    >
      <div className="radio-button-title" style={titleStyle}>
        {data.displayName}{" "}
      </div>
      <div className="radio-button-group" style={groupStyle}>
        {data.options &&
          data.options.radioOptions &&
          data.options.radioOptions.map((option, optionIndex) => (
            <div
              className="radio-button-option"
              key={optionIndex}
              style={optionStyle}
            >
              <input
                type="radio"
                id={option.key}
                name={`radioGroup-${id}`}
                value={option.value}
                checked={isPreselectedOption(option)}
                className="radio-button-input"
                style={inputStyle}
                readOnly
              />
              <label
                htmlFor={option.key}
                className="radio-button-label"
                style={labelStyle}
              >
                {option.label}
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RadioButtonBlueprint;
