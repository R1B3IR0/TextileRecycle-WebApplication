const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
    donator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donator",
    },
    entity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entity",
    },
    donationDate: {
        type: Date,
        required: true,
    },
    typeOfDonation: {
        type: String,
        enum: ["Doação Têxtil", "Dinheiro"],
        required: true,
    },
    typeOfClothing: [
        {
            category: {
                type: String,
                enum: [
                    "Fatos e blazers",
                    "Calças",
                    "Meias e Roupa Interior",
                    "Tops e t-shirts",
                    "Camisolas e sweaters",
                    "Casacos",
                    "Pijamas",
                    "Outros",
                ],
                required: function () {
                    return this.typeOfDonation === "Doação Têxtil";
                },
            },
            quantity: {
                type: Number,
                required: function () {
                    return this.typeOfDonation === "Doação Têxtil";
                },
            },
            state: {
                type: String,
                enum: ["Novo com etiquetas", "Novo sem etiquetas", "Muito bom", "Bom", "Satisfatório"],
                required: function () {
                    return this.typeOfDonation === "Doação Têxtil";
                },
            },
        }
    ],
    amount: {
        type: Number,
        required: function () {
            return this.typeOfDonation === "Dinheiro";
        },
    },
    warehouseName: { // Novo campo para armazenar o nome do armazém
        type: String,
        required: function () {
            return this.typeOfDonation === "Doação Têxtil";
        },
    },
    status: {
        type: String,
        enum: ["Pendente", "Aprovada", "Rejeitada"],
        default: "Aprovada",
    },
    imageProof: {
        type: String,
        validate: {
            validator: function (v) {
                if (this.typeOfDonation === "Doação Têxtil") {
                    return v != null && v !== "";
                }
                return true;
            },
            message: "Image proof is required for textile donations."
        }
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Donation", DonationSchema);