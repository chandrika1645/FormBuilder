import React from 'react'
import TableBlueprint from '../BluePrint/TableBlueprint';

const DynamicTable = ({fields, onDragStart}) => {

    const {thead, tbody} = fields || DynamicTable.defaultProps.fields;
  
  const handleDragStart = (e) => {

    console.log("Dragging");


    const Data = {
      type: 'table',
      componentName: 'dynamicTable',
      fields: fields,
      w: 6,
      h:3,
      minH: 3,
      minW: 4,
    };

    e.dataTransfer.setData('text/plain', JSON.stringify(Data))
  }

  return (
    <TableBlueprint
    fields={ { thead, tbody }}
    onDragStart={handleDragStart}
    
    />
  )
}

DynamicTable.defaultProps = {
    fields : { 
  
      thead: ['{{col1}}', '{{col2}}', '{{col3}}'],
      
      tbody:[
      ],
    }
};

export default DynamicTable