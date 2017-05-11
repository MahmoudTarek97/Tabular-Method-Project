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
    var PI = "PrimeImplicants : ";
    for (var i = 0; i < primeImplicants.length; i++) {
        var bitsCovered = primeImplicants[i].bitsCovered;
        var baseValue = primeImplicants[i].baseValue;
        if (i != 0)
            PI = PI.concat(" , ");
        PI = PI.concat(baseValue + "(" + bitsCovered + ")");
    }
    console.log(PI);

    //Part 2
    eliminationProcess();
    console.log(resultImplicants)
}
