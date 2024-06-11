const PointCustomization = require("../models/point");

async function calculatePoints(donation) {
  try {
    if (!donation) {
      throw new Error("Doação não encontrada");
    }

    let points = 0;
    const pointCustomization = await PointCustomization.findOne().exec();

    // Verificar o tipo de doação
    if (donation.typeOfDonation === "Doação Têxtil") {
      // Para doações têxteis, adicionar pontos com base no estado e quantidade
      donation.typeOfClothing.forEach((item) => {
        if (item.state === "Novo com etiquetas") {
          points += pointCustomization.newWithTag + (pointCustomization.quantity * item.quantity);
        } else if (item.state === "Novo sem etiquetas") {
          points += pointCustomization.newWithoutTag + (pointCustomization.quantity * item.quantity);
        } else if (item.state === "Muito bom") {
          points += pointCustomization.veryGood + (pointCustomization.quantity * item.quantity);
        } else if (item.state === "Bom") {
          points += pointCustomization.good + (pointCustomization.quantity * item.quantity);
        } else if (item.state === "Satisfatório") {
          points += pointCustomization.satisfactory + (pointCustomization.quantity * item.quantity);
        }
      });
    } else if (donation.typeOfDonation === "Dinheiro") {
      // Para doações em dinheiro, adicionar os pontos correspondentes à quantidade doada
      points += pointCustomization.donationMoney * donation.amount;
    }

    return points;
  } catch (error) {
    throw new Error("Erro ao calcular os pontos: " + error.message);
  }
}

module.exports = { calculatePoints };
