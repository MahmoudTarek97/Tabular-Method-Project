function ReadInput() {
    var minterms = document.getElementById("Minterms").value;
    var dontCares = document.getElementById("DontCares").value;
    //minterms is a String
    //it stores input by this way: "2,4,5,6,9"
    //later, we must put this string in Array and handle the minterms on our own
    alert("You Entered minterms: " + minterms + " And don't cares: " + dontCares);
    console.log("minterms : ", minterms, "don't cares : ", dontCares);
}
