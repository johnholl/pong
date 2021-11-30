import React, { useState, useEffect } from 'react';
import {Button, Row, Col, Typography, Modal } from 'antd';
const { Title } = Typography;

const address = 'http://192.168.1.145:3001'

const p1SubOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({player: "p1", op: "sub"})
};

const p1AddOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({player: "p1", op: "add"})
};

const p2SubOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({player: "p2", op: "sub"})
};

const p2AddOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({player: "p2", op: "add"})
};

function Match(props) {
  const [ scores, setScores ] = useState({p1: 0, p2: 0});
  const [gamesWon, setGamesWon] = useState({p1: 0, p2: 0});
  const [winner, setWinner] = useState("");
  const [isOver, setIsOver] = useState(false);
  const [ listening, setListening ] = useState(false);

  const matchDetails = props.location.state;

  useEffect( () => {
    if (!listening) {
      const events = new EventSource(address + '/eventsHandler');

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);

        setScores({p1: parsedData.p1, p2: parsedData.p2});
      };

      setListening(true);
    }
  }, [listening, scores]);


  useEffect( () => {
    if (scores.p1 >= 11 && (scores.p1 - scores.p2 >= 2)) {
      const p1GamesWon = gamesWon.p1 + 1;
      setGamesWon({p1: p1GamesWon, p2: gamesWon.p2})
      fetch(address + '/changeScore', {method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({player: "none", op: "reset"})})
    }
    else if (scores.p2 >= 11 && (scores.p2 - scores.p1 > 2)) {
      const p2GamesWon = gamesWon.p2 + 1;
      setGamesWon({p1: gamesWon.p1, p2: p2GamesWon})
      fetch(address + '/changeScore', {method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({player: "none", op: "reset"})})
    }
  }, [scores]);

  useEffect( () => {
    if (gamesWon.p1 == matchDetails.mt) {
      setWinner(matchDetails.p1.name);
      setIsOver(true);
      fetch(address + '/savematch', {method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: Date.now(),
        p1_id: matchDetails.p1.id,
        p2_id: matchDetails.p2.id,
        winner: "p1",
        p1games: gamesWon.p1,
        p2games: gamesWon.p2})})
    }
    else if (gamesWon.p2 == matchDetails.mt) {
      setWinner(matchDetails.p2.name);
      setIsOver(true);
      fetch(address + '/savematch', {method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: Date.now(),
        p1_id: matchDetails.p1.id,
        p2_id: matchDetails.p2.id,
        winner: "p2",
        p1games: gamesWon.p1,
        p2games: gamesWon.p2})})
    }
  }, [gamesWon]);

  return (
    <div>
      <Modal closable={false} title={winner + " won!"} visible={isOver} footer={null}>
        <Row justify="space-around">
          <Button onClick={()=>{
            setIsOver(false);
            setWinner("");
            setGamesWon({p1:0,p2:0});
             props.history.push({pathname:"/match", state: matchDetails})}}
             type="primary">
            Play Again
          </Button>
          <Button onClick={()=>{props.history.push("setup")}}>Back to Setup Screen</Button>
          </Row>
      </Modal>
    <Row justify="space-around" align="middle" style={{paddingTop:30}}>
      <Col span={8}  style={{backgroundColor:"#FFE5B4", padding:10, borderRadius:10}}>
        <Row justify="center"><Title level={1}>{matchDetails.p1.name}</Title></Row>
        <Row justify="center"><img src={address + "/" + matchDetails.p1.avatar} alt={"no avatar"} style={{height:200, width:200, borderRadius:100}} /></Row>
        <Row justify="center" style={{fontSize:"6em", fontWeight:900}}>{scores.p1}</Row>
        <Row justify="space-around"><Button onClick={()=>{fetch(address + '/changeScore', p1SubOptions)}}>-</Button><Button onClick={()=>{fetch(address + '/changeScore', p1AddOptions)}}>+</Button></Row>
        <Row justify="center" style={{paddingTop:50}}><Title level={5}>{"games won: " + gamesWon.p1}</Title></Row>
      </Col>
      <Col span={8}  style={{backgroundColor:"#CCCCFF", padding:10, borderRadius:10}}>
        <Row justify="center"><Title level={1}>{matchDetails.p2.name}</Title></Row>
        <Row justify="center"><img src={address + "/" + matchDetails.p2.avatar} alt={"no avatar"} style={{height:200, width:200, borderRadius:100}} /></Row>
        <Row justify="center" style={{fontSize:"6em", fontWeight:900}}>{scores.p2}</Row>
        <Row justify="space-around"><Button onClick={()=>{fetch(address + '/changeScore', p2SubOptions)}}>-</Button><Button onClick={()=>{fetch(address + '/changeScore', p2AddOptions)}}>+</Button></Row>
        <Row justify="center" style={{paddingTop:50}}><Title level={5}>{"games won: " + gamesWon.p2}</Title></Row>
      </Col>
    </Row>
    </div>
  );
}

export default Match;