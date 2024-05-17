import React from 'react'
import CardBlueprint from '../BluePrint/CardBlueprint';


const JobDetails = ({ title, date, jobNumber}) => {
  const handleDragStart = (e) => {

    console.log("Dragging");
    
    const Data = {
      type: 'card',
      componentName: 'jobDetails',
      fields: [
        {label: 'Title', value: title, isTitle: true},
        { label: 'Job Date', value: date },
        { label: 'Job #', value: jobNumber }
      ],
      
      w: 4,
      h: 4,
      minH: 4,
      minW: 1,
    };

    e.dataTransfer.setData('text/plain', JSON.stringify(Data));
  };
  return (

    <CardBlueprint
      fields={[
        { label: 'Title', value: title, isTitle: true },
        { label: 'Job Date', value: date },
        { label: 'Job #', value: jobNumber }
      ]}
      onDragStart={handleDragStart}
    />
    
  );
};


JobDetails.defaultProps = {
  title: 'Job Details',
  date: '{{Job Date}}',
  jobNumber: '{{Job Number}}'
};

export default JobDetails




