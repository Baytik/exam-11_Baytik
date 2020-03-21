import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Header from "./Components/Header/Header";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import newItem from "./Components/newItem/newItem";
import Items from "./Components/Items/Items";

class App extends Component {
  render() {
    return (
        <div className="App">
          <Header/>
          <Switch>
              <Route path="/" exact component={Items}/>
              <Route path="/items/:id" component={Items}/>
              <Route path="/register" component={Register}/>
              <Route path="/login" component={Login}/>
              <Route path="/new_item" component={newItem}/>
          </Switch>
        </div>
    )
  }
}

export default App;
