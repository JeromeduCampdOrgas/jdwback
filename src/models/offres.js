const mongoose = require("mongoose");

const offresSchema = new mongoose.Schema({
  name: String,
  id: Number,
  comment: String,
  detail: String,
  picture: String,
  prestation: [
    {
      name: String,
      presta: [
        {
          name: String,
          check: Boolean,
        },
      ],
    },
  ],
  tarif: Number,
});

const Offre = mongoose.model("Offre", offresSchema);

module.exports = Offre;
