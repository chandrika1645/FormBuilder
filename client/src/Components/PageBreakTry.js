import React from 'react';
import PageBreakBlueprint from '../BluePrint/PageBreakBlueprint';

const PageBreakTry = ({ fields }) => {
    const handleDragStart = (e) => {
        console.log("Dragging");

        const Data = {
            type: 'break',
            componentName: 'pageBreak',
            fields: fields,
            w: 10,
            h: 3,
            minH: 1,
            minW: 2,
        };

        e.dataTransfer.setData('text/plain', JSON.stringify(Data));
    };

    return (
        <PageBreakBlueprint 
            fields={{value: "page break here"}}
                
            
            onDragStart={handleDragStart}
        />
    );
}

export default PageBreakTry;