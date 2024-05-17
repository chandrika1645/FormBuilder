import React, { useState } from 'react'
import "../Styles/PageBreak.css"

const PageBreakBlueprint = ({ id, fields, onDragStart, CardName }) => {
    const [componentName, setComponentName] = useState(`${CardName}`);
  return (
    <div id={id} draggable={true} onDragStart={onDragStart} classnameprefix={componentName} className={`pageBreak`}>
      <p>{fields && fields.value}</p>
    </div>
  )
}

export default PageBreakBlueprint;