const dataToReplace = {
  textReplace: [
    {
      "{{Job Date}}": "16/06/2001",
    },
    {
      "{{Job Number}}": "changed to 799",
    },
    {
      "{{Bells Quantity}}": "45",
    },
    {
      "{{Horns Quantity}}": "55",
    },
    {
      "{{Chimes Quantity}}": "95",
    },
    {
      "{{Strobes Quantity}}": "75",
    },
    {
      "{{Speakers Quantity}}": "425",
    },
    {
      "{{Bells Circuit}}": "4545",
    },
    {
      "{{Horns Circuit}}": "45",
    },
    {
      "{{Chimes Circuit}}": "45",
    },
    {
      "{{Strobes Circuit}}": "45",
    },
    {
      "{{Speakers Circuit}}": "45",
    },
  ],
};

function replaceTextInHtml() {
  console.log("replcae text() called");
  let htmlContent = document.documentElement.innerHTML;
  let modifiedHtml = htmlContent;
  dataToReplace.textReplace.forEach((replacement) => {
    const [search, replace] = Object.entries(replacement)[0];
    modifiedHtml = modifiedHtml.replace(new RegExp(search, "g"), replace);
  });

  return modifiedHtml;
}
