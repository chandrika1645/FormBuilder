import React from "react";

const CheckBoxBlueprint = ({ data, onDragStart, id, componentID }) => {
  const containerStyle = {
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    width: "100%",
    flex: "1",
  };

  const titleStyle = {
    fontSize: "1.2em",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  };

  const optionStyle = {
    marginBottom: "5px",
  };

  const inputStyle = {
    marginRight: "10px",
  };

  const labelStyle = {
    fontSize: "1em",
    color: "#555",
  };

  const isPreselectedOption = (option) => {
    return data.value && Object.keys(data.value).includes(option.key);
  };

  return (
    <div
      id={id}
      draggable={true}
      onDragStart={onDragStart}
      className="checkbox-blueprint"
      style={containerStyle}
    >
      <div className="checkbox-title" style={titleStyle}>
        {data.displayName}
      </div>
      <div className="checkbox-options">
        {data.options &&
          data.options.checkboxOptions &&
          data.options.checkboxOptions.map((option, index) => (
            <div key={index} className="checkbox-option" style={optionStyle}>
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                name={`checkboxGroup-${data.displayName}`}
                value={option.value}
                checked={isPreselectedOption(option)}
                className="checkbox-input"
                style={inputStyle}
                readOnly
              />
              <label
                htmlFor={`checkbox-${index}`}
                className="checkbox-label"
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

export default CheckBoxBlueprint;
