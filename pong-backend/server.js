const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const network = require('./config/network');
const changeScore = require('./api-routes/changeScore')
const eventsHandler = require('./api-routes/eventsHandler')
const playerFunctions = require('./api-routes/playerCRUD');
const matchFunctions = require('./api-routes/matchCRUD');

mongoose.connect('mongodb://localhost/pong_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() =>{
  const app = express();

clients = [];
scores = {p1: 0, p2: 0};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'))

// ROUTES

// Live subscriptions and score updates
app.get('/eventsHandler', eventsHandler);
app.post('/changeScore', changeScore);

// Player CRUD
app.post('/createplayer', playerFunctions.createPlayer);
app.post('/updateplayer', playerFunctions.updatePlayer);
app.post('/deleteplayer', playerFunctions.deletePlayer);
app.get('/players', playerFunctions.getPlayers);

// Player CRUD
app.post('/savematch', matchFunctions.createMatch);
app.get('/matches', matchFunctions.getMatches);

app.listen(network.PORT, network.IP, () => {
  console.log(`Pong listening at http://192.168.1.145:${network.PORT}`)
})
}).catch((err)=>{
  console.log("Error: ", err);
});
