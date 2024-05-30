import React from "react";
import { useState } from "react";
import "../Styles/CustomComponent.css";

const CustomComponent = ({ addCustomComponent }) => {
  const [showHtmlInput, setShowHtmlInput] = useState(false);
  const [htmlInput, setHtmlInput] = useState("");

  const handleCustomComponentClick = () => {
    setShowHtmlInput(true);
  };

  const handleHtmlInputChange = (e) => {
    setHtmlInput(e.target.value);
  };

  const handleHtmlSubmit = () => {
    if (htmlInput.trim() !== "") {
      addCustomComponent(htmlInput);
      setHtmlInput("");
      setShowHtmlInput(false);
    }
  };
  return (
    <div>
      <button onClick={handleCustomComponentClick}>Add Custom Component</button>
      {showHtmlInput && (
        <div>
          <textarea
            value={htmlInput}
            onChange={handleHtmlInputChange}
            placeholder="Enter HTML here"
          ></textarea>
          <button onClick={handleHtmlSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default CustomComponent;
