import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Games from './components/Games'
import Header from './components/Header'
import Streams from './components/Streams'
import GameStreams from './components/GameStreams'
import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/shards-ui/dist/css/shards.min.css";

function App() {
  return (
    <Router>
    <div className="App container-fluid">
    <Header />
    <Route exact path = '/' component={Games} />
    <Route exact path = '/top-streams' component={Streams} />
    <Route exact path = '/game/:id' component={GameStreams} />
    </div>
    </Router>
  );
}

export default App;
