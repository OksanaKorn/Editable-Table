function startTableCreating() {
    if (document.getElementById("dataForTable").value == "") {
        document.getElementById("text-area-alert").classList.remove("hide");
    } else {
        parseJson(document.getElementById("dataForTable").value);
    }
}

function parseJson(jsonToParse) {
    try {
        var dataForTable = JSON.parse(jsonToParse);
        CreateTable(dataForTable);
        } catch (e) {
            document.getElementById("wrong-format-alert").classList.remove("hide");
        }
}

function CreateTable(dataForTable) {
    for (var i = 0; i < dataForTable.length; i++) {
        cloneTemplateRow();
    
        var tdName = document.querySelectorAll("td.name");
        var tdValue = document.querySelectorAll("td.value");
        for(var c = 1; c < tdName.length; c++) {
            if (!tdName[c].innerHTML) {
                    var valuesArray = Object.values(dataForTable[i]);
                    tdName[c].innerHTML = valuesArray[0];
                    tdValue[c].innerHTML = valuesArray[1];
                }    
        }
    }
    document.getElementById("header").classList.remove("hide");
    document.getElementById("info").classList.add("hide");
    document.getElementById("export-button").classList.remove("hide");
}

function cloneTemplateRow() {
    var firstRow = document.querySelectorAll("tr.hide");
    var row = firstRow[0].cloneNode(true);
    row.classList.remove("hide");
    document.getElementById("table-rows").appendChild(row); 
}

function addNewRow() {
    cloneTemplateRow();
}

function removeRow() {
    var removeIcon = event.target;
    currentRow = removeIcon.parentNode.parentNode;
    var tbody = document.getElementById("table-rows");
    tbody.removeChild(currentRow);
}

function tableUp() {
    var upIcon = event.target;
    var currentRow = upIcon.parentNode.parentNode;
    var previousRow = currentRow.previousElementSibling; 
    if (previousRow.classList.contains("hide")) {
        document.getElementById("first-row-alert").classList.remove("hide");
    } else {
        prevData = previousRow.innerHTML;
        currData = currentRow.innerHTML;

        previousRow.innerHTML = currData;
        currentRow.innerHTML = prevData;
    }
}

function tableDown() {
    var downIcon = event.target;
    var currentRow = downIcon.parentNode.parentNode;
    var nextRow = currentRow.nextSibling; 
    
    if (!nextRow) {
        document.getElementById("last-row-alert").classList.remove("hide");
    } else {
        nextData = nextRow.innerHTML;
        currData = currentRow.innerHTML;

        nextRow.innerHTML = currData;
        currentRow.innerHTML = nextData;
    }
}

function downloadCsv(csv, fileName) {
    var csvFile;
    var downloadLink;

    csvFile = new Blob([csv], {type: "text/csv"});

    downloadLink = document.createElement("a");
    downloadLink.download = fileName;
    downloadLink.href = window.URL.createObjectURL(csvFile)
    downloadLink.style.display = "none";

    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function exportTableToCSV(fileName) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = []
        var cols = rows[i].querySelectorAll("td, th");
        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);
            csv.push(row.join(","));
    }
    downloadCsv(csv.join("\n"), fileName);
}

function handleFileSelect() {
    var files = document.getElementById("json-file").files;
    if (files.length <= 0) {
        return false;
    }
    var fileReader = new FileReader();
    fileReader.onload = function(e) { 
        parseJson(e.target.result)
    }
    fileReader.readAsText(files.item(0));
}