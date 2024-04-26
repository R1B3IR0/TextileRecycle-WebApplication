window.onload = function() {
    var typeOfDonation = document.getElementById("typeOfDonation");
    var amountDiv = document.getElementById("amountDiv");
    var typeOfClothingDiv = document.getElementById("typeOfClothingDiv");
    var typeOfClothingStateDiv = document.getElementById("typeOfClothingStateDiv");

    if (typeOfDonation.value === "Dinheiro") {
        amountDiv.style.display = "block";
        typeOfClothingDiv.style.display = "none";
        typeOfClothingStateDiv.style.display = "none";
    } else {
        amountDiv.style.display = "none";
        typeOfClothingDiv.style.display = "block";
        typeOfClothingStateDiv.style.display = "block";
    }
};

document.getElementById("typeOfDonation").addEventListener("change", function() {
    var amountDiv = document.getElementById("amountDiv");
    var typeOfClothingDiv = document.getElementById("typeOfClothingDiv");
    var typeOfClothingStateDiv = document.getElementById("typeOfClothingStateDiv");

    if (this.value === "Dinheiro") {
        amountDiv.style.display = "block";
        typeOfClothingDiv.style.display = "none";
        typeOfClothingStateDiv.style.display = "none";
    } else {
        amountDiv.style.display = "none";
        typeOfClothingDiv.style.display = "block";
        typeOfClothingStateDiv.style.display = "block";
    }
});
