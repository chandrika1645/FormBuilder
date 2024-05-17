import React from 'react'
import TableBlueprint from '../BluePrint/TableBlueprint';

const ApplianceTable = ({fields, onDragStart}) => {

  const {thead, tbody} = fields || ApplianceTable.defaultProps.fields;
  
  const handleDragStart = (e) => {

    console.log("Dragging");


    const Data = {
      type: 'table',
      componentName: 'applianceTable',
      fields: fields,
      w: 6,
      h:7,
      minH: 7,
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
};


ApplianceTable.defaultProps = {
  fields : { 

    thead: ['Appliances', 'Quality', 'Circuit Style'],
    
    tbody:[
    { Appliances: 'Bells', Quantity: '{{Bells Quantity}}' , 'Circuit Style': '{{Bells Circuit}}' },
    { Appliances: 'Horns', Quantity: '{{Horns Quantity}}', 'Circuit Style': '{{Horns Circuit}}' },
    { Appliances: 'Chimes', Quantity: '{{Chimes Quantity}}', 'Circuit Style': '{{Chimes Circuit}}' },
    { Appliances: 'Strobes', Quantity: '{{Strobes Quantity}}', 'Circuit Style': '{{Strobes Circuit}}' },
    { Appliances: 'Speakers', Quantity: '{{Speakers Quantity}}', 'Circuit Style': '{{Speakers Circuit}}' },
    
    
    ],
  }
};

export default ApplianceTable