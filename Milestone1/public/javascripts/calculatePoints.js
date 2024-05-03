function calculatePointsAndSubmit() {
    
    var typeOfDonation = document.getElementById("typeOfDonation").value;

    if (typeOfDonation === "Doação Têxtil") {
        var state = document.getElementById("typeOfClothing").value;
        var points = 2; // Pontuação fixa para doação têxtil

        // Preencher os campos ocultos do formulário de pontos
        document.getElementById("result").value = points;
        document.getElementById("donationMoney").value = 0; // Definir 0 para a doação de dinheiro

        // Se necessário, preencher os campos adicionais do tipo de doação têxtil
        document.getElementById("typeOfClothing.category").value = state;
    } else if (typeOfDonation === "Dinheiro") {
        var donationMoney = parseInt(document.getElementById("amount").value);
        var points = donationMoney;

        // Preencher os campos ocultos do formulário de pontos
        document.getElementById("result").value = points;
        document.getElementById("quantity").value = 0; // Definir 0 para valores não relevantes
        document.getElementById("typeOfClothing.category").value = ""; // Definir vazio para valores não relevantes
    }

    // Submeter o formulário de pontos
    document.getElementById("dataForm").submit();
}

function calculatePointsAndSubmit() {
    
    var typeOfDonation = document.getElementById("typeOfDonation").value;

    if (typeOfDonation === "Doação Têxtil") {
        var state = document.getElementById("typeOfClothing").value;
        var points = 2; // Pontuação fixa para doação têxtil

        // Preencher os campos ocultos do formulário de pontos
        document.getElementById("result").value = points;
        document.getElementById("donationMoney").value = 0; // Definir 0 para a doação de dinheiro

        // Se necessário, preencher os campos adicionais do tipo de doação têxtil
        document.getElementById("typeOfClothing.category").value = state;
    } else if (typeOfDonation === "Dinheiro") {
        var donationMoney = parseInt(document.getElementById("amount").value);
        var points = donationMoney;

        // Preencher os campos ocultos do formulário de pontos
        document.getElementById("result").value = points;
        document.getElementById("quantity").value = 0; // Definir 0 para valores não relevantes
        document.getElementById("typeOfClothing.category").value = ""; // Definir vazio para valores não relevantes
    }

    // Submeter o formulário de pontos
    document.getElementById("dataForm").submit();
}