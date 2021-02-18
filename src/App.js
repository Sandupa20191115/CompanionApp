import React, {useState, useEffect,Component} from "react";

import "./App.css";
import TodoApp from "./components/TodoApp";
import {DateTime} from "./components/DateTime";

class App extends Component{
    render(){
        return (
            <>
            <DateTime/>
            <TodoApp/>
            </>
        );
    }
}

export default App;
