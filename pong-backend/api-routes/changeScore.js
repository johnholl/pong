function sendEventsToAll(newScore) {
  clients.forEach(client => client.response.write(`data: ${JSON.stringify(newScore)}\n\n`))
}

async function changeScore(request, response) {
  console.log("CHANGE SCORE HIT");
  const data = request.body;
  if(data.op == "reset"){
    scores.p1 = 0;
    scores.p2 = 0;
  }
  else if(data.player == "p1" && data.op == "add"){
    scores.p1 += 1;
  }
  else if(data.player == "p2" && data.op == "add"){
    scores.p2 += 1;
  }
  else if(data.player == "p1" && data.op == "sub"){
    scores.p1 -= 1;
  }
  else if(data.player == "p2" && data.op == "sub"){
    scores.p2 -= 1;
  }

  response.json(scores)
  return sendEventsToAll(scores);
}

module.exports = changeScore;