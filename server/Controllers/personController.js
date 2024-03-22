const Person = require("../Models/personModels");

// createPerson et createAllPersonn sont les requêtes concues pour alimenter la BDD et tester via la méthode POST
const createPerson = (req, res) => {
  const newPerson = new Person({
    name: "Awa NDOYE",
    age: 25,
    favoriteFoods: ["Pizza", "Sushi", "Glace", "Tortillas", "Yassa Poulet"],
  });

  newPerson
    .save()
    .then((savedPerson) => {
      console.log("Nouvelle personne enregistrée avec succès :", savedPerson);
      return res.status(200).send(savedPerson);
    })
    .catch((err) => {
      console.error("Erreur lors de l'enregistrement de la personne :", err);
    });
};
//******************************************************************************************************************************* */
const createAllPersonn = (req, res) => {
  console.log("test");
  async function arrayOfPeople() {
    try {
      const persons = await Person.create([
        {
          name: "mamy fall",
          age: 25,
          favoriteFoods: ["Pizza", "Croissants", "Caldou"],
        },
        {
          name: "Amina dieng",
          age: 20,
          favoriteFoods: ["Burger", "Ice Cream", "Tchiou Tiir"],
        },
        {
          name: "Mami NGANE",
          age: 35,
          favoriteFoods: ["Steak", "Salad", "Saumon", "Jambon", "Riz Blanc"],
        },
        {
          name: "Fina THIAM",
          age: 40,
          favoriteFoods: ["Pizza", "Sushi", "Caldou", "Deukhine", "Pâtes"],
        },
        {
          name: "Oumou DIENG",
          age: 18,
          favoriteFoods: ["Burger", "Ice Cream", "Tchiou Tiir", "crêpes"],
        },
        {
          name: "Bintou DIOP",
          age: 6,
          favoriteFoods: ["Steak", "Salad", "Saumon", "Jambon", "Riz Blanc"],
        },
        {
          name: "Astou DIANGE",
          age: 46,
          favoriteFoods: ["Jambon", "Riz Blanc"],
        },
      ]);
      console.log("Personnes créées avec succès ");
      res
        .status(200)
        .send({ message: "Personnes créées avec succès", persons });
    } catch (err) {
      console.error("Erreur lors de la création des personnes :", err);
      res.status(500).send("Erreur lors de la création des personnes");
    }
  }
  arrayOfPeople();
};
//******************************************************************************************************************************* */

//******************************************************************************************************************************* */
// Utiliser model.find() pour effectuer une recherche dans votre base de données
// Trouver toutes les personnes ayant un nom donné, en utilisant Model.find() -> [Person]
const AllPersons = async (req, res) => {
  try {
    const persons = await Person.find();

    res.status(200).json({ message: "Users found", persons });
  } catch (error) {
    console.log(error);
  }
};
// {
//   "message": "Users found",
//   "persons": [
//       {
//           "_id": "65fc4f6b6f18f55decd095b4",
//           "name": "Solange COLY",
//           "age": 25,
//           "favoriteFoods": [
//               "Pizza",
//               "Croissants",
//               "Caldou"
//           ],
//           "__v": 0
//       },
//       {
//           "_id": "65fc4f6b6f18f55decd095b7",
//           "name": "Fina THIAM",
//           "age": 40,
//           "favoriteFoods": [
//               "Pizza",
//               "Sushi",
//               "Caldou",
//               "Deukhine",
//               "Pâtes"
//           ],
//           "__v": 0
//       },
//     }
//******************************************************************************************************************************* */



//******************************************************************************************************************************* */
// Utilisez model.findOne() pour renvoyer un seul document correspondant de votre base de données
// Trouvez une seule personne qui a un certain aliment dans ses favoris, en utilisant Model.findOne() -> Person. Utilisez l'argument de la fonction food comme clé de recherche.
const findOnePersonWithFood = (req, res) => {
  async function searchPerson(food) {
    try {
      const onePersonFood = await Person.findOne({ favoriteFoods: food });
      if (onePersonFood) {
        console.log(
          " Une personne a été trouvée avec un aliment correspondant",
          onePersonFood
        );
      } else {
        console.log(" Aucune correspondance");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Erreur lors de la recherche", error);
    }
  }
  searchPerson("Steak");
};
// Connexion à la base de données MongoDB réussie
//  Une personne a été trouvée avec un aliment correspondant {
//   _id: new ObjectId('65fc4f6b6f18f55decd095b9'),
//   name: 'Bintou DIOP',
//   age: 6,
//   favoriteFoods: [ 'Steak', 'Salad', 'Saumon', 'Jambon', 'Riz Blanc' ],
//   __v: 0
// }
//******************************************************************************************************************************* */



//******************************************************************************************************************************* */
// Utiliser model.findById() pour rechercher votre base de données par _id
// Trouver la (seule !!) personne ayant un _id donné, en utilisant Model.findById() -> Person. Utilisez l'argument de la fonction personId comme clé de recherche.
const findOnePersonWithID = (req, res) => {
  async function searchPersonID(oneID) {
    try {
      const onePersonID = await Person.findById(oneID);
      if (onePersonID) {
        console.log(
          " Une personne correspondant à l'ID a été trouvée",
          onePersonID
        );
        res.status(200).send({
          message: " Une personne correspondant à l'ID a été trouvé",
          onePersonID,
        });
      } else {
        console.log(" Aucune correspondance");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Erreur lors de la recherche", error);
    }
  }
  searchPersonID("65fc4f6b6f18f55decd095b5");
};
// Server is running on 5000
// Connexion à la base de données MongoDB réussie
// Une personne correspondant à l'ID a été trouvée {
//  _id: new ObjectId('65fc4f6b6f18f55decd095b5'),
//  name: 'Fama DIENG',
//  age: 20,
//  favoriteFoods: [ 'Burger', 'Ice Cream', 'Tchiou Tiir' ],
//  __v: 0
// }
//******************************************************************************************************************************* */



//******************************************************************************************************************************* */
// Effectuer des mises à jour classiques en exécutant Find, Edit, puis Save
// Trouver une personne par _id (utiliser l'une des méthodes ci-dessus) avec le paramètre personId comme clé de recherche. Ajoutez "hamburger" à la liste des aliments préférés de la personne (vous pouvez utiliser Array.push()). Ensuite, dans le callback de recherche, sauvegardez () la personne mise à jour.
const findPersonAndAddFood = (req, res) => {
  async function searchPerson(monID, myFood) {
    try {
      const personIDFood = await Person.findById(monID);
      if (personIDFood) {
        console.log(
          " Une personne correspondant à l'ID a été trouvée",
          personIDFood
        );
        res.status(200).send({
          message: " Une personne correspondant à l'ID a été trouvé",
          personIDFood,
        });
        personIDFood.favoriteFoods.push(myFood);
        personIDFood.save();
      } else {
        console.log(" Aucune correspondance");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Erreur lors de la recherche", error);
    }
  }
  searchPerson("65fc559c60aad44c5e7f6ef9", "Yassa Poulet");
};
// Connexion à la base de données MongoDB réussie
//  Une personne correspondant à l'ID a été trouvée {
//   _id: new ObjectId('65fc559c60aad44c5e7f6ef9'),
//   name: 'astou fall',
//   age: 25,
//   favoriteFoods: [ 'Pizza', 'Croissants', 'Caldou' ],
//   __v: 0
// }

// _id
// 65fc559c60aad44c5e7f6ef9
// name
// "astou fall"
// age
// 25

// favoriteFoods
// Array (4)
// 0
// "Pizza"
// 1
// "Croissants"
// 2
// "Caldou"
// 3
// "Yassa Poulet"
// __v
// 1
//******************************************************************************************************************************* */




//******************************************************************************************************************************* */
// Effectuer de nouvelles mises à jour sur un document à l'aide de model.findOneAndUpdate()
// Trouver une personne par son nom et fixer son âge à 20 ans. Utilisez le paramètre de fonction personName comme clé de recherche.
// Remarque : vous devez renvoyer le document mis à jour. Pour ce faire, vous devez passer les options document { new : true } comme troisième argument à findOneAndUpdate(). Par défaut, ces méthodes renvoient l'objet non modifié.
const updatePerson = (req, res) => {
  async function searchPerson(namePerson) {
    try {
      const personUpdated = await Person.findOneAndUpdate(
        { name: namePerson },
        { $set: { age: 20 } },
        { new: true }
      );
      if (personUpdated) {
        console.log(
          " Une personne correspondant à l'ID a été trouvée",
          personUpdated
        );
        res.status(200).send({
          message: " Une personne correspondant à l'ID a été trouvé",
          personUpdated,
        });
      } else {
        console.log(" Aucune correspondance");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Erreur lors de la recherche", error);
    }
  }
  searchPerson("Astou DIANGE");
};
// _id
// 65fc4f6b6f18f55decd095ba
// name
// "Astou DIANGE"
// age
// 46

// favoriteFoods
// Array (2)
// __v
//0

// {
//   "message": " Une personne correspondant à l'ID a été trouvé",
//   "personUpdated": {
//       "_id": "65fc4f6b6f18f55decd095ba",
//       "name": "Astou DIANGE",
//       "age": 20,
//       "favoriteFoods": [
//           "Jambon",
//           "Riz Blanc"
//       ],
//       "__v": 0
//   }
// }

//******************************************************************************************************************************* */



//******************************************************************************************************************************* */
// Supprimer un document en utilisant model.findByIdAndRemove
// Supprimer une personne par son _id. Vous devez utiliser l'une des méthodes findByIdAndRemove() ou findOneAndRemove(). Ces méthodes sont similaires aux méthodes de mise à jour précédentes. Elles transmettent le document supprimé à la base de données. Comme d'habitude, utilisez l'argument de la fonction personId comme clé de recherche.
const personFindAnRemove = (req, res) => {
  async function searchPerson(monID) {
    try {
      const personRemoved = await Person.findByIdAndDelete(monID);
      if (personRemoved) {
        console.log(
          " La personne correspondante a été supprimée",
          personRemoved
        );
        res.status(200).send({
          message: " La personne correspondante a été supprimée ",
          personRemoved,
        });
      } else {
        console.log(" Aucune correspondance");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Erreur lors de la recherche", error);
    }
  }
  searchPerson("65fc55f9c38f7ff2fc03ad38");
};
// Server is running on 5000
// Connexion à la base de données MongoDB réussie
//  La personne correspondante a été supprimée {
//   _id: new ObjectId('65fc55f9c38f7ff2fc03ad38'),
//   name: 'Amina dieng',
//   age: 20,
//   favoriteFoods: [ 'Burger', 'Ice Cream', 'Tchiou Tiir' ],
//   __v: 0
// }
//******************************************************************************************************************************* */


//******************************************************************************************************************************* */
// MongoDB et Mongoose - Supprimer de nombreux documents avec model.remove()
// Supprimez toutes les personnes dont le nom est "Mary", en utilisant model.remove(). Passez-la à un document de requête avec le champ name défini, et bien sûr, faites un callback.
const deleteAllName = (req, res)=>{
  async function deleteByName (namePerson) {
    try {
      const personDelete = await Person.deleteMany({name: namePerson})
      if (personDelete.deletedCount > 0) {
        console.log(
          " La personne correspondante a été supprimée",
          personDelete
        );
        res.status(200).send({
          message: " La personne correspondante a été supprimée ",
          personDelete,
        });
      }else{
        console.log(" Aucune correspondance");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Erreur lors de la recherche", error);
    }
  }
  deleteByName("Amina dieng")
}
// {
//   "message": " La personne correspondante a été supprimée ",
//   "personDelete": {
//       "acknowledged": true,
//       "deletedCount": 2
//   }
// }
// Server is running on 5000
// Connexion à la base de données MongoDB réussie
//  La personne correspondante a été supprimée { acknowledged: true, deletedCount: 2 }
//******************************************************************************************************************************* */

module.exports = {
  createPerson,
  createAllPersonn,
  AllPersons,
  findOnePersonWithFood,
  findOnePersonWithID,
  findPersonAndAddFood,
  updatePerson,
  personFindAnRemove,
  deleteAllName
};

// CRUD FOR MERN
