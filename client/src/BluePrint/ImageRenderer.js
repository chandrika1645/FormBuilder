import React from "react";
import "../Styles/ImageRenderer.css";

const images = [
  "https://media.licdn.com/dms/image/C4D0BAQEWvdgwLcSBVg/company-logo_200_200/0/1677706459392/zentrades_logo?e=2147483647&v=beta&t=XB-JZBSt4vMfDJioIxisUi70J61nlXsVMdXM-BW6WwE",
  "https://t3.ftcdn.net/jpg/02/35/26/30/360_F_235263034_miJw2igmixo7ymCqhHZ7c8wp9kaujzfM.jpg",
  "https://t4.ftcdn.net/jpg/03/13/43/99/360_F_313439920_vIYiwmSSZjwkXAmJmkqFb70B7cDKGwj1.jpg",
  "https://static.vecteezy.com/system/resources/thumbnails/006/795/375/small_2x/plumbing-logo-vintage-illustration-template-design-plumber-logo-for-professional-business-concept-emblem-design-vector.jpg",
];

const ImageRenderer = () => {
  const handleDragStart = (e, src, index) => {
    console.log("Dragging", src);

    const data = {
      type: "image",
      componentName: "imageRenderer",
      fields: [{ label: "Image URL", value: src }],
      w: 9,
      h: 8,
      minH: 4,
      minW: 1,
    };

    e.dataTransfer.setData("text/plain", JSON.stringify(data));
  };

  return (
    <div className="image-container">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`image-${index}`}
          draggable={true}
          onDragStart={(event) => handleDragStart(event, src)}
        />
      ))}
    </div>
  );
};

export default ImageRenderer;
