"use strict";

var tableString = `team,won,lost,ip,hit,run,er,bb,so,sa,bs,ho,qs,hb,hr,st,sho
orio,25,35,518.2,490,294,261,192,487,11,7,32,10,20,79,60,0
rsox,24,36,524.0,587,351,325,252,537,14,13,40,9,17,98,60,0
ange,26,34,525.1,493,321,297,199,523,12,14,23,15,10,82,60,0
indi,35,25,536.0,440,209,196,157,621,20,8,35,37,17,68,60,0
tige,23,35,492.1,510,318,308,192,444,12,8,26,9,24,91,58,0
astr,29,31,524.0,473,275,252,217,526,16,13,27,25,17,70,60,0
roya,26,34,517.0,499,272,247,211,517,19,1,29,11,17,76,60,1
twin,36,24,513.1,448,215,204,170,535,17,10,49,16,12,62,60,0
rays,40,20,527.2,475,229,208,168,552,23,8,42,7,20,70,60,0
yank,33,27,500.2,455,270,243,168,528,14,9,16,18,15,83,60,1
as,36,24,515.1,470,232,214,165,506,17,4,33,19,8,69,60,1
mari,27,33,516.2,481,303,290,230,469,15,9,30,25,24,79,60,0
rang,22,38,516.2,480,312,288,236,489,10,9,15,17,21,81,60,1
blue,32,28,524.2,518,312,272,250,519,17,12,32,11,10,81,60,0
whit,35,25,527.0,448,246,222,217,523,13,12,31,19,18,71,60,1
brav,35,25,524.1,494,288,259,220,506,13,6,31,13,14,69,60,0
reds,31,29,504.0,403,243,221,213,615,9,7,25,26,24,67,60,2
rock,26,34,526.1,579,353,327,205,393,16,8,20,28,23,83,60,0
cubs,34,26,518.1,451,240,231,182,523,16,5,26,30,13,74,60,2
marl,31,29,504.1,507,304,272,226,451,18,5,29,16,19,82,60,0
dodg,43,17,538.2,423,213,180,145,517,15,10,50,18,11,66,60,0
brew,29,31,517.1,446,264,240,189,614,14,8,20,15,26,67,60,0
diam,25,35,518.1,507,295,280,235,524,13,9,22,13,19,93,60,0
mets,26,34,513.1,512,308,286,219,574,11,7,28,17,19,81,60,0
phil,28,32,496.0,547,311,287,185,532,11,13,27,20,21,80,60,2
pira,19,41,513.0,450,298,266,249,536,6,13,22,9,17,80,60,0
padr,37,23,520.1,456,241,221,170,565,13,11,42,22,17,70,60,1
gian ,29,31,517.2,474,297,268,210,488,13,11,43,11,21,69,60,0
card,30,28,473.0,376,229,207,204,464,13,5,22,18,18,69,58,0
nati,26,34,503.2,550,301,286,216,508,12,10,40,16,19,94,60,0`;

let table = document.querySelector("table")

function makeTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for(let i = 0; i < data.length; i++) {
        let th = document.createElement("th");
        th.onclick = function() {sortTable(i)};
        let text = document.createTextNode(data[i]);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function makeTable(table, data) {
    for(let i = 0; i < data.length; i++) {
        let row = document.createElement("tr");
        table.appendChild(row);
        for(let j = 0; j < data[i].length; j++) {
            let tableData = document.createElement("td");
            tableData.innerHTML = data[i][j];
            row.appendChild(tableData);
        }
    }
}

function parseTable() {
    tableString = tableString.split("\n");
    tableString = tableString.map((s) => s.split(","));
    makeTableHead(table, tableString[0]);
    tableString = tableString.slice(1);
    makeTable(table, tableString);
}

function sortTable(n) {
    let switchcount = 0;
    var table = document.getElementById("BaseballStats");
    var switching = false;
    var dir = "asc"; 
    while (!switching) {
        switching = true;
        var rows = table.rows;
        var i;
        for (i = 1; i < (rows.length -1); i++) {
            var first = rows[i].getElementsByTagName("TD")[n];
            var second = rows[i + 1].getElementsByTagName("TD")[n];
            var shouldSwitch = false;
            if(isNaN(first.innerHTML)) {
                if (dir == "asc") {
                    if (first.innerHTML.toLowerCase() > second.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                            break;
                    }
                } 
                else if (dir == "desc") {
                    if (first.innerHTML.toLowerCase() < second.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            else if(first.innerHTML.indexOf('.') != -1) {
                if (dir == "asc") {
                    if (parseFloat(first.innerHTML) > parseFloat(second.innerHTML)) {
                        shouldSwitch = true;
                            break;
                    }
                } 
                else if (dir == "desc") {
                    if (parseFloat(first.innerHTML) < parseFloat(second.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            else {
                if (dir == "asc") {
                    if (parseInt(first.innerHTML) > parseInt(second.innerHTML)) {
                        shouldSwitch = true;
                            break;
                    }
                } 
                else if (dir == "desc") {
                    if (parseInt(first.innerHTML) < parseInt(second.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = false;
            switchcount ++; 
        } 
        else {
            if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = false;
            }
        } 
    }
}

function searchTeams(n) { 
var input, filter, table, tr, td, i, txtValue;
input = document.getElementById("searchBarTeams");
filter = input.value.toUpperCase();
table = document.getElementById("BaseballStats");
tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[n];
        if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
        } 
    }
}

function searchWins(n) { 
    var input = document.getElementById("searchBarWins");
    searchInt(n, input);
}

function searchLosses(n) { 
    var input = document.getElementById("searchBarLosses");
    searchInt(n, input);
}

function searchInningsPitched(n) { 
    var input = document.getElementById("searchBarInningsPitched");
    searchFloat(n, input);
}

function searchHits(n) { 
    var input = document.getElementById("searchBarHits");
    searchInt(n, input);
}

function searchRuns(n) { 
    var input = document.getElementById("searchBarRuns");
    searchInt(n, input);
}

function searchER(n) { 
    var input = document.getElementById("searchBarER");
    searchInt(n, input);
}

function searchWalks(n) { 
    var input = document.getElementById("searchBarWalks");
    searchInt(n, input);
}

function searchStrikeouts(n) { 
    var input = document.getElementById("searchBarStrikeouts");
    searchInt(n, input);
}

function searchSaves(n) { 
    var input = document.getElementById("searchBarSaves");
    searchInt(n, input);
}

function searchBlownSaves(n) { 
    var input = document.getElementById("searchBarBlownSaves");
    searchInt(n, input);
}

function searchHolds(n) { 
    var input = document.getElementById("searchBarHolds");
    searchInt(n, input);
}

function searchQS(n) { 
    var input = document.getElementById("searchBarQS");
    searchInt(n, input);
}

function searchHB(n) { 
    var input = document.getElementById("searchBarHB");
    searchInt(n, input);
}

function searchHR(n) { 
    var input = document.getElementById("searchBarHR");
    searchInt(n, input);
}

function searchGS(n) { 
    var input = document.getElementById("searchBarGS");
    searchInt(n, input);
}

function searchSO(n) { 
    var input = document.getElementById("searchBarSO");
    searchInt(n, input);
}

function searchInt(n, input) { 
    var filter = parseInt(input.value);
    var table = document.getElementById("BaseballStats");
    var tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[n];
        if (td) {
        var txtValue = td.textContent || td.innerText;
        if (parseInt(txtValue) < filter) {
            tr[i].style.display = "none";
        } else {
            tr[i].style.display = "";
        }
        } 
    }
}

function searchFloat(n, input) {
    var filter = parseFloat(input.value);
    var table = document.getElementById("BaseballStats");
    var tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[n];
        if (td) {
        var txtValue = td.textContent || td.innerText;
        if (parseFloat(txtValue) < filter) {
            tr[i].style.display = "none";
        } else {
            tr[i].style.display = "";
        }
        } 
    }
}

parseTable();