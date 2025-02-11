const express = require("express");
const bodyParser = require("body-parser");
const contactsRoutes = require("./routes/contactsRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/contacts", contactsRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Contact Management API");
});

module.exports = app;
