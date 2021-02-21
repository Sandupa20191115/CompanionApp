import React from "react";
import Button from "@material-ui/core/Button";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import "./FormRegister.css";

const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false)
    });

    return valid;

}

class FormRegister extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            confPassword: "",
            formErrors: {
                username: "",
                email: "",
                password: "",
                confPassword: ""
            }
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        let formErrors = this.state.formErrors;

        if(this.state.username === "") formErrors.username = "This is a required field";
        if(this.state.email === "") formErrors.email = "This is a required field";
        if(this.state.password === "") formErrors.password = "This is a required field";
        if(this.state.confPassword === "") formErrors.confPassword = "This is a required field";

        // if (this.state.username === "" || this.state.email === "" || this.state.password === "" || this.state.confPassword === "") {
        //     console.log("Cannot leave empty");}
        if (formValid(this.state.formErrors)) {
            console.log(this.state);

            const newUser = {
                method : "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: this.state.username,
                    email : this.state.email,
                    password : this.state.password
                })
            }

            try {
                fetch("http://localhost:3500/api/user/register",newUser)
                    .then(response => response.json())
                    .then(data => console.log(data));
            }catch (error){
                console.log("Error in pushing to db");
            }

        } else {
            console.error("INVALID");
        }
        this.setState({formErrors})
    }

    handleChange = event => {
        event.preventDefault();
        const {name, value} = event.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case "username":
                formErrors.username = value.length < 3 && value.length > 0 ? "Minimum 3 character required" : "";
                break;

            case "email":
                // formErrors.email = emailRegex.test(value) < 3 && value.length > 0 ? "" : "Not a valid Email";
                if (!value.includes("@")) {
                    console.log(value)
                    formErrors.email = "Invalid email";
                } else {
                    formErrors.email = ""
                }
                break;

            case "password":
                formErrors.password = value.length < 6 && value.length > 0 ? "Minimum 6 characters requires" : "";
                break;

            case "confPassword":
                if (value === this.state.password) formErrors.confPassword = "";
                else formErrors.confPassword = "Passwords do not match";
                break;

            default:
                break;
        }

        this.setState({formErrors, [name]: value})
    }

    render() {

        const formErrors = this.state.formErrors;

        return (
            <div className={"register"}>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit} noValidate>

                    <div className={"username"}>
                        <label htmlFor={"username"}>Username</label>
                        <input
                            type={"text"}
                            name={"username"}
                            placeholder={"Username"}
                            onChange={this.handleChange}
                            spellCheck={false}
                        />
                        {formErrors.username && <span>{formErrors.username}</span>}
                    </div>
                    <div className={"email"}>
                        <label htmlFor={"email"}>Email</label>
                        <input
                            type={"email"}
                            name={"email"}
                            placeholder={"Email"}
                            onChange={this.handleChange}
                        />
                        {formErrors.email && <span>{formErrors.email}</span>}
                    </div>
                    <div className={"password"}>
                        <label htmlFor={"password"}>Password</label>
                        <input
                            type={"text"}
                            name={"password"}
                            placeholder={"Password"}
                            onChange={this.handleChange}
                        />
                        {formErrors.password && <span>{formErrors.password}</span>}
                    </div>
                    <div className={"confPassword"}>
                        <label htmlFor={"confPassword"}>Confirm Password</label>
                        <input
                            type={"text"}
                            name={"confPassword"}
                            placeholder={"Confirm password"}
                            onChange={this.handleChange}
                        />
                        {formErrors.confPassword && <span>{formErrors.confPassword}</span>}
                    </div>

                    <div className={"btnContainer"}>
                        <button type={"submit"}>Register</button>
                    </div>

                </form>
            </div>
        );
    }
}

export default FormRegister;