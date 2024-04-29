var mongoose = require("mongoose");
var Donation = require("../models/donation"); // Importa o modelo Donation

var configurationPointsController = {};

configurationPointsController.renderConfigurePointsPage = (req, res) => {
    res.render('../views/points/configurePoints'); // renderiza a view configurePoints
};

configurationPointsController.configurePoints = async (req, res) => {
    try {
        // Obtenha os dados enviados na solicitação
        const { typeOfDonation, state, points } = req.body;

        // Verifique se o tipo de doação, estado e pontos foram fornecidos
        if (!typeOfDonation || !state || !points) {
            return res.status(400).json({ message: 'Tipo de doação, estado e pontos são necessários.' });
        }

        // Verifique se o tipo de doação é válido
        if (typeOfDonation !== 'Doação Têxtil' && typeOfDonation !== 'Dinheiro') {
            return res.status(400).json({ message: 'Tipo de doação inválido.' });
        }

        // Se for uma doação têxtil, verifique se o estado é válido
        if (typeOfDonation === 'Doação Têxtil') {
            const validStates = ["Novo com etiquetas", "Novo sem etiquetas", "Muito bom", "Bom", "Satisfatório"];
            if (!validStates.includes(state)) {
                return res.status(400).json({ message: 'Estado de doação inválido.' });
            }
        }

        // Atualize as regras de pontuação no banco de dados
        // Por exemplo, você pode armazenar as regras em um modelo separado ou em uma coleção no MongoDB
        // Aqui, estou apenas imprimindo as informações para fins de exemplo
        console.log(`Regras de pontuação atualizadas para tipo de doação "${typeOfDonation}" e estado "${state}": ${points} pontos.`);

        // Agora, renderize a view de sucesso após a atualização
        res.render('configurePointsSuccess', { message: 'Regras de pontuação atualizadas com sucesso.' });

    } catch (error) {
        console.error('Erro ao configurar as regras de pontuação:', error);
        res.render('configurePointsError', { message: 'Erro interno do servidor.' });
    }
};

module.exports = configurationPointsController;
