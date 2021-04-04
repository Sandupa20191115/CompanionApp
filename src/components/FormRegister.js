import React from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "./FormRegister.css";
import { FormField } from "./FormField";
import loader from "../images/tail-spin.svg";

const formValid = (formErrors) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  return valid;
};

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
        confPassword: "",
      },
      loading: false,
      response: {
        username: "",
        error: "",
        id: 0,
      },
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    let formErrors = this.state.formErrors;

    if (this.state.username === "")
      formErrors.username = "This is a required field";
    if (this.state.email === "") formErrors.email = "This is a required field";
    if (this.state.password === "")
      formErrors.password = "This is a required field";
    if (this.state.confPassword === "")
      formErrors.confPassword = "This is a required field";

    if (formValid(this.state.formErrors)) {
      console.log(this.state);

      const newUser = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.state.username,
          email: this.state.email,
          password: this.state.password,
        }),
      };

      let loading = true;
      this.setState({ loading });
      console.log(loading);

      const res = await fetch(
        "http://localhost:5000/api/user/register",
        newUser
      );
      const json = await res.json();
      console.log(json);

      const response = {
        error: json.error,
        username: this.state.username,
        id: json.user,
      };

      this.setState({ response });
      console.log(this.state.response);

      loading = false;
      this.setState({ loading });
      console.log(loading);

      if (!response.error)
        this.props.routing(
          true,
          "Hello " + response.username + "Welcome",
          response.username
        );
    } else {
      console.error("INVALID");
    }
    this.setState({ formErrors });
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "username":
        formErrors.username =
          value.length < 3 && value.length > 0
            ? "Minimum 3 character required"
            : "";
        break;

      case "email":
        // formErrors.email = emailRegex.test(value) < 3 && value.length > 0 ? "" : "Not a valid Email";
        if (!value.includes("@")) {
          formErrors.email = "Invalid email";
        } else {
          formErrors.email = "";
        }
        break;

      case "password":
        formErrors.password =
          value.length < 6 && value.length > 0
            ? "Minimum 6 characters requires"
            : "";
        break;

      case "confPassword":
        if (value === this.state.password) formErrors.confPassword = "";
        else formErrors.confPassword = "Passwords do not match";
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const formErrors = this.state.formErrors;
    const loading = this.state.loading;

    return (
      <>
        {!loading ? (
          <div className={"register"}>
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit} noValidate>
              <FormField
                handleChange={this.handleChange}
                name={"username"}
                type={"text"}
                formErrors={formErrors}
              />
              <FormField
                handleChange={this.handleChange}
                name={"email"}
                type={"email"}
                formErrors={formErrors}
              />
              <FormField
                handleChange={this.handleChange}
                name={"password"}
                type={"password"}
                formErrors={formErrors}
              />
              <FormField
                handleChange={this.handleChange}
                name={"confPassword"}
                type={"password"}
                formErrors={formErrors}
                placeholder={"Confirm password"}
              />

              <div className={"btnContainer"}>
                <button type={"submit"}>Register</button>
              </div>
              {this.state.response.error && (
                <span>{this.state.response.error}</span>
              )}
            </form>
          </div>
        ) : (
          <div className={"register"}>
            <img src={loader} />
          </div>
        )}
      </>
    );
  }
}

export default FormRegister;
