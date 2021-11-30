import React from 'react';
import { Form, Input, Button, Select, Col, Row, Checkbox, Typography } from 'antd';
const {Option} = Select;
const {Title} = Typography;

const avatars = ["apex2.jpeg", "chewy.jpg", "elsa.jpeg", "ewok.jpg", "fett.jpg",
 "groot.jpg", "jplogo.jpg", "mando.jpg", "mario.png", "olaf.jpeg", "racoon.jpg",
  "roboapex.jpeg", "sonic.jpeg", "spiderkid.jpg", "spiderman.jpg", "toad.jpeg",
   "trex.png", "vader.jpg", "yoda.jpg"];

export default function EditPlayer(props) {
    const [player, setPlayer] = React.useState(null);
    const [playerList, setPlayerList] = React.useState({});
    const [userAvatar, setUserAvatar] = React.useState(null);
    const [deletable, setDeletable] = React.useState(false);

    React.useEffect(() => {
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://192.168.1.145:3001/players', requestOptions)
            .then(response => response.json())
            .then(data => {
              var result = {};
              for (var i = 0; i < data.length; i++) {
                result[data[i]._id] = {name: data[i].name, avatar: data[i].avatar, _id: data[i]._id};
              }
               setPlayerList(result)
              });
        }, [])

    const onFinish = (values) => {
        console.log(userAvatar);
        const nm = values.newname ? values.newname : player.name;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nm, avatar: userAvatar, _id: player._id })
          };
          fetch('http://192.168.1.145:3001/updateplayer', requestOptions)
              .then(response => {})
              .then(() => props.history.push("/setup"));
      };

      const onDelete = (values) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({_id: player._id })
          };
          fetch('http://192.168.1.145:3001/deletePlayer', requestOptions)
              .then(response => {})
              .then(() => props.history.push("/setup"));
      };

    return(
    <>
      <Row justify="center"><Title level={1} style={{color:"#444444"}}>Edit Player</Title></Row>
      <Row justify="space-around" style={{paddingTop:30}}>
          <Col span={8}>
              <Form
              name="basic"
              onFinish={onFinish}
          >
              <div>Select a Player</div>
              <Form.Item
              name="name"
              rules={[{ required: true, message: 'required' }]}
            >
              <Select
              onChange={(val)=>{setPlayer(playerList[val]); setUserAvatar(playerList[val].avatar)}}
              >
                {Object.entries(playerList).map(player => {return(<Option value={player[0]} key={player[0]}>{player[1].name}</Option>)})}
              </Select>
            </Form.Item>
            <div>New Name</div>
              <Form.Item
              name="newname">
              <Input disabled={!player} placeholder={"leave blank to keep your name"}/>
              </Form.Item> 
              <Form.Item
              name="avatar"
              >
              <div>Select Avatar</div>
              <Select
                  disabled={!player}
                  onChange={(val)=>{setUserAvatar(val)}}
                  value={userAvatar}
              >
                  {avatars.map((avatar)=> {return(<Option value={avatar} key={avatar}>{avatar}</Option>)})}
              </Select>
              </Form.Item>
              <Form.Item>
              <Button type="primary" htmlType="submit" disabled={!player}>
                  Update
              </Button>
              </Form.Item>
              <Row justify="space-around" align="middle">
              <Checkbox disabled={!player} onChange={()=>{setDeletable(!deletable)}}>I want to delete this player</Checkbox>
              <Button type="danger" disabled={!player || !deletable} onClick={onDelete}>
                  Delete Player
              </Button>
              </Row>
          </Form>
          </Col>
          <Col span={8}>
              {userAvatar && <img src={"http://192.168.1.145:3001/" + userAvatar} alt={"no avatar"} style={{width:200, height:200, borderRadius:100}}/>}
          </Col>
      </Row>
    </>

    )
}
