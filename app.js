require("dotenv").config();
const { connectDb } = require("./src/services/mongoose");
const userRoutes = require("./src/routes/user.routes");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

connectDb().catch((err) => console.log(err));

app.use(express.json());
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} `);
});
