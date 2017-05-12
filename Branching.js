//At this point, we have resultImplicants array which has implicants that are in the solution
//and we have remainingImplicants array which has implicants remaining from the elimination process

//we can generate all possible combinations of the remaining implicants, filter the ones that cover
//all uncovered implicants, then choose the ones with least cost i.e number of implicants

//by the end of the branching process, we should have an array minimalSolutions which contains arrays
//of the minimal implicants needed to cover remaining minterms

var minimalSolutions;

function branchingProcess() {

	implicantsPowerSet = powerSet(remainingImplicants);
	var validSolutions = filterPowerSet(powerSet);
	minimalSolutions = filterPossibleSolutions(validSolutions);
}


//generates a power set for a given array
//returns all an array of all possible combinations of implicants
function powerSet(array) {
	var powerSet = [];

	for (var i=0; i < Math.pow(2, array.length); i++) {
		var set = [];

		for (var j = 0; j < len; j++) {
			if (i & (1 << j)) {
			set.push(array[j]);
			}
		}
		powerSet.push(set);
	}
	return powerSet;
}

//iterates over the power set and removes any solution that does not cover all uncoveredMinTerms
//returns an array of valid solution
function filterPowerSet(powerSet) {

}

//iterates over possible solutions, determines the length of the least solution possible
//then removes all solutions that are bigger and returns an array of the minimal solutions
function filterPossibleSolutions() {

}