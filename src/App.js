import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route path="/carteira">
        <Wallet />
      </Route>
      <Route exact path="/">
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
