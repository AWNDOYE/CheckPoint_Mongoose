const mongoose = require("mongoose");
require('dotenv').config();
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // userUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à la base de données MongoDB réussie"))
  .catch((err) =>console.error("Erreur de connexion à la base de données MongoDB :", err));
  


//   const mongoose = require('mongoose');
// require("dotenv").config();

// // Récupérer l'URI de connexion à MongoDB Atlas à partir des variables d'environnement
// const mongoURI = process.env.MONGO_URI;

// // Connexion à la base de données MongoDB Atlas
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Connecté à MongoDB Atlas');
//         // Placez ici le code supplémentaire à exécuter une fois connecté à la base de données
//     })
//     .catch(err => {
//         console.error('Erreur de connexion à MongoDB Atlas :', err);
//     });