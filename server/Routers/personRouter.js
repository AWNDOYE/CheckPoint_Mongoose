const express = require("express");
const router = express.Router();
const personneController = require("../Controllers/personController");

router.post('/personnes', personneController.createPerson)
router.post("/allpersons", personneController.createAllPersonn);
router.get("/persons", personneController.AllPersons);
router.get("/personFood", personneController.findOnePersonWithFood);
router.get("/personID", personneController.findOnePersonWithID);
router.get("/personIDFood", personneController.findPersonAndAddFood);
router.get("/personUpdated", personneController.updatePerson);
router.get('/personRemoved', personneController.personFindAnRemove)
router.get('/personAllDelete', personneController.deleteAllName)
console.log("routes ok");
module.exports = router;
