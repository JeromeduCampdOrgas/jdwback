const mongoose = require("mongoose");

const formationsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  organisme: String,
  projets: [
    {
      name: String,
      description: String,
      image: String,
    },
  ],
  technologies: [{ name: String }],

  certification: String,
});

const Formation = mongoose.model("Formation", formationsSchema);

module.exports = Formation;
