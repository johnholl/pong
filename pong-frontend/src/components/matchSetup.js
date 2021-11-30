import React from 'react';
import { Form, Select, Button, Row, Col, Typography, Dropdown, Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;

const address = 'http://192.168.1.145:3001'

export default function MatchSetup(props) {
    
    const [playerList, setPlayerList] = React.useState({});
    const [player1, setPlayer1] = React.useState(null);
    const [player2, setPlayer2] = React.useState(null);

    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_self" rel="noopener noreferrer" href="/createplayer">
            Create Player
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_self" rel="noopener noreferrer" href="/editplayer">
            Edit Players
          </a>
        </Menu.Item>
        <Menu.Item>
        <a target="_self" rel="noopener noreferrer" href="/history">
            History
        </a>
        </Menu.Item>
      </Menu>
    );


    const onFinish = (values) => {
        fetch(address + '/changeScore', {method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({player: "none", op: "reset"})})
        props.history.push({pathname:"/match",
         state: {p1: {id: values.p1, name:playerList[values.p1].name, avatar:playerList[values.p1].avatar},
                 p2: {id: values.p2, name:playerList[values.p2].name, avatar:playerList[values.p2].avatar},
                 mt: values.mt},
                });
      };

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
              result[data[i]._id] = {name: data[i].name, avatar: data[i].avatar};
            }
             setPlayerList(result)
            });
      }, [])

    return(
    <div>
      <Row justify="space-between" style={{padding:20}}>
        <img src={"USA_Table_Tennis_logo.png"} alt={""} style={{height:50}}/>
        <Dropdown overlay={menu} placement="bottomLeft" arrow>
          <Button><SettingOutlined/></Button>
        </Dropdown>
      </Row>
      <Row justify="center"><Title level={1} style={{color:"#444444"}}>Start a Match</Title></Row>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Row justify="space-around" style={{paddingTop:10}}>
          <Col span={6} style={{backgroundColor:"#FFE5B4", padding:10, borderRadius:10}}>
            <div style={{fontWeight:900, color:"#444444"}}>select player 1</div>
          <Form.Item
            name="p1"
            rules={[{ required: true, message: 'required' }]}
          >
            <Select
            onChange={(val)=>{setPlayer1(playerList[val])}}
            >
              {Object.entries(playerList).map(player => {return(<Option value={player[0]} key={player[0]}>{player[1].name}</Option>)})}
            </Select>
          </Form.Item>
          <Row justify="center">
          <img src={address + "/" + (player1 ? player1.avatar : "anonymous.jpeg")} alt={"no avatar"} style={{height:200, width:200, borderRadius:100}} />
          </Row>
          </Col>
          <Col span={6} style={{backgroundColor:"#CCCCFF", padding:10, borderRadius:10}}>
          <div style={{fontWeight:900, color:"#444444"}}>select player 2</div>
          <Form.Item
            name="p2"
            rules={[{ required: true, message: 'required' }]}
          >
            <Select
            onChange={(val)=>{setPlayer2(playerList[val])}}
            >
              {Object.entries(playerList).map(player => {return(<Option value={player[0]} key={player[0]}>{player[1].name}</Option>)})}
            </Select>
          </Form.Item>
          <Row justify="center">
            <img src={address + "/" + (player2 ? player2.avatar : "anonymous.jpeg")} alt={"no avatar"} style={{height:200, width:200, borderRadius:100}} />
          </Row>
          </Col>
          </Row>
          <Row justify="center" style={{paddingTop:30}}>
            <Col span={8}>
            <div style={{fontWeight:900, color:"#444444"}}>match type</div>
          <Form.Item
            name="mt"
            rules={[{ required: true, message: 'Please enter a match type' }]}
          >
            <Select>
              <Option value={1}>Single game</Option>
              <Option value={2}>Best 2 out of 3</Option>
              <Option value={3}>Best 3 out of 5</Option>
            </Select>
          </Form.Item>
          </Col>
          </Row>
          <Row justify="space-around">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Start Match
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>

    )
}
