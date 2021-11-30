const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Match = new Schema({
  date: Date,
  p1games: Number,
  p2games: Number,
  p1_id: {type: Schema.Types.ObjectId, ref: 'Player'},
  p2_id: {type: Schema.Types.ObjectId, ref: 'Player'},
  winner: String,
});

module.exports = mongoose.model(
    'Match', Match, 'Matches');