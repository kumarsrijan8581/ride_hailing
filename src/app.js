const express = require("express");

const userRoutes = require("./routes/user.routes");
const driverRoutes = require("./routes/driver.routes");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
  });
});

app.use("/users", userRoutes);
app.use("/drivers", driverRoutes);

module.exports = app;