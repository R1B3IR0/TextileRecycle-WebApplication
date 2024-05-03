// Captura o botão "Adicionar Mais"
var addButton = document.getElementById('addClothingField');

// Captura o contêiner de campos de roupas
var clothingFieldsContainer = document.getElementById('clothingFields');

// Contador para rastrear o número de campos de roupas adicionados
var clothingFieldIndex = 1;

// Função para adicionar um novo campo de roupas
function addClothingField() {
    // Cria um novo div para o campo de roupas
    var newClothingField = document.createElement('div');
    newClothingField.classList.add('clothing-field');

    // Cria os elementos de seleção e entrada para o novo campo de roupas
    newClothingField.innerHTML = `
        <select name="typeOfClothing[${clothingFieldIndex}].category" class="typeOfClothing">
            <option value="">Escolha o tipo de roupa</option>
            <option value="Fatos e blazers">Fatos e blazers</option>
            <option value="Calças">Calças</option>
            <option value="Meias e Roupa Interior">Meias e Roupa Interior</option>
            <option value="Tops e t-shirts">Tops e t-shirts</option>
            <option value="Camisolas e sweaters">Camisolas e sweaters</option>
            <option value="Casacos">Casacos</option>
            <option value="Pijamas">Pijamas</option>
            <option value="Outros">Outros</option>
        </select>
        <input type="number" name="typeOfClothing[${clothingFieldIndex}].quantity" class="quantity" placeholder="Quantidade">
        <select name="typeOfClothing[${clothingFieldIndex}].state" class="state">
            <option value="">Escolha o estado da roupa</option>
            <option value="Novo com etiquetas">Novo com etiquetas</option>
            <option value="Novo sem etiquetas">Novo sem etiquetas</option>
            <option value="Muito bom">Muito bom</option>
            <option value="Bom">Bom</option>
            <option value="Satisfatório">Satisfatório</option>
        </select>
        <button type="button" class="removeClothingField">Remover</button>
        <p></p>
    `;

    // Adiciona o novo campo de roupas ao contêiner
    clothingFieldsContainer.appendChild(newClothingField);

    // Incrementa o contador de campos de roupas
    clothingFieldIndex++;

    // Adiciona um ouvinte de eventos para o botão "Remover"
    newClothingField.querySelector('.removeClothingField').addEventListener('click', function() {
        // Remove o campo de roupas pai ao qual o botão "Remover" pertence
        newClothingField.remove();
    });
}

// Adiciona um ouvinte de eventos para o botão "Adicionar Mais"
addButton.addEventListener('click', addClothingField);