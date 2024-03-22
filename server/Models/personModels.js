const mongoose = require('mongoose');

// Définition du schéma de la personne
const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Le nom est obligatoire
    },
    age: {
        type: Number
    },
    favoriteFoods: {
        type: [String] // Tableau de chaînes
    }
});
console.log("model  ok");
// Création du modèle Person à partir du schéma
const Person = mongoose.model('Person', PersonSchema);

// Exporter le modèle Person
module.exports = Person;