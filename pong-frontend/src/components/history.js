import React from 'react';
import {Row, Col, Divider} from 'antd';

export default function History(props) {

    const [matchList, setMatchList] = React.useState(null);
    const [playerList, setPlayerList] = React.useState(null);

    React.useEffect(() => {
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://192.168.1.145:3001/matches', requestOptions)
            .then(response => response.json())
            .then(data => {
              var result = {};
              for (var i = 0; i < data.length; i++) {
                result[data[i]._id] = data[i];
              }
              console.log("MATCHDATA", data);
               setMatchList(data)
              });
              fetch('http://192.168.1.145:3001/players', requestOptions)
              .then(response => response.json())
              .then(data => {
                var result = {};
                for (var i = 0; i < data.length; i++) {
                  result[data[i]._id] = data[i];
                }
                 setPlayerList(result)
                 console.log("PLAYERDATA", result);
                });
        }, [])

    return(
        <div style={{padding:50}}>
            <Row justify="space-around">
                <Col span={4} style={{fontWeight:900}}>Match Date</Col>
                <Col span={4} style={{fontWeight:900}}>Player 1</Col>
                <Col span={4} style={{fontWeight:900}}>Player 2</Col>
                <Col span={4} style={{fontWeight:900}}>Player 1 games won</Col>
                <Col span={4} style={{fontWeight:900}}>Player 2 games won</Col>
                <Col span={4} style={{fontWeight:900}}>Winner</Col>
            </Row>
            <Divider style={{width:"100%"}}/>
            {matchList && playerList &&
            matchList.map(match=>{
                const matchDate = new Date(match.date);
                const matchMonth = (matchDate.getMonth() + 1) > 9 ? matchDate.getMonth() + 1 : "0" + (matchDate.getMonth() + 1) ;
                const matchDay = matchDate.getDate() > 9 ? matchDate.getDate() : "0" + matchDate.getDate();
                const matchYear = matchDate.getFullYear();
                return(
            <>
                <Row justify="space-around">
                    <Col span={4}>{matchMonth + "/" + matchDay + "/" + matchYear}</Col>
                    <Col span={4}>{playerList[match.p1_id].name}</Col>
                    <Col span={4}>{playerList[match.p2_id].name}</Col>
                    <Col span={4}>{match.p1games}</Col>
                    <Col span={4}>{match.p2games}</Col>
                    <Col span={4}>{match.winner=="p1" ? playerList[match.p1_id].name : playerList[match.p2_id].name}</Col>
                </Row>
                <Divider style={{width:"100%"}}/>
            </>
            )})

            }
        </div>

    )
}
