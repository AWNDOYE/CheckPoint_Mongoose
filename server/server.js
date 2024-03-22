const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = 5000;

const personneRoute = require("./Routers/personRouter.js");

require("dotenv").config({ path: "./Config/.env" }); // Pour charger les variables d'environnement depuis .env
require("./Config/db.js");

// Middleware pour parser les requêtes JSON
app.use(bodyparser.json());
// Routes
app.use("/api",personneRoute);

app.get("/personn",personneRoute)
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
