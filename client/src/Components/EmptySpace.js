import React from "react";
import CardBlueprint from "../BluePrint/CardBlueprint";

const EmptySpace = () => {
  const handleDragStart = (e) => {
    console.log("Dragging");

    const Data = {
      type: "card",
      componentName: "emptySpace",
      fields: [{ label: "Empty Space", value: "here" }],

      w: 2,
      h: 2,
      minH: 2,
      minW: 2,
    };

    e.dataTransfer.setData("text/plain", JSON.stringify(Data));
  };
  return (
    <CardBlueprint
      fields={[{ label: "Empty Space", value: "here" }]}
      onDragStart={handleDragStart}
    />
  );
};

export default EmptySpace;
