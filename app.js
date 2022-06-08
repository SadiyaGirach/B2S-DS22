console.log("Hello B2S");

let viz;

const pdfbutton = document.getElementById("exportPDF");

const powerpointbutton = document.getElementById("powerpoint");

//grab container from index page
const containerDiv = document.getElementById("vizContainer");
console.log(containerDiv);

// define some viz options (device, width, height)
const options = {
  device: "desktop",
  hideToolbar: false,
  height: 1000,
  width: 1000,
};

//create a variable to hold the dash url
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard?";

function initViz() {
  viz = new tableau.Viz(containerDiv, url, options);
}

pdfbutton.addEventListener("click", function () {
  viz.showExportPDFDialog();
});

powerpointbutton.addEventListener("click", function () {
  viz.showExportPowerPointDialog();
});

//funtion that grabs filter values and filters the viz
function getRangeValues() {
  //get the values from the input boxes
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);

  //get the workbook
  const workbook = viz.getWorkbook();

  //get active sheet - which is either a dashboard or a worksheet

  const activesheet = workbook.getActiveSheet();
  const sheets = activesheet.getWorksheets();
  const sheettofilter = sheets[1];
  sheettofilter
    .applyRangeFilterAsync("SUM(Sales)", {
      min: minValue,
      max: maxValue,
    })
    .then(alert("You filtered the viz"));
}

document
  .getElementById("filterbutton")
  .addEventListener("click", getRangeValues);

document.addEventListener("DOMContentLoaded", initViz);
