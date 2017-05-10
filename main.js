// this is the main file for the program
// it controls the fllow of functions calling

var minTerms;
var dontCares;
var numberOfInputs;
var groupLists = [[]];
var PrimeImplicants = [];

function main() {

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

    //test
    var test = "PrimeImplicants : ";
    for (var i = 0; i < PrimeImplicants.length; i++) {
        var bitsCovered = PrimeImplicants[i].bitsCovered;
        var baseValue = PrimeImplicants[i].baseValue;
        if (i != 0)
            test = test.concat(" , ");
        test = test.concat(baseValue + "(" + bitsCovered + ")");
    }
    console.log(test);
    alert(test);

}
