import React from "react";
import DropDownBlueprint from "../BluePrint/DropDownBlueprint";
import "../Styles/DropDowns.css";

const DropDowns = ({ buttons }) => {
  const handleDragStart = (e, field) => {
    console.log("Dragging");

    const Data = {
      type: "DROPDOWN",
      componentID: `${field.id}`,
      fields: field,
      w: 21,
      h: 15,
      minH: 8,
      minW: 8,
    };

    e.dataTransfer.setData("text/plain", JSON.stringify(Data));
  };
  return (
    <div className="dropDowns-buttons-container">
      {buttons.map((field, index) => (
        <DropDownBlueprint
          key={index}
          data={field}
          onDragStart={(e) => handleDragStart(e, field)}
          id={`dropdownGroup-field${index}`}
        />
      ))}
    </div>
  );
};

export default DropDowns;
