const mongoose = require('mongoose');

const PlayerModel = require('../models/player');

function createPlayer(req, res) {
    const data = req.body;
    var newPlayer = new PlayerModel({name:data.name, avatar:data.avatar});
    newPlayer.save(function(err, data) {
        if(err) {
            console.log(error);
        }
        else {
            console.log("SAVED");
            res.send({message: "Data inserted"});
        }
    });
}

async function updatePlayer(req, res) {
    const data = req.body;
    console.log("DATA", data);
    PlayerModel.findOneAndUpdate({_id: data._id}, {name: data.name, avatar: data.avatar})
    .then(()=>{
        console.log("UPDATED");
        res.send({message: "UPDATED"});
    }
    ).catch((err)=>{
        console.log("ERROR", err);
    });
}

async function deletePlayer(req, res) {
    const data = req.body;
    console.log("DATA", data);
    PlayerModel.findOneAndRemove({_id: data._id})
    .then(()=>{
        console.log("REMOVED");
        res.send({message: "REMOVED"});
    }
    ).catch((err)=>{
        console.log("ERROR", err);
    });
}

function getPlayers(req, res) {
    PlayerModel.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  
}

module.exports = {createPlayer, updatePlayer, deletePlayer, getPlayers}