import React, {useState } from 'react';
import '../Styles/Card.css';


const CardBlueprint = ({ id, fields, onDragStart, CardName}) => {
  const [componentName, setComponentName] = useState(`${CardName}`)
 
  return (
    <div id={id} draggable={true} onDragStart={onDragStart} classnameprefix={componentName} className = {`Card-component`}>
      {fields.map((field, index) => (
        field.isTitle ? (
          <p key={index} style={{ fontWeight: 'bold' }}>{field.value}</p>
        ) : (
          <p key={index}>{`${field.label}: ${field.value}`}</p> )
        ))}
      
    </div>
  );
};

export default CardBlueprint;
