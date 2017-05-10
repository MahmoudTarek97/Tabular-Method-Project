/* now we have Array PrimeImplicants = [ object implicant , object implicant , .. ]
 * PrimeImplicants[0] --> object implicant = {baseValue: 1, bitsCovered: [2,4], isChecked: false, 
 *                                            isDontCare: false, degree: 1, mintermsCoverd: [1,3,5,7]}
 * in the end of this file we must have an Array of RemaningPI like this :
 * Array RemaningPI = [ object implicant , object implicant , .. ]
 * RemaningPI[0] = {baseValue: 1, bitsCovered: [2,4], isChecked: false, isDontCare: false, degree: 0, mintermsCoverd: [1,3]}
 */
