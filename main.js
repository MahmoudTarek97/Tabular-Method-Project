// this is the main file for the program
// it controls the fllow of functions calling

var minTerms;
var dontCares;
var numberOfInputs;
var groupLists;
var primeImplicants;
var resultImplicants;

function main() {

    //initialize our Arrays
    minTerms = [];
    dontCares = [];
    groupLists = [[]];
    primeImplicants = [];
    resultImplicants = [];

    //Part 0
    readInput(); //put them in Array minTerms & dontCares


    //Part 1
    initializeGroupList();
    initializeGroups();
    var i = 0;
    do {
        groupLists[i + 1] = [];
        var generatedGroupList = groupingProcess(groupLists[i], groupLists[i + 1]);
        console.log(generatedGroupList)
        i++;
    }
    while (!isEmptyGroupList(generatedGroupList));
    groupLists.pop();


    //test output
    
    console.log(printImplicantArray("Prime Implicants: ", primeImplicants));

    //Part 2
    eliminationProcess();
    console.log(printImplicantArray("Essential Prime Implicants: ", resultImplicants));
}
