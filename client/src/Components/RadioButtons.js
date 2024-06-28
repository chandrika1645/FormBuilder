import React from "react";
import RadioButtonBlueprint from "../BluePrint/RadioButtonBlueprint.js";
import "../Styles/RadioButtons.css";

const RadioButtons = ({ buttons }) => {
  const handleDragStart = (e, field) => {
    console.log("Dragging");

    const Data = {
      type: "RADIO",
      componentID: `${field.id}`,
      fields: field,
      w: 21,
      h: 15,
      minH: 10,
      minW: 10,
    };

    e.dataTransfer.setData("text/plain", JSON.stringify(Data));
  };

  return (
    <div className="radio-buttons-container">
      {buttons.map((field, index) => (
        <RadioButtonBlueprint
          key={index}
          data={field}
          onDragStart={(e) => handleDragStart(e, field)}
          id={`radioGroup-field${index}`}
        />
      ))}
    </div>
  );
};

export default RadioButtons;
