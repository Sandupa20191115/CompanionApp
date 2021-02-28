import React, {useState, useEffect, Component} from "react";

import "./App.css";
import TodoApp from "./components/TodoApp";
import DateTime from "./components/DateTime";
import FormRegister from "./components/FormRegister";
import FormLogIn from "./components/FormLogIn";
import checkIcon from "./images/Frame.png";
import Welcome from "./components/Welcome";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path={"/welcome"} component={Welcome}/>
                    <Route path={"/todo"} component={TodoApp}/>
                    {/*<Welcome/>*/}
                    {/*<TodoApp/>*/}
                </Switch>
            </Router>
        );
    }
}

export default App;
