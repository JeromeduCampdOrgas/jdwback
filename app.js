require("dotenv").config();
const { connectDb } = require("./src/services/mongoose");
const userRoutes = require("./src/routes/user.routes");
const formationRoutes = require("./src/routes/formation.routes");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

connectDb().catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(formationRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} `);
});
