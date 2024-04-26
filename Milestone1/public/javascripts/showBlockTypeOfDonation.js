// Função para exibir apenas o bloco relevante com base no tipo de doação selecionado
function showRelevantBlock() {
    var selectedValue = document.getElementById("typeOfDonation").value;
    var amountDiv = document.getElementById("amountDiv");
    var typeOfClothingDiv = document.getElementById("typeOfClothingDiv");

    // Esconde ambos os blocos
    amountDiv.style.display = "none";
    typeOfClothingDiv.style.display = "none";

    // Exibe apenas o bloco relevante com base no tipo de doação selecionado
    if (selectedValue === "Dinheiro") {
        amountDiv.style.display = "block";
    } else if (selectedValue === "Doação Têxtil") {
        typeOfClothingDiv.style.display = "block";
    }
}

// Chamada para exibir o bloco relevante quando a página é carregada
showRelevantBlock();

// Event listener para alterações no tipo de doação
document.getElementById("typeOfDonation").addEventListener("change", function () {
    // Chama a função para exibir o bloco relevante
    showRelevantBlock();
});
