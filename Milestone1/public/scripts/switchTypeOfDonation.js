// Event listener para alterações no tipo de doação
document.getElementById("typeOfDonation").addEventListener("change", function () {
    showRelevantBlock();

    // Exibe o bloco de estado do tipo de roupa apenas se o tipo de doação for "Doação Têxtil"
    var typeOfClothingStateDiv = document.getElementById("typeOfClothingStateDiv");
    if (this.value === "Doação Têxtil") {
        typeOfClothingStateDiv.style.display = "block";
    } else {
        typeOfClothingStateDiv.style.display = "none";
    }
});
