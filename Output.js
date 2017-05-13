//creates an HTML element to display output
var output;
var string = "";
var solutionsExpressions;

function printOutput() {
    // alert("You Entered minterms: " + minTerms + " And don't cares: " + dontCares);
    //    console.log("minterms : ", minTerms, "don't cares : ", dontCares);

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
        solutionString = string.concat(solutionsExpressions[i]);
    }


    var outputDiv = document.getElementById("output");

    //removes content of the output div in case the user enters another input without refreshing
    while (outputDiv.hasChildNodes()) {
        outputDiv.removeChild(outputDiv.lastChild);
    }

    outputDiv.appendChild(jumbotronDiv);
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

//takes an array of implicants representing a valid solution
function generateSolutionExpression(solution) {
    var expression = [];
    for (var i = 0; i < solution.length; i++) {
        expression.push(generateImplicantExpression(solution[i]))
    }
    return expression.join(" + ");
}

//takes an implicant
//returns it in form of literals
function generateImplicantExpression(implicant) {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var charArr = [];
    var baseValue = implicant.baseValue;
    var bitsCovered = implicant.bitsCovered;

    for (var i = 0; i < numberOfInputs; i++) {
        charArr.push("0");
    }

    for (var i = 0; i < numberOfInputs; i++) {
        if (baseValue & 1 << i) {
            charArr[i] = "1";
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
