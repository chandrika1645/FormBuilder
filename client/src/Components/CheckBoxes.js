import React from "react";
import CheckBoxBlueprint from "../BluePrint/CheckBoxBlueprint";
import "../Styles/CheckBoxes.css";

const CheckBoxes = ({ buttons }) => {
  const handleDragStart = (e, field) => {
    console.log("Dragging");

    const Data = {
      type: "CHECKBOX",
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
    <div className="checkBoxes-buttons-container">
      {buttons.map((field, index) => (
        <CheckBoxBlueprint
          key={index}
          data={field}
          onDragStart={(e) => handleDragStart(e, field)}
          id={`checkboxGroup-field${index}`}
        />
      ))}
    </div>
  );
};

export default CheckBoxes;
