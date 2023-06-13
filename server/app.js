const express = require("express");

const routes = require("./routes/routes");

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/", routes);

// app.get("/agents", async (req, res, next) => {
//   const agents = await Agent.findAll();
//   return res.json(agents);
// });

module.exports = app;
