const dataToReplace = {
  "textReplace": [
    {
      "{{Job Date}}": "16/06/2001"
    },
    {
      "{{Job Number}}": "changed to 799"
    },
    {
      "{{Bells Quantity}}": "45"
    },
    {
      "{{Horns Quantity}}": "55"
    },
    {
      "{{Chimes Quantity}}": "95"
    }, 
    {
      "{{Strobes Quantity}}": "75"
    },
    {
      "{{Speakers Quantity}}": "425"
    },
    {
      "{{Bells Circuit}}": "4545"
    },
    {
      "{{Horns Circuit}}": "45"
    },
    {
      "{{Chimes Circuit}}": "45"
    },
    {
      "{{Strobes Circuit}}": "45"
    },
    {
      "{{Speakers Circuit}}": "45"
    },
    
  ],

  // "DynamicTable": [
  //   {
  //     "{{col1}}" : "columns"
  //   },
  //   {
  //     "{{col2}}" : "columns"
  //   },
  //   {
  //     "{{col3}}": "columns"
  //   }
  // ],
  
  
};





function replaceTextInHtml() {
  console.log("replcae text() called");
  let htmlContent = document.documentElement.innerHTML;
  let modifiedHtml = htmlContent;
  dataToReplace.textReplace.forEach(replacement => {
      const [search, replace] = Object.entries(replacement)[0];
      modifiedHtml = modifiedHtml.replace(new RegExp(search, 'g'), replace);
  });

  // dataToReplace.DynamicTable.forEach((replacement, index) => {
  //   const [search, replace] = Object.entries(replacement)[0];
  //   modifiedHtml = modifiedHtml.replace(new RegExp(search, 'g'), replace);
  //   // Get the data for the current row
  //   const rowData = dataToReplace.DynamicTable[index] || [];
  //   // Generate HTML for the table row
  //   const rowDataHTML = rowData.map(data => `<td>${data}</td>`).join('');
  //   // Replace the placeholder with the generated row data HTML
  //   modifiedHtml = modifiedHtml.replace(`{{${search}}}`, rowDataHTML);
  // })

  return modifiedHtml;
}