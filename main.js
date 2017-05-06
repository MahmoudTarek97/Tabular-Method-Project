//global variables
var minTerms;
var dontCares;
var numberOfInputs;

//Reads input and validates it
//input must be comma separated
function readInput() {
	//get input as a string
    var minTermsString = document.getElementById("Minterms").value;
    var dontCaresString = document.getElementById("DontCares").value;

    //filter input and place it in an array of numbers
    minTerms = filterInput(minTermsString);
    dontCares = filterInput(dontCaresString);

    if (inputIsValid()) {
    	setNumberOfInputs();
    	printOutput();
    } else {
    	printError();
    }

}


//creates an HTML element to display output
function printOutput() {
	// alert("You Entered minterms: " + minTerms + " And don't cares: " + dontCares);
 //    console.log("minterms : ", minTerms, "don't cares : ", dontCares);

    var jumbotronDiv = document.createElement("div");
    jumbotronDiv.setAttribute("class", "jumbotron")

    var para = document.createElement("p");
    var paragraphText = document.createTextNode("You Entered minterms: " + minTerms + " And don't cares: " + dontCares + " and number of inputs = " + numberOfInputs);
    para.appendChild(paragraphText);

    jumbotronDiv.append(para)
    var outputDiv = document.getElementById("output");

    //removes content of the output div in case the user enters another input without refreshing
    while (outputDiv.hasChildNodes()) {
    	outputDiv.removeChild(outputDiv.lastChild);
	}

    outputDiv.appendChild(jumbotronDiv);
}

//prints an error message
function printError() {
	alert("Error !");
    console.log("Error !");
}


//takes a string of comma spearated numbers and returns an array of the numbers
function filterInput(str) {
	if (str.length > 0) {
		return str.split(',').map(Number);
	}
	//return an empty array if string length is zero
	return [];
}

//validates input and returns a boolean value
function inputIsValid() {
	//array to mark terms found used to check for duplicate terms
	var visited = []

	for(var i in minTerms) {

		//check if term has a value of NaN
		if (minTerms[i] != minTerms[i]) {
			return false;
		}

		//check if term already found
		if (!visited[minTerms[i]]) {
			visited[minTerms[i]] = 1;
		} else {
			return false;
		}
	}

	for(var i in dontCares) {

		//check if term has a value of NaN
		if (dontCares[i] != dontCares[i]) {
			return false;
		}

		//check if term already found
		if (!visited[dontCares[i]]) {
			visited[dontCares[i]] = 1;
		} else {
			return false;
		}
	}

	return true;
}

function setNumberOfInputs() {
	var max = -1;
	for(var i in minTerms) {
		if (minTerms[i] > max) {
			max = minTerms[i];
		}
	}

	for(var i in dontCares) {
		if (dontCares[i] > max) {
			max = dontCares[i];
		}
	}

	numberOfInputs = Math.ceil(Math.log2(max+1));
}