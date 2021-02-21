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

class FormLogIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            formErrors: {
                email: "",
                password: "",
            }
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        let formErrors = this.state.formErrors;

        if(this.state.email === "") formErrors.email = "This is a required field";
        if(this.state.password === "") formErrors.password = "This is a required field";
        // if (this.state.email === "" || this.state.password === "") {
        //     console.log("Cannot leave empty");
        // }
        if (formValid(this.state.formErrors)) {
            console.log(this.state);

            const newUser = {
                method : "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email : this.state.email,
                    password : this.state.password
                })
            }

            fetch("http://localhost:3500/api/user/login",newUser)
                .then(response => response.json())
                .then(data => console.log(data));

        } else {
            console.error("INVALID");
        }

        this.setState({formErrors});
    }

    handleChange = event => {
        event.preventDefault();
        const {name, value} = event.target;
        let formErrors = this.state.formErrors;

        switch (name) {
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
                formErrors.password = value.length < 6 && value.length > 0 ? "minimum 6 character" : "";
                break;

            default:
                break;
        }

        this.setState({formErrors, [name]: value})
    }

    render() {

        const formErrors = this.state.formErrors;

        return (
            <div className={"login"}>
                <h1>Log In</h1>
                <form onSubmit={this.handleSubmit} noValidate>

                    <div className={"email"}>
                        <label htmlFor={"email"}>Email</label>
                        <input
                            type={"email"}
                            name={"email"}
                            onChange={this.handleChange}
                            placeholder={"Email"}
                        />
                        {formErrors.email && <span>{formErrors.email}</span>}
                    </div>
                    <div className={"password"}>
                        <label htmlFor={"password"}>Password</label>
                        <input
                            type={"text"}
                            name={"password"}
                            onChange={this.handleChange}
                            placeholder={"Password"}
                        />
                        {formErrors.password && <span>{formErrors.password}</span>}
                    </div>

                    <div className={"btnContainer"}>
                        <button type={"login"}>Log In</button>
                    </div>

                </form>
            </div>
        );
    }
}

export default FormLogIn;

// {
//     "name" : "Sandupa Egodage",
//     "email" :"sanduBatman2@gmail.com",
//     "password":"sandu1234"
// }