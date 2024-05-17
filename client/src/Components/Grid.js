import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import React, { Component } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "../Styles/Grid.css";
import CardBlueprint from "../BluePrint/CardBlueprint";
import TableBlueprint from "../BluePrint/TableBlueprint";
import PageBreakBlueprint from "../BluePrint/PageBreakBlueprint";
// import "./gridUtil";

// started the state changing compact type

const ResponsiveGridLayout = WidthProvider(Responsive);

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: [
        {
          i: "fixed-block-component",
          x: 0,
          y: 3,
          w: 13,
          h: 2,
          static: true,
          preventCollision: true,
        },
      ], //define our grid items and pass them as prop
      dynamicComponents: [], // New state for dynamically added components
      componentData: {},
      styleSheets: [],
      compactType: "horizontal",
    };
    this.removeDynamicComponent = this.removeDynamicComponent.bind(this);
    this.toggleCompactType = this.toggleCompactType.bind(this);
  }

  onDrop = (layout, layoutItem, event) => {
    console.log("onDrop called");
    event.preventDefault();

    const droppedData = event.dataTransfer.getData("text/plain");

    if (droppedData) {
      const Data = JSON.parse(droppedData);

      const { minH, minW, w, h, fields, type, componentName } = Data;
      const { x, y } = layoutItem;

      // const newComponentId = `dynamic-${nextComponentId++}`;

      const newComponentId = `dynamic-${
        this.state.dynamicComponents.length + 1
      }`;

      const newComponent = {
        i: newComponentId,
        x,
        y,
        w,
        h,
        minH,
        minW,
        fields,
        type,
        componentName,
      };

      const updatedComponentData = {
        ...this.state.componentData,
        [newComponentId]: Data,
      };

      console.log("Updated Component data", updatedComponentData);

      this.setState((prevState) => ({
        layout: [...prevState.layout, newComponent],
        dynamicComponents: [...prevState.dynamicComponents, newComponent],
        componentData: updatedComponentData,
      }));
    } else {
      console.log("No dropped data found");
    }
  };

  renderDynamicComponent = (dynamicComponent) => {
    const { componentData } = this.state;
    let fields;

    switch (dynamicComponent.type) {
      case "card":
        fields = componentData[dynamicComponent.i].fields;
        console.log(componentData[dynamicComponent.i].componentName);

        return (
          <CardBlueprint
            CardName={componentData[dynamicComponent.i].componentName}
            id={dynamicComponent.i}
            fields={fields}
          />
        );

      case "image":
        return (
          <img src={componentData[dynamicComponent.i].imageUrl} alt="logo" />
        );

      case "table":
        fields = componentData[dynamicComponent.i].fields;
        console.log(componentData[dynamicComponent.i].componentName);
        return (
          <TableBlueprint
            TableName={componentData[dynamicComponent.i].componentName}
            id={dynamicComponent.i}
            fields={fields}
          />
        );

      case "break":
        fields = componentData[dynamicComponent.i].fields;
        return (
          <PageBreakBlueprint
            CardName={componentData[dynamicComponent.i].componentName}
            id={dynamicComponent.i}
            fields={fields}
          />
        );

      default:
        return null;
    }
  };

  handleResize = (layout) => {
    // Update the size of dynamic components in state when resized
    const updatedDynamicComponents = layout.map((item) => {
      const dynamicComponent = this.state.dynamicComponents.find(
        (comp) => comp.i === item.i
      );
      if (dynamicComponent) {
        return {
          ...dynamicComponent,
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
        };
      }
      return null;
    });

    const filteredDynamicComponents = updatedDynamicComponents.filter(
      (comp) => comp !== null
    );

    this.setState({
      dynamicComponents: filteredDynamicComponents,
      layout,
    });
  };

  handleDrag = (layout) => {
    // Update the position of dynamic components in state when dragged
    const updatedDynamicComponents = layout.map((item) => {
      const dynamicComponent = this.state.dynamicComponents.find(
        (comp) => comp.i === item.i
      );
      if (dynamicComponent) {
        return {
          ...dynamicComponent,
          x: item.x,
          y: item.y,
        };
      }
      return null;
    });

    const filteredDynamicComponents = updatedDynamicComponents.filter(
      (comp) => comp !== null
    );

    this.setState({
      dynamicComponents: filteredDynamicComponents,
    });
  };

  dfs(parent) {
    if (parent.children.length === 0) return;
    for (const child of parent.children) {
      const childStyles = window.getComputedStyle(child);
      Array.from(childStyles).forEach((key) =>
        child.style.setProperty(
          key,
          childStyles.getPropertyValue(key),
          childStyles.getPropertyPriority(key)
        )
      );
      this.dfs(child);
    }
  }

  generateHTML = () => {
    const parent = document.querySelector(".layout");

    this.dfs(parent);

    const updatedHTML = parent.innerHTML;
    const fullHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            /* You can include any styles here */
        </style>
    </head>
    <body>
        ${updatedHTML}
    </body>
    </html>
`;
    const formData = new URLSearchParams();
    formData.append("html", fullHTML);

    fetch("http://localhost:2050/saveTemplate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success
          console.log("File uploaded successfully");
        } else {
          // Handle error
          console.error("Failed to upload file");
        }
      })
      .catch((error) => {
        console.error("Error occurred while uploading file:", error);
      });
  };

  // generateHTML = (layout) => {
  //   const dynamicComponents = document.querySelectorAll(".dynamic-component");
  //   console.log("inside the function");

  //   let componentsWithSeq = [];

  //   // Iterate over each dynamic component
  //   dynamicComponents.forEach((component) => {
  //     const key = component.id.replace("dynamic-component-", "");
  //     const layoutInfo = layout.find((item) => item.i === key);

  //     const rect = component.getBoundingClientRect();
  //     let type;
  //     let name;

  //     const layoutleft = document
  //       .querySelector(".layout")
  //       .getBoundingClientRect().left;
  //     const card = component.querySelector(".Card-component");
  //     const table = component.querySelector(".table");
  //     // console.log(table)
  //     if (card) {
  //       type = "card";
  //       name = card.attributes[2].value;
  //       console.log("logging name", name);
  //     } else if (table) {
  //       type = "table";
  //       name = table.attributes[2].value;
  //       console.log("logging name", name);
  //     }

  //     componentsWithSeq.push({
  //       componentType: type,
  //       componentName: name,
  //       height: rect.height - 20,
  //       left: rect.left - layoutleft,
  //       yTop: rect.top - 80,
  //       yBottom: rect.bottom - 80,
  //       width: rect.width - 20,
  //       right: rect.right - layoutleft,
  //       gridW: layoutInfo ? layoutInfo.w : 0,
  //       gridH: layoutInfo ? layoutInfo.h : 0,
  //     });
  //   });

  //   // componentsWithSeq.sort((a, b) => a.yTop - b.yTop);

  //   class Node {
  //     constructor(data) {
  //       this.data = data;
  //       this.next = null;
  //     }
  //   }

  //   // Sort the components array by yTop
  //   componentsWithSeq.sort((a, b) => a.yTop - b.yTop);

  //   for (let component of componentsWithSeq) {
  //     console.log(component.yTop, component.componentName);
  //   }

  //   // Create a function to group components by yTop and maintain greatest height
  //   function groupComponentsByYTopWithMaxHeight(components) {
  //     let groups = [];
  //     let currentGroup = null;
  //     let maxHeight = -Infinity; // Initialize maxHeight to negative infinity

  //     for (let component of components) {
  //       if (
  //         !currentGroup ||
  //         (currentGroup.data[0].yTop !== component.yTop &&
  //           component.yTop > maxHeight)
  //       ) {
  //         // Create a new group if currentGroup is null,
  //         // or the yTop values differ,
  //         // or the current component's yTop is less than the greatest height
  //         currentGroup = new Node([component]);
  //         groups.push(currentGroup);
  //         maxHeight = component.yBottom; // Update maxHeight
  //       } else {
  //         // Add the component to the current group
  //         currentGroup.data.push(component);
  //         maxHeight = Math.max(maxHeight, component.yBottom); // Update maxHeight
  //       }
  //     }

  //     for (let group of groups) {
  //       group.data.sort((a, b) => a.left - b.left);
  //     }

  //     for (let group of groups) {
  //       group.data.sort((a, b) => a.yTop - b.yTop);
  //       let totalWidth = 0;
  //       for (let i = 0; i < group.data.length; i++) {
  //         let component = group.data[i];
  //         // component.left -= totalWidth; // Update left

  //         // For components with same yTop, update left and yTop
  //         if (i > 0 && component.yTop === group.data[i - 1].yTop) {
  //           component.left -= group.data[i - 1].right;
  //           component.yTop = group.yTop;
  //         }

  //         // Update totalWidth
  //         totalWidth += component.width;
  //       }
  //     }

  //     return groups;
  //   }

  //   // Group components by yTop and maintain greatest height
  //   let groupedComponents =
  //     groupComponentsByYTopWithMaxHeight(componentsWithSeq);

  //   console.log("components array before sending", groupedComponents);

  //   // Send POST request to the server
  //   fetch("http://localhost:2050/saveTemplate", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ groupedComponents }),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         // Handle success
  //         console.log("File uploaded successfully");
  //       } else {
  //         // Handle error
  //         console.error("Failed to upload file");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error occurred while uploading file:", error);
  //     });
  // };

  PrintPdf = (flexBasis) => {
    console.log("inside print pdf");
    console.log(flexBasis);
    fetch("http://localhost:2050/printPDF", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orientation: flexBasis,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob); // Create a URL from the Blob
        const a = document.createElement("a"); // Create a link element
        a.href = url; // Set the href attribute to the URL
        a.download = "generated.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); // Release the URL resource
      })
      .catch((error) => {
        console.error("Error occured while conversion", error);
      });
  };

  removeDynamicComponent = (componentId) => {
    console.log("inside remove fun");
    this.setState((prevState) => ({
      layout: prevState.layout.filter((item) => item.i !== componentId),
      dynamicComponents: prevState.dynamicComponents.filter(
        (item) => item.i !== componentId
      ),
      componentData: Object.fromEntries(
        Object.entries(prevState.componentData).filter(
          ([key]) => key !== componentId
        )
      ),
    }));
  };

  toggleCompactType() {
    const { compactType } = this.state;
    const newCompactType =
      compactType === "horizontal"
        ? "vertical"
        : compactType === "vertical"
        ? null
        : "horizontal";
    this.setState({ compactType: newCompactType });
  }

  render() {
    const { layout, dynamicComponents, compactType } = this.state;
    console.log("Layout data:", layout);
    console.log("Dynamic components:", dynamicComponents);
    return (
      <>
        <div className="button-container">
          <button
            className="pdf-button"
            onClick={() => {
              this.generateHTML(this.state.layout);
            }}
          >
            Save Template
          </button>

          <button
            className="pdf-button"
            onClick={() => {
              this.PrintPdf(this.props.rightContentFlexBasis);
            }}
          >
            Print PDF using data
          </button>

          <button
            className="pdf-button"
            onClick={() => {
              this.pageBreak();
            }}
          >
            handle page break
          </button>
          <button className="pdf-button" onClick={this.toggleCompactType}>
            Toggle Compact Type
          </button>
        </div>

        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: this.state.layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          onResizeStop={this.handleResize}
          onDragStop={this.handleDrag}
          isResizable={true}
          isDroppable={true}
          allowOverlap={false}
          onDrop={this.onDrop}
          onDragOver={(e) => e.preventDefault()}
          // compactType={this.state.compactType}
        >
          {dynamicComponents && dynamicComponents.length > 0 ? (
            dynamicComponents.map((dynamicComponent) => (
              <div
                id={`dynamic-component-${dynamicComponent.i}`}
                key={dynamicComponent.i}
                className="dynamic-component"
                data-grid={{
                  x: dynamicComponent.x,
                  y: dynamicComponent.y,
                  w: dynamicComponent.w,
                  h: dynamicComponent.h,
                  minW: dynamicComponent.minW,
                  minH: dynamicComponent.minH,
                }}
              >
                {this.renderDynamicComponent(dynamicComponent)}
                <div
                  className="hide-button"
                  onClick={() => {
                    this.removeDynamicComponent(dynamicComponent.i);
                  }}
                >
                  &times;
                </div>
              </div>
            ))
          ) : (
            <p>No dynamic components</p>
          )}
        </ResponsiveGridLayout>
      </>
    );
  }
}

export default Grid;
