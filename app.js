const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
// Initialize the app
const app = express();

// Middlewares
// Form Data Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Json Body Middleware
app.use(bodyParser.json());

// Cors Middleware
app.use(cors());

// seting up the static directory
app.use(express.static(path.join(__dirname, "public")));

//Use the passport Middleware
app.use(passport.initialize());

// Bring in the passport Strategy
require("./config/passport")(passport);

//Bring in the Database Config and connect with the Database
const mongoDB = require("./config/keys").mongoURI;
mongoose
  .connect(mongoDB, { useNewUrlParser: true })
  .then(() => {
    console.log(`Database connected successfully`);
  })
  .catch((err) => {
    console.log(`Unable to connect with the database ${err}`);
  });

//Bring the Users route (the first of two different ways)
const users = require("./routes/api/users");
app.use("/api/users", users);

//the second of two different ways
// FACTORY LIST
const factoryList = require("./routes/api/factoryList");
app.get("/api/factories/getAllFactory", factoryList.getAllFactory);
app.put("/api/factories/updateFactory", factoryList.updateFactory);
app.delete("/api/factories/deleteFactory", factoryList.deleteFactory);
app.get("/api/factories/getFactoryColumn", factoryList.getFactoryColumn);
app.post("/api/factories/createFactoryColumn", factoryList.createFactoryColumn);
app.delete("/api/factories/deleteFactoryColumn", factoryList.deleteFactoryColumn);

// FACTORY NAME
const factoryName = require("./routes/api/factoryName");
app.get("/api/factories/getAllFactoryName", factoryName.getAllFactoryName);
app.put("/api/factories/updateFactoryName", factoryName.updateFactoryName);
app.delete("/api/factories/deleteFactoryName", factoryName.deleteFactoryName);
app.get("/api/factories/getFactoryNameColumn", factoryName.getFactoryNameColumn);
app.post("/api/factories/createFactoryNameColumn", factoryName.createFactoryNameColumn);
app.delete("/api/factories/deleteFactoryNameColumn", factoryName.deleteFactoryNameColumn);

//if any other request from api comes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
