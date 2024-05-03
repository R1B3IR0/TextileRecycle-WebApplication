 // Função para exibir apenas o bloco relevante com base no tipo de doação selecionado
 function showRelevantBlock() {
    var selectedValue = document.getElementById("typeOfDonation").value;
    var amountDiv = document.getElementById("amountDiv");
    var paypal = document.getElementById("paypal-button-container");
    var typeOfClothingDiv = document.getElementById("typeOfClothingDiv");
    var submitButton = document.getElementById("submitButton");
    //var typeOfClothingStateDiv = document.getElementById("typeOfClothingStateDiv");
    var mapDiv = document.getElementById("map");
    var warehouseNameGroupDiv = document.getElementById("warehouseNameGroup");
    var pointsDiv = document.getElementById("pointsDiv");



    // Esconde ambos os blocos
    amountDiv.style.display = "none";
    typeOfClothingDiv.style.display = "none";
    paypal.style.display = "none";
    submitButton.style.display = "none";
    //typeOfClothingStateDiv.style.display = "none";
    mapDiv.style.display = "none";
    warehouseNameGroupDiv.style.display = "none";
    pointsDiv.style.display = "none";
    // Exibe apenas o bloco relevante com base no tipo de doação selecionado
    if (selectedValue === "Dinheiro") {
        //typeOfClothingStateDiv.style.display = "none";
        amountDiv.style.display = "block";
        paypal.style.display = "block";
        submitButton.style.display = "none";
        warehouseNameGroupDiv.style.display = "none";
        //mapDiv.style.display = "none";

    } else if (selectedValue === "Doação Têxtil") {
        //typeOfClothingStateDiv.style.display = "block";
        typeOfClothingDiv.style.display = "block";
        submitButton.style.display = "block";
        warehouseNameGroupDiv.style.display = "block";
        mapDiv.style.display = "block";
        pointsDiv.style.display = "block";


        // Atualiza o mapa após ele ser exibido
        setTimeout(function() {
            map.invalidateSize();
        }, 100); // Ajuste o tempo conforme necessário
    }
}


// Chamada para exibir o bloco relevante quando a página é carregada
showRelevantBlock();

// Event listener para alterações no tipo de doação
document.getElementById("typeOfDonation").addEventListener("change", function () {
    // Chama a função para exibir o bloco relevante
    showRelevantBlock();
});