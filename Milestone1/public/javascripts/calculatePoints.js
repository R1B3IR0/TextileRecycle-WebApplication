function calculatePoints() {
    var typeOfDonation = document.getElementById("typeOfDonation").value;
    var amount = document.getElementById("amount").value; // Seletor para o campo de quantidade
    var state = document.getElementById("state").value; // Seletor para o campo de estado da roupa
    var quantity = document.getElementById("quantity").value; // Seletor para o campo de quantidade de roupa

    // Aqui você pode enviar uma solicitação AJAX para o servidor para calcular os pontos com base nos valores fornecidos
    // Exemplo de como enviar uma solicitação AJAX usando XMLHttpRequest:
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/calculate-points", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText).result;
            document.getElementById("result").value = result;
        }
    };
    xhr.send(JSON.stringify({ typeOfDonation: typeOfDonation, amount: amount, state: state, quantity: quantity }));
}

// Rota para calcular os pontos
app.post("/calculate-points", function (req, res) {
    // Recupera os dados relevantes do corpo da solicitação
    var typeOfDonation = req.body.typeOfDonation;
    var amount = req.body.amount;
    var state = req.body.state;
    var quantity = req.body.quantity;

    // Aqui você pode realizar o cálculo dos pontos com base nos dados fornecidos
    // Vou fornecer um exemplo simples de cálculo de pontos
    var points = 0;

    // Lógica de cálculo de pontos com base no tipo de doação, quantidade, estado, etc.
    if (typeOfDonation === "Doação Têxtil") {
        // Exemplo: Cada peça de roupa doada pode adicionar 1 ponto
        points = quantity;
    } else if (typeOfDonation === "Dinheiro") {
        // Exemplo: Cada 1€ doado pode adicionar 5 pontos
        points = amount * 5;
    }

    // Envie os pontos calculados de volta para o cliente
    res.json({ points: points });
});