import React from 'react';
import { Form, Input, Button, Select, Col, Row, Typography } from 'antd';
const {Option} = Select;
const {Title} = Typography;

const funnyNames = ["billy joe cat", "careful jordan", "yeet yeet", "Phil Collins", "Grogu", "A girl has no name"]

const avatars = ["apex2.jpeg", "chewy.jpg", "elsa.jpeg", "ewok.jpg", "fett.jpg",
 "groot.jpg", "jplogo.jpg", "mando.jpg", "mario.png", "olaf.jpeg", "racoon.jpg",
  "roboapex.jpeg", "sonic.jpeg", "spiderkid.jpg", "spiderman.jpg", "toad.jpeg",
   "trex.png", "vader.jpg", "yoda.jpg"];

export default function CreatePlayer(props) {
    const [userAvatar, setUserAvatar] = React.useState(avatars[Math.floor(Math.random() * avatars.length)])

    const onFinish = (values) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: values.name, avatar: userAvatar })
          };
          fetch('http://192.168.1.145:3001/createplayer', requestOptions)
              .then(response => {})
              .then(() => props.history.push("/setup"));
      };

    return(
    <>
    <Row justify="center"><Title level={1} style={{color:"#444444"}}>Add Player</Title></Row>
    <Row justify="space-around" style={{paddingTop:30}}>
        <Col span={8}>
            <Form
            name="basic"
            initialValues={{avatar: userAvatar }}
            onFinish={onFinish}
        >
            <div>Enter Name</div>
            <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please enter a name' }]}
            >
            <Input placeholder={funnyNames[Math.floor(Math.random() * funnyNames.length)]}/>
            </Form.Item> 
            <Form.Item
            name="avatar"
            rules={[{ required: true, message: 'Avatars make everything more fun' }]}
            >
            <div>Select Avatar</div>
            <Select
                onChange={(val)=>{setUserAvatar(val)}}
                defaultValue={userAvatar}
            >
                {avatars.map((avatar)=> {return(<Option value={avatar} key={avatar}>{avatar}</Option>)})}
            </Select>
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit">
                Create
            </Button>
            </Form.Item>
        </Form>
        </Col>
        <Col span={8}>
            <img src={"http://192.168.1.145:3001/" + userAvatar} alt={"no avatar"} style={{width:200, height:200, borderRadius:100}}/>
        </Col>
    </Row>
    </>

    )
}
