const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Player = new Schema({
  id: ObjectId,
  name: String,
  avatar: String,
});

module.exports = mongoose.model(
    'Player', Player, 'Players');