import React, {Component} from "react";
import FormRegister from "./FormRegister";
import FormLogIn from "./FormLogIn";
import checkIcon from "../images/Frame.png";


class Welcome extends Component {

    state = {
        loginNav: false,
        showUsername: false,
        message: ""
    }

    routing = (show, message,username) => {
        if (show) {
            let showUsername = true;
            this.setState({showUsername, message});
            this.props.history.push({
                pathname: '/todo',
                state: {username: username}
            });
        }
    }

    // guide = () => {
    // }

    render() {
        return (
            <div className={"formContainer"}>

                {!this.state.loginNav && <FormRegister routing={this.routing}/>}
                {this.state.loginNav && <FormLogIn routing={this.routing}/>}

                <span className={"miniAlt"}>
                    <h2>{!this.state.loginNav ? "Not new ?" : "New here ?"}</h2>
                    <h2 className={"altLinkMini"} onClick={() => {
                        const loginNav = !this.state.loginNav
                        this.setState({loginNav})
                    }}>
                        &nbsp;{!this.state.loginNav ? " Login" : " Register"}
                    </h2>
                </span>

                <div className={"alt"}>
                    {!this.state.showUsername ? <>
                        <h1>Seek</h1>
                        <h3>The companion for all of your , Alarms, Tasks and Timers from the same site.</h3>
                        <h2>{!this.state.loginNav ? "Not new ?" : "New here ?"}</h2>
                        <h2 className={"altLink"} onClick={() => {
                            const loginNav = !this.state.loginNav
                            this.setState({loginNav})
                        }}>{!this.state.loginNav ? " Login" : " Register"}</h2>
                    </> : <h2>{this.state.message}</h2>}
                    <img src={checkIcon} alt={"bgImageLogo"}/>
                </div>

            </div>
        );
    }
}

export default Welcome;