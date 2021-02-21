import React, {useState, useEffect, Component} from "react";

import "./App.css";
import TodoApp from "./components/TodoApp";
import {DateTime} from "./components/DateTime";
import FormRegister from "./components/FormRegister";
import FormLogIn from "./components/FormLogIn";
import checkIcon from "./images/Frame.png";

class App extends Component {

    state = {
        loginNav : false
    }

    render() {
        return (
            <div className={"formContainer"}>
                {!this.state.loginNav && <FormRegister/>}
                {this.state.loginNav && <FormLogIn/>}
                <div className={"alt"}>
                    <h1>Seek</h1>
                    <h3>The companion for all of your , Alarms, Tasks and Timers from the same site.</h3>
                    <h2>{!this.state.loginNav ? "Not new ?" : "New here?"}</h2>
                    <h2 className={"loginLink"} onClick={() => {
                        const loginNav = !this.state.loginNav
                        this.setState({loginNav})
                    }}>{!this.state.loginNav ? "Login" : "Register"}</h2>
                    <img src={checkIcon}/>
                </div>
            </div>
        );
    }
}

export default App;
