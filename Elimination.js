/* now we have Array PrimeImplicants = [ object implicant , object implicant , .. ]
 * PrimeImplicants[0] --> object implicant = {baseValue: 1, bitsCovered: [2,4], isChecked: false, 
 *                                            isDontCare: false, degree: 1, mintermsCoverd: [1,3,5,7]}
 * in the end of this file we must have an Array of RemaningPI like this :
 * Array RemaningPI = [ object implicant , object implicant , .. ]
 * RemaningPI[0] = {baseValue: 1, bitsCovered: [2,4], isChecked: false, isDontCare: false, degree: 0, mintermsCoverd: [1,3]}
 */

function eliminationProcess() {
	while (checkEssentialImplicants());
}

function checkEssentialImplicants() {
	//sparse array to store how many implicants
	//each minterm is covered by
	//the value for minterms not included will be undefined
	var termsCoverCount = [];

	var essentialImplicantFound = false;

	//iterate on all implicant and increment the count
	//for each min term they cover
	for (var i=0; i<primeImplicants.length; i++) {
		var primeImplicant = primeImplicants[i];

		for (var j=0; j<primeImplicant.mintermsCovered.length; j++) {
			var term = primeImplicant.mintermsCovered[j]

			//if first time to cover a term, initialize its place with 1
			if (termsCoverCount[term] == undefined) {
				termsCoverCount[term] = 1;
			} else {
				termsCoverCount[term]++;
			}
		}
	}

	for (var i=0; i<minTerms.length; i++) {

		//if a term is only covered by one implicant,
		//find the implicant and add it to resultImplicants
		if (termsCoverCount[minTerms[i]] == 1) {
			for (var j=0; j<primeImplicants.length; j++) {

				if (primeImplicants[j].mintermsCovered.includes(minTerms[i])) {
					resultImplicants.push(primeImplicants[j]);
					primeImplicants.splice(j,1);
					essentialImplicantFound = true;
					break;
				}

			}
		}
	}

	return essentialImplicantFound;
}