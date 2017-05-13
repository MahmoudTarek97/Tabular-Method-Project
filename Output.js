//creates an HTML element to display output

var output;
var solutionsExpressions;

function printOutput() {
    var jumbotronDiv = document.createElement("div");
    jumbotronDiv.setAttribute("class", "jumbotron")

    var para = document.createElement("p");
    var paragraphText = document.createTextNode("You Entered minterms: " + minTerms + " And don't cares: " + dontCares + " and number of inputs = " + numberOfInputs);
    para.appendChild(paragraphText);
    jumbotronDiv.append(para);
    if (!specialcase) {
        solutionsExpressions = generateSolutionsExpressions();
    }
    output = "";
    for (var i = 0; i < solutionsExpressions.length; i++) {
        var solutionParagraph = document.createElement("p");
        var solutionText = document.createTextNode("Solution " + (i + 1) + ": " + solutionsExpressions[i]);
        output = output.concat("Solution " + (i + 1) + ": " + solutionsExpressions[i] + "\n");
        solutionParagraph.appendChild(solutionText);
        jumbotronDiv.append(solutionParagraph);
    }

    var outputDiv = document.getElementById("output");

    //removes content of the output div in case the user enters another input without refreshing
    while (outputDiv.hasChildNodes()) {
        outputDiv.removeChild(outputDiv.lastChild);
    }

    outputDiv.appendChild(jumbotronDiv);
    generateGroupListsTables();
}

/*
 * Creates tables out
 * of the group lists
 */
function printSteps() {
    var jumbotronDiv = document.createElement("div");
    jumbotronDiv.setAttribute("class", "jumbotron");
}

function generateGroupListsTables() {
    var divContainer = document.createElement("div");
    divContainer.setAttribute("class", "container-fluid")

    var jumbotronDiv = document.createElement("div");
    jumbotronDiv.setAttribute("class", "jumbotron");

    var header = document.createElement("h3");
    var headerText = document.createTextNode("Grouping Process");
    header.appendChild(headerText);

    for (var i=0; i<groupLists.length; i++) {
        groupListTable = generateGroupListTable(groupLists[i], i);
        divContainer.appendChild(groupListTable);
    }
    
    var stepsDiv = document.getElementById("steps");

    //removes content of the output div in case the user enters another input without refreshing
    while (stepsDiv.hasChildNodes()) {
        stepsDiv.removeChild(stepsDiv.lastChild);
    }

    //Add jumbotron containing all group list tables
    jumbotronDiv.appendChild(header);
    jumbotronDiv.appendChild(divContainer);
    stepsDiv.appendChild(jumbotronDiv);
}

function generateGroupListTable(groupList, index) {
    

    var divCol4 = document.createElement("div");
    divCol4.setAttribute("class", "col-xs-6 col-sm-6 col-md-3 col-lg-3");

    var divTableResponsive = document.createElement("div");
    divTableResponsive.setAttribute("class", "table-responsive");

    var table = document.createElement("table");
    table.setAttribute("class", "table table-bordered");

    var thead = document.createElement("thead");
    var tr1 = document.createElement("tr");
    var th = document.createElement("th");
    th.setAttribute("colspan", 2);
    th.setAttribute("class", "success");
    thText = document.createTextNode("Implicants of size " + Math.pow(2,index));
    th.appendChild(thText);

    tr1.appendChild(th);
    thead.appendChild(tr1);
    table.appendChild(thead);


    var tbody = generateGroupListTableBody(groupList);

    table.appendChild(tbody);
    divTableResponsive.appendChild(table);
    divCol4.appendChild(divTableResponsive);
    return divCol4;
}

function generateGroupListTableBody(groupList) {
    var tbody = document.createElement("tbody");

    for (var i=0; i<groupList.length; i++) {
        var group = groupList[i];

        for (var j=0; j<group.members.length; j++) {
            imp = group.members[j];

            var tr = document.createElement("tr");
            if (j==0) {
                tr.setAttribute("class", "bordered")
            }

            var td1 = document.createElement("td");
            td1Text = document.createTextNode(imp.mintermsCovered.join(", "));
            td1.appendChild(td1Text);

            var td2 = document.createElement("td");
            var symbol;
            if (imp.isChecked) {
                symbol = "✓";
            } else {
                symbol = "Prime";
            }

            if (imp.isDontCare) {
                symbol = symbol + " Dont care";
            }
            td2Text = document.createTextNode(symbol);
            td2.appendChild(td2Text);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tbody.appendChild(tr);
        }
    }
    return tbody;
}

//takes an array of all the valid solutions
//returns an array of strings each an expression for a solution
function generateSolutionsExpressions() {
    var solutionsExpressions = [];
    for (var i = 0; i < solutions.length; i++) {
        solutionsExpressions.push(generateSolutionExpression(solutions[i]))
    }
    return solutionsExpressions;
}

/*takes an array of implicants representing a valid solution
 *returns a string representing the expression of these implicants in literals
 */
function generateSolutionExpression(solution) {
    var expression = [];
    for (var i = 0; i < solution.length; i++) {
        expression.push(generateImplicantExpression(solution[i]))
    }
    return expression.join(" + ");
}

/*takes one implicant
 *and returns it in form of literals
 */
function generateImplicantExpression(imp) {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var charArr = [];
    var baseValue = imp.baseValue;
    var bitsCovered = imp.bitsCovered;

    for (var i = 0; i < numberOfInputs; i++) {
        charArr.push("0");
    }

    for (var i=0; i<numberOfInputs; i++) {
        if (baseValue & 1<<i) {
            var flippedIndex = numberOfInputs - 1 - i;
            charArr[flippedIndex] = "1";
        }
    }

    for (var i = 0; i < bitsCovered.length; i++) {
        var index = Math.log2(bitsCovered[i]);
        var flippedIndex = numberOfInputs - 1 - index;
        charArr[flippedIndex] = "x";
    }

    for (var i = 0; i < charArr.length; i++) {
        if (charArr[i] == "0") {
            charArr[i] = alphabet[i].concat("'");
        } else if (charArr[i] == "1") {
            charArr[i] = alphabet[i];
        } else if (charArr[i] == "x") {
            charArr[i] = "";
        }
    }

    return charArr.join('');
}

function createDownloadButton() {

    buttonDiv = document.getElementById("downloadButton");
    while (buttonDiv.hasChildNodes()) {
        buttonDiv.removeChild(buttonDiv.lastChild);
    }

    divCol6 = document.createElement("div");
    divCol6.setAttribute("class", "col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right");

    button = document.createElement("input");
    button.setAttribute("type", "submit");
    button.setAttribute("class", "btn btn-primary btn-lg");
    button.setAttribute("onClick", "download('output.txt', output);");
    button.setAttribute("value", "Download");

    divCol6.appendChild(button);
    buttonDiv.appendChild(divCol6)
}
