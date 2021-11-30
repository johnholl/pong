const mongoose = require('mongoose');

const MatchModel = require('../models/match');

function createMatch(req, res) {
    const data = req.body;
    console.log("DATA", data);
    var newMatch = new MatchModel({
        date:data.date,
        p1_id:data.p1_id, 
        p2_id:data.p2_id, 
        p1games:data.p1games, 
        p2games:data.p2games,
        winner:data.winner});
    newMatch.save(function(err, data) {
        if(err) {
            console.log(error);
        }
        else {
            console.log("SAVED");
            res.send({message: "Data inserted"});
        }
    });
}

function getMatches(req, res) {
    MatchModel.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  
}

module.exports = {createMatch, getMatches}