const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const port = 2050;
const puppeteer = require("puppeteer");

const JSONdata = {
  applianceTable: [
    {
      thead: ["Appliances", "Quality", "Circuit Style"],

      tbody: [
        {
          Appliances: "Bells",
          Quantity: "{{Bells Quantity}}",
          "Circuit Style": "{{Bells Circuit}}",
        },
        {
          Appliances: "Horns",
          Quantity: "{{Horns Quantity}}",
          "Circuit Style": "{{Horns Circuit}}",
        },
        {
          Appliances: "Chimes",
          Quantity: "{{Chimes Quantity}}",
          "Circuit Style": "{{Chimes Circuit}}",
        },
        {
          Appliances: "Strobes",
          Quantity: "{{Strobes Quantity}}",
          "Circuit Style": "{{Strobes Circuit}}",
        },
        {
          Appliances: "Speakers",
          Quantity: "{{Speakers Quantity}}",
          "Circuit Style": "{{Speakers Circuit}}",
        },
      ],
    },
  ],
  testtable: [
    {
      thead: ["Appliances", "Quality", "Circuit Style"],

      tbody: [
        { Appliances: "Bells", Quantity: "", "Circuit Style": "" },
        { Appliances: "Horns", Quantity: "", "Circuit Style": "" },
        { Appliances: "Chimes", Quantity: "", "Circuit Style": "" },
        { Appliances: "Strobes", Quantity: "", "Circuit Style": "" },
        { Appliances: "Speakers", Quantity: "", "Circuit Style": "" },
        { Appliances: "Bells", Quantity: "", "Circuit Style": "" },
        { Appliances: "Horns", Quantity: "", "Circuit Style": "" },
        { Appliances: "Chimes", Quantity: "", "Circuit Style": "" },
        { Appliances: "Bells", Quantity: "", "Circuit Style": "" },
        { Appliances: "Horns", Quantity: "", "Circuit Style": "" },
        { Appliances: "Chimes", Quantity: "", "Circuit Style": "" },
        { Appliances: "Strobes", Quantity: "", "Circuit Style": "" },
        { Appliances: "Speakers", Quantity: "", "Circuit Style": "" },
        { Appliances: "Bells", Quantity: "", "Circuit Style": "" },
        { Appliances: "Horns", Quantity: "", "Circuit Style": "" },
        { Appliances: "Chimes", Quantity: "", "Circuit Style": "" },
      ],
    },
  ],
  serviceAdd: [
    {
      fields: [
        { label: "Title", value: "Service Address", isTitle: true },
        {
          label: "Address",
          value: "Cafe lglesia 2200 E.Park Row Arlington, TX 76010 ",
        },
        { label: "Phone", value: "(817) 459-3901" },
        { label: "Email", value: "pastor@iglesiacafe.com" },
      ],
    },
  ],
  jobDetails: [
    {
      fields: [
        { label: "Title", value: "Job Details", isTitle: true },
        { label: "Job Date", value: "{{Job Date}}" },
        { label: "Job #", value: "{{Job Number}}" },
      ],
    },
  ],
};

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/templates");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const saveTemplate = multer({ storage: storage });
const a = 12;

//middelwares

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello again"); // Or render your HTML file here
});

app.post("/saveTemplate", (req, res) => {
  // Extract the componentsWithSeq array from the request body

  const { groupedComponents } = req.body;

  if (!groupedComponents) {
    console.error("Error: componentsWithSeq is missing in the request body.");
    return res
      .status(400)
      .send("Error: componentsWithSeq is missing in the request body.");
  }

  if (!Array.isArray(groupedComponents)) {
    console.error(
      "Error: groupedComponents is not a NodeList in the request body."
    );
    return res
      .status(400)
      .send("Error: groupedComponents is not a NodeList in the request body.");
  }

  // file path
  const filePath = path.join(__dirname, "templates", "layout.html");

  try {
    let existingContent = `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Generated Form</title>
        <link rel="stylesheet" href="./Styles.css">
        <script src="../replaceText.js"> </script>
        <style>

        </style>
        </head>
        <body>
        <div id="form-content" style="width: 1100px;">
        <!-- Generated form content goes here -->
        </div>
        </body>
        </html>`;

    groupedComponents.forEach((group, index) => {
      // Assuming each group contains an array of components
      if (Array.isArray(group.data)) {
        console.log(group);
        let groupDiv = `<div style="
        width: 1100px !important;
        display: flex;
        flex-wrap: wrap;

        

         ">`;
        existingContent = existingContent.replace(
          "<!-- Generated form content goes here -->",
          groupDiv + "<!-- Generated form content goes here -->"
        );

        // display: flex;
        //   flex-wrap: wrap;
        // grid-template-columns: repeat(10, auto);
        // grid-gap: 10px;

        let isLastComponent = false;
        // Iterate over components within each group

        // group.data.forEach((component, index) => {
        //   if (component.componentType === "table") {
        //     const name = component.componentName;
        //     console.log(name);
        //     // Generate HTML for the table
        //     const data = JSONdata[name];

        //     if (data) {
        //       // Generate HTML for the table
        //       let tableHTML = `<table
        //                     style="

        //                     margin-left: ${component.left}px;
        //                     grid-column: span ${component.gridW};
        //                     grid-row: span ${component.gridH};
        //                     "
        //                     class="table">`;

        //       // Generate table header
        //       tableHTML += "<thead><tr>";
        //       data[0].thead.forEach((header) => {
        //         tableHTML += `<th>${header}</th>`;
        //       });
        //       tableHTML += "</tr></thead>";

        //       // Generate table body
        //       tableHTML += "<tbody>";
        //       data[0].tbody.forEach((row) => {
        //         tableHTML += "<tr>";
        //         Object.values(row).forEach((value) => {
        //           tableHTML += `<td>${value}</td>`;
        //         });
        //         tableHTML += "</tr>";
        //       });
        //       tableHTML += "</tbody></table>";

        //       // Replace placeholder in existing content with generated table HTML
        //       existingContent = existingContent.replace(
        //         "<!-- Generated form content goes here -->",
        //         tableHTML + "<!-- Generated form content goes here -->"
        //       );
        //     } else {
        //       console.log("tableName not found in JSON");
        //     }
        //   } else if (component.componentType === "card") {
        //     const name = component.componentName;

        //     const cardData = JSONdata[name];

        //     if (cardData) {
        //       // Generate HTML for the card component
        //       let cardHTML = `<div class="Card-component"
        //                     style="
        //                     margin-left: ${component.left}px;
        //                     grid-column: span ${component.gridW};
        //                     grid-row: span ${component.gridH};
        //                      "
        //                     >`;

        //       // Iterate through card fields and generate HTML
        //       cardData[0].fields.forEach((field) => {
        //         if (field.isTitle) {
        //           cardHTML += `<p style="font-weight: bold;">${field.value}</p>`;
        //         } else {
        //           cardHTML += `<p>${field.label}: ${field.value}</p>`;
        //         }
        //       });

        //       cardHTML += `</div>`;

        //       // Replace placeholder in existing content with generated card HTML
        //       existingContent = existingContent.replace(
        //         "<!-- Generated form content goes here -->",
        //         cardHTML + "<!-- Generated form content goes here -->"
        //       );
        //     } else {
        //       console.log("Card name not found in JSON");
        //     }
        //   }

        //   isLastComponent = index === group.data.length - 1;
        // });

        //logic using flex

        group.data.forEach((component, index) => {
          let componentHTML = "";

          if (component.componentType === "table") {
            const name = component.componentName;
            console.log(name);
            // Generate HTML for the table
            const data = JSONdata[name];

            if (data) {
              // Generate HTML for the table
              let tableHTML = `<table
                            style="

                            height: ${component.height}px ;

                            width: ${component.width}px;
                            "
                            class="table">`;

              // Generate table header
              tableHTML += "<thead><tr>";
              data[0].thead.forEach((header) => {
                tableHTML += `<th>${header}</th>`;
              });
              tableHTML += "</tr></thead>";

              // Generate table body
              tableHTML += "<tbody>";
              data[0].tbody.forEach((row) => {
                tableHTML += "<tr>";
                Object.values(row).forEach((value) => {
                  tableHTML += `<td>${value}</td>`;
                });
                tableHTML += "</tr>";
              });
              tableHTML += "</tbody></table>";

              // Replace placeholder in existing content with generated table HTML
              existingContent = existingContent.replace(
                "<!-- Generated form content goes here -->",
                tableHTML + "<!-- Generated form content goes here -->"
              );
            } else {
              console.log("tableName not found in JSON");
            }
          } else if (component.componentType === "card") {
            const name = component.componentName;
            let cardHTML;

            if (name === "pageBreak") {
              cardHTML = `<div class= "Page-Break"
              style=" width: ${component.width}px;
              height: 100px;
              page-break-after: always;"> </div>`;
            } else if (name === "emptySpace") {
              cardHTML = `<div class= "Page-Break"
              style=" width: ${component.width}px;
              height:  ${component.height}px;
              "> </div>`;
            } else {
              const cardData = JSONdata[name];

              if (cardData) {
                // Generate HTML for the card component
                cardHTML = `<div class="Card-component"
                              style="

                              width: ${component.width}px;
                              height: ${component.height}px; "
                              >`;

                // Iterate through card fields and generate HTML
                cardData[0].fields.forEach((field) => {
                  if (field.isTitle) {
                    cardHTML += `<p style="font-weight: bold;">${field.value}</p>`;
                  } else {
                    cardHTML += `<p>${field.label}: ${field.value}</p>`;
                  }
                });

                cardHTML += `</div>`;
              } else {
                console.log("Card name not found in JSON");
              }
            }

            // Replace placeholder in existing content with generated card HTML

            existingContent = existingContent.replace(
              "<!-- Generated form content goes here -->",
              cardHTML + "<!-- Generated form content goes here -->"
            );
          } else if (component.componentType === "custom-component") {
            // For custom components, use the innerHTML property
            componentHTML = `<div
              class="custom-component"
              style="
                width: ${component.width}px;
                height: ${component.height}px;
              "
            >${component.innerHTML}</div>`;
          }

          // Replace placeholder in existing content with generated component HTML
          existingContent = existingContent.replace(
            "<!-- Generated form content goes here -->",
            componentHTML + "<!-- Generated form content goes here -->"
          );

          isLastComponent = index === group.data.length - 1;
        });

        //comment it till here

        if (isLastComponent) {
          // If it's the last component, add closing div tag
          existingContent = existingContent.replace(
            "<!-- Generated form content goes here -->",
            `</div>` + "<!-- Generated form content goes here -->"
          );
        }
      } else {
        console.error("Error: components is not an array in the group.");
      }
    });
    console.log(existingContent);
    fs.writeFileSync(filePath, existingContent);

    //     groupedComponents.forEach((component, index) => {
    //     // Check if the component type is "table"
    //     if (component.componentType === "table") {
    //         const name = component.componentName;
    //         console.log(name);
    //         // Generate HTML for the table
    //         const data = JSONdata[name];

    //         if (data) {
    //           // Generate HTML for the table
    //           let tableHTML = `<table
    //             style="
    //             position: absolute;
    //             height: ${component.height}px ;
    //             top: ${component.yTop}px;
    //             left: ${component.left}px;
    //             width: ${component.width}px;
    //             "
    //             class="table">`;

    //           // Generate table header
    //           tableHTML += '<thead><tr>';
    //           data[0].thead.forEach(header => {
    //             tableHTML += `<th>${header}</th>`;
    //           });
    //           tableHTML += '</tr></thead>';

    //           // Generate table body
    //           tableHTML += '<tbody>';
    //           data[0].tbody.forEach(row => {
    //             tableHTML += '<tr>';
    //             Object.values(row).forEach(value => {
    //               tableHTML += `<td>${value}</td>`;
    //             });
    //             tableHTML += '</tr>';
    //           });
    //           tableHTML += '</tbody></table>';

    //           // Replace placeholder in existing content with generated table HTML
    //           existingContent = existingContent.replace('<!-- Generated form content goes here -->', tableHTML + '<!-- Generated form content goes here -->');

    //         }else{
    //             console.log("tableName not found in JSON");
    //         }
    // }else if (component.componentType === "card" && component.componentName === "pageBreak") {

    //     console.log("inside page-break condition");

    //     let cardHTML = `<div style=" position: absolute;
    //     top: ${component.yTop}px;
    //     left: ${component.left}px;
    //     width: ${component.width}px;
    //     height: ${component.height}px;
    //     background-color: gray;
    //     page-break-after: always;"> </div> `

    //     existingContent = existingContent.replace('<!-- Generated form content goes here -->', cardHTML + '<!-- Generated form content goes here -->');
    // }else if (component.componentType === "card") {

    //         const name = component.componentName

    //         // if(name==="pageBreak"){

    //         //     <div style={}>

    //         //     </div>
    //         // }

    //         const cardData = JSONdata[name];

    //         if (cardData) {
    //             // Generate HTML for the card component
    //             let cardHTML = `<div class="Card-component"
    //             style="
    //             position: absolute;
    //             top: ${component.yTop}px;
    //             left: ${component.left}px;
    //             width: ${component.width}px;
    //             height: ${component.height}px; "
    //             >`;

    //             // Iterate through card fields and generate HTML
    //             cardData[0].fields.forEach(field => {
    //                 if (field.isTitle) {
    //                     cardHTML += `<p style="font-weight: bold;">${field.value}</p>`;
    //                 } else {
    //                     cardHTML += `<p>${field.label}: ${field.value}</p>`;
    //                 }
    //             });

    //             cardHTML += `</div>`;

    //             // Replace placeholder in existing content with generated card HTML
    //             existingContent = existingContent.replace('<!-- Generated form content goes here -->', cardHTML + '<!-- Generated form content goes here -->');
    //         } else {
    //             console.log("Card name not found in JSON");
    //         }
    //     }
    // }
    // );

    // Write the updated content back to the file synchronously
    // fs.writeFileSync(filePath, existingContent);
    console.log("Content written to file successfully.");
    res.status(200).send("Content written to file successfully.");
  } catch (err) {
    console.error("Error writing content to file:", err);
    res.status(500).send("Error writing content to file.");
  }
});

async function runPuppeteer(orientation, res) {
  console.log("inside runpuppeteer ");
  console.log(orientation);

  if (!orientation) {
    throw new Error(
      "Orientation data is not available., please select orientation type"
    );
  }
  try {
    // Launch headless Chrome
    const browser = await puppeteer.launch({ headless: true });

    // Create a new page
    const page = await browser.newPage();
    await page.setViewport({ width: 1950, height: 768 });

    const filePath = path.resolve(__dirname, "./templates/layout.html");
    const fileUrl = `file://${filePath}`;

    console.log("File URL:", fileUrl);

    await page.goto(fileUrl, {
      waitUntil: "load",
    });

    //console.log("entered the try block");

    const modifiedHtml = await page.evaluate(() => {
      return replaceTextInHtml(); // Calling the function defined in the HTML file
    });

    await page.setContent(modifiedHtml, {
      waitUntil: "networkidle0",
    });

    const value = orientation === "85%" ? "landscape" : "portrait";

    const type = value === "landscape";

    // const headerTemplate= '<pan style="font-size: 30px; width: 200px; height: 200px; background-color: black; color: white; margin: 20px;">Header 1</span>'
    // const footerTemplate= '<span style="font-size: 30px; width: 50px; height: 50px; background-color: red; color:black; margin: 20px;">Footer</span>'
    const headerTemplate = `
  <div style="font-size: 10px; text-align: left; width: 100%;">
    <span class="pageNumber"></span> / <span class="totalPages"></span>
  </div>
`;
    const footerTemplate = `
  <div style="font-size: 10px; text-align: left; width: 100%;">
    footer
  </div>
`;

    //print login here
    // await page.pdf({ path: 'page.pdf', format: 'A4', printBackground: true , landscape: type , });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      landscape: type,
      margin: { top: "15mm", right: "8mm", bottom: "10mm", left: "8mm" },
      headerTemplate: headerTemplate,
      footerTemplate: footerTemplate,
      displayHeaderFooter: true,
    });
    console.log("PDF conversion completed.");

    //  Close the browser
    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdfBuffer.length,
      "Content-Disposition": 'attachment; filename="generated.pdf"',
    });
    res.status(200).send(pdfBuffer);

    console.log("PDF conversion completed.");
  } catch (error) {
    console.error("An error occurred during page evaluation:", error);
    res.status(500).send("An error occurred during PDF generation");
  }
}

app.post("/printPDF", async (req, res) => {
  const { orientation } = req.body;

  try {
    await runPuppeteer(orientation, res);
    console.log("PDF generated successfully.");
    // res.json({ message: 'PDF generated successfully.' });
  } catch (error) {
    console.error("An error occurred during PDF printing:", error.message);
    res.status(500).json({ error: error.message });
  }
});

//server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
