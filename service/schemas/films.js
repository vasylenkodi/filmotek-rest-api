const { Schema, model } = require("mongoose");

const films = new Schema({
  watched: {
    films: {
      type: [Object],
    },
  },
  queued: {
    films: {
      type: [Object],
    },
  },
});

const Films = model('films', films);

module.exports = Films;