import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'antd/dist/antd.css';
import MatchSetup from './components/matchSetup';
import Match from './components/match';
import Home from './components/home';
import History from './components/history';
import CreatePlayer from './components/createPlayer';
import EditPlayer from './components/editPlayer';


function App() {

  return (
  <Router>
    <div>
      <Switch>
        <Route path="/setup" component={MatchSetup} />
        <Route path="/match" component={Match} />
        <Route path="/createplayer" component={CreatePlayer} />
        <Route path="/editplayer" component={EditPlayer} />
        <Route path="/history" component={History} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;