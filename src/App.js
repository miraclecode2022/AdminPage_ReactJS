import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'; 
import AdminPage from './components/layouts/AdminPage';
import LoginPage from './components/layouts/LoginPage';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={LoginPage}/>
          <Route path="/dashboard" component={AdminPage}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;


