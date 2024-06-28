import React, { useState } from "react";
import "../Styles/Table.css";

const TableBlueprint = ({ fields, onDragStart, id, TableName }) => {
  const [componentName, setComponentName] = useState(`${TableName}`);

  return (
    <table
      id={id}
      draggable={true}
      onDragStart={onDragStart}
      classnameprefix={componentName}
      className={`table`}
    >
      <thead>
        <tr>
          {fields.thead.map((heading, index) => (
            <th key={index}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {fields.tbody.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableBlueprint;
