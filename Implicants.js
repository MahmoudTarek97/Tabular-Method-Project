

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
