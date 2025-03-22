pageBreak = () => {
  const dynamicComponents = document.querySelectorAll(".dynamic-component");

  let givenHeight = 1750;
  let componentsWithY = [];

  // Iterate over each dynamic component
  dynamicComponents.forEach((component) => {
    const rect = component.getBoundingClientRect();

    // Store the component and its Y position
    componentsWithY.push({
      element: component,
      yTop: rect.top,
      yBottom: rect.bottom,
    });
  });

  componentsWithY.sort((a, b) => a.yBottom - b.yBottom);

  let obj = { givenHeight: givenHeight, changedHeight: 0, marginAdded: 0 };

  componentsWithY.forEach((componentData, index) => {
    if (
      this.isHeightInRange(
        componentData.yTop,
        componentData.yBottom,
        obj,
        componentData.element,
        componentsWithY,
        index
      )
    ) {
      console.log(
        `Height ${givenHeight}px is within the range of Component ${index + 1}`
      );
    } else {
      console.log(
        `Height ${givenHeight}px is not within the range of Component ${
          index + 1
        }`
      );
    }
    console.log(givenHeight);
  });
};

isHeightInRange = (yTop, yBottom, obj, component, index) => {
  if (yBottom + obj.marginAdded > obj.givenHeight) {
    // if(yBottom > obj.givenHeight){
    console.log(
      "yTop",
      yTop,
      "yBottoom",
      yBottom,
      "total margin",
      obj.marginAdded,
      "pageHeight",
      obj.givenHeight
    );
    let marginToAdd = obj.givenHeight - (yTop + obj.marginAdded);

    console.log("margin diff for this compo", marginToAdd);
    if (marginToAdd < 0) {
      marginToAdd = 0;
    }
    obj.givenHeight += 1750;
    obj.marginAdded += marginToAdd;
  }
  console.log(
    "yTop",
    yTop,
    "yBottoom",
    yBottom,
    "total margin",
    obj.marginAdded,
    "pageHeight",
    obj.givenHeight
  );
  console.log("margin added" + obj.marginAdded + "at " + index);
  component.style.marginTop = `${obj.marginAdded}px`;
  console.log("added margin ", obj.marginAdded);

  // if ( yBottom + obj.marginAdded > obj.givenHeight) {

  //   let marginToAdd = obj.givenHeight - (yTop + obj.marginAdded)
  //   obj.givenHeight += 1700
  //   obj.marginAdded += `${marginToAdd}px`{"type":"card","fields":[{"label":"Title","value":"Service Address","isTitle":true},{"label":"Address","value":"Cafe lglesia 2200 E.Park Row Arlington, TX 76010 "},{"label":"Phone","value":"(817) 459-3901"},{"label":"Email","value":"pastor@iglesiacafe.com"}],"w":4,"h":5,"minH":5,"minW":2}

  //   // if(yTop > obj.givenHeight){
  //   //   // givenHeight= givenHeight+1700;
  //   // }
  //   // if(yTop < obj.givenHeight ){

  //   //   const marginTop = Math.abs(yTop - obj.givenHeight);

  //   //   console.log(`Component needs ${marginTop}px top margin to fit within the given height`);
  //   //   component.style.marginTop = `${marginTop}px `;

  //   //   const currentIndex = componentsWithY.findIndex(item => item.element.id === component.id);

  //   //     // Iterate through the components after the current component and add margin to them
  //   //     for (let i = currentIndex + 1; i < componentsWithY.length; i++) {
  //   //       const nextComponent = componentsWithY[i];
  //         // nextComponent.element.style.marginTop = `${marginTop}px`;
  //   //     }

  //   //     obj.givenHeight = obj.givenHeight+1700;
  //   // }

  //   // return false;
  // }
  // component.style.marginTop = obj.marginAdded
  console.log(yTop, " is y top", yBottom, " is y bottom");
  return yBottom <= obj.givenHeight;
};
