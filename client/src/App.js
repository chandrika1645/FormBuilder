import { useState, useEffect } from "react";
import "./App.css";
import Grid from "./Components/Grid";
import JobDetails from "./Components/JobDetails";
import ServiceAdd from "./Components/ServiceAdd";
// import ApplianceTable from "./Components/ApplianceTable.js";
// import Testtable from "./Components/Testtable";
import "./Styles/Grid.css";
import PageBreak from "./Components/PageBreak.js";
import EmptySpace from "./Components/EmptySpace.js";
import CustomComponent from "./Components/CustomComponent.js";
import RadioButtons from "./Components/RadioButtons.js";
import ImageRenderer from "./BluePrint/ImageRenderer.js";
import jsonData from "./data.json";
import CheckBoxes from "./Components/CheckBoxes.js";
import DropDowns from "./Components/DropDowns.js";

function App() {
  const [rightContentFlexBasis, setRightContentFlexBasis] = useState("25%");
  const [customComponents, setCustomComponents] = useState([]);
  const [htmlContent, setHtmlContent] = useState("");
  const [radioButtons, setRadioButtons] = useState([]);
  const [checkBoxes, setCheckBoxes] = useState([]);
  const [dropDowns, setDropDowns] = useState([]);

  const handleOrientationChange = (flexBasis) => {
    console.log("called the function");
    setRightContentFlexBasis(flexBasis);
  };
  const addCustomComponent = (html) => {
    const newComponent = {
      id: `custom-${customComponents.length + 1}`,
      html,
    };
    setCustomComponents([...customComponents, newComponent]);
  };

  const extractFieldsByUIType = (jsonData, uiType) => {
    const fieldsArray = [];
    jsonData.sections.forEach((section) => {
      if (section.fields) {
        const uiTypeFields = section.fields.filter(
          (field) => field.uiType === uiType
        );
        fieldsArray.push(...uiTypeFields);
      }
    });
    return fieldsArray;
  };

  useEffect(() => {
    const radioButtonsArray = extractFieldsByUIType(jsonData, "RADIO");
    setRadioButtons(radioButtonsArray);

    const dropDownsArray = extractFieldsByUIType(jsonData, "DROPDOWN");
    setDropDowns(dropDownsArray);

    const checkBoxesArray = extractFieldsByUIType(jsonData, "CHECKBOX");
    setCheckBoxes(checkBoxesArray);
  }, []);

  const handleHtmlSubmit = (content) => {
    setHtmlContent(content);
    addCustomComponent(content);
  };

  return (
    <div className="App">
      <div className="Left-content">
        <div className="button">
          <button
            className="portrait-button"
            onClick={() => {
              handleOrientationChange("25%");
            }}
          >
            Portrait
          </button>

          <button
            className="landscape-button"
            onClick={() => {
              handleOrientationChange("85%");
            }}
          >
            Landscape
          </button>
        </div>

        <CustomComponent addCustomComponent={addCustomComponent} />

        {/* <JobDetails />
        <div className="radio-buttons-container">
          <RadioButtons jsonData={jsonData} />
        </div>
        <ImageRenderer /
        <EmptySpace />
        <PageBreak />
        <ServiceAdd />
        <Testtable />
        <ServiceAdd /> */}

        <ImageRenderer />

        <div className="radio-buttons-group">
          <RadioButtons buttons={radioButtons} />
        </div>

        <div className="check-box-group">
          <CheckBoxes buttons={checkBoxes} />
        </div>

        <div className="drop-down-group">
          <DropDowns buttons={dropDowns} />
        </div>
      </div>

      <div
        className="Right-content"
        style={{ flexBasis: rightContentFlexBasis }}
      >
        <Grid
          customComponents={customComponents}
          rightContentFlexBasis={rightContentFlexBasis}
        />
      </div>
    </div>
  );
}

export default App;
