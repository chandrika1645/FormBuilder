import React from 'react'
import CardBlueprint from '../BluePrint/CardBlueprint';
import '../Styles/PageBreak.css';

const PageBreak = () => {
    const handleDragStart = (e) => {

        console.log("Dragging");
        
        const Data = {
          type: 'card',
          componentName: 'pageBreak',
          fields: [
            {label: 'Page-break', value: 'here'}
          ],
          
          w: 10,
          h: 2,
          minH: 2,
          minW: 2,
        };
    
        e.dataTransfer.setData('text/plain', JSON.stringify(Data));
      };
  return (
    <CardBlueprint fields={[{label: 'Page-break', value: 'here'}]}
    onDragStart={handleDragStart}
    
    />
  );
}

export default PageBreak