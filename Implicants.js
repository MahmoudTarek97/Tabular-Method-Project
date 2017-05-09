var groupList = [];

//constructor function for implicants
//baseValue: number of the minterm
//bitsCovered: array of values of hamming distances of minterms covered by the implicant
//isChecked: boolean value used to determine if an implicant is already covered, initialized with false
//degree: number of bits in the base value (group number)
function implicant(baseValue, bitsCovered, isChecked, isDontCare) {
	this.baseValue = baseValue;
	this.bitsCovered = bitsCovered;
	this.isChecked = isChecked;
	this.isDontCare = isDontCare;
	this.degree = countBits(baseValue);
}

function group(degree, members) {
	this.degree = degree;
	this.members = members;
}

//generates initial implicants from minterms and dont cares
function generateImplicants() {
	var implicants = [];
	for (var i in minTerms) {
		implicants.push(new implicant(i, [], false, false));
	}

	for (var j in dontCares) {
		implicants.push(new implicant(j, [], false, true));
	}
	return implicants;
}

function initializeGroups() {
	//var groups = [];
	implicants = generateImplicants();
	
	for (var implicant in implicants) {
		console.log(implicant);
		groupList[implicant.degree].members.push(implicant);
	}
}

function initializeGroupList() {
	for (var i=0; i<=numberOfInputs; i++) {
		groupList.push(new group(i,[]));
	}
}


//returns number of bits the binary representation of a number
function countBits(x) {
	var c = 0;
	while (x>0) {
    	if (x%2 == 1) {
			c++;
        }
		x = Math.floor(x/2);
	}
	return c;
}
