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

class FormLogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      formErrors: {
        email: "",
        password: "",
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

    if (this.state.email === "") formErrors.email = "This is a required field";
    if (this.state.password === "")
      formErrors.password = "This is a required field";

    if (formValid(this.state.formErrors)) {
      console.log(this.state);

      const newUser = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      };

      // fetch("http://localhost:3500/api/user/login", newUser)
      //   .then((response) => response.json())
      //   .then((data) => console.log(data));

      let loading = true;
      this.setState({ loading });

      const res = await fetch("http://localhost:5000/api/user/login", newUser);
      const json = await res.json();
      console.log(json);
      const response = {
        error: json.error,
        username: json.user,
        id: json.id,
      };

      this.setState({ response });
      console.log(this.state.response);

      loading = false;
      this.setState({ loading });

      if (!response.error)
        this.props.routing(
          true,
          "Hello " + response.username + ", Welcome Back",
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
          value.length < 6 && value.length > 0 ? "minimum 6 character" : "";
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
          <div className={"login"}>
            <h1>Log In</h1>
            <form onSubmit={this.handleSubmit} noValidate>
              <FormField
                formErrors={formErrors}
                type={"text"}
                name={"email"}
                handleChange={this.handleChange}
              />
              <FormField
                formErrors={formErrors}
                type={"password"}
                name={"password"}
                handleChange={this.handleChange}
              />

              <div className={"btnContainer"}>
                <button type={"login"}>Log In</button>
              </div>
              {this.state.response.error && (
                <span>{this.state.response.error}</span>
              )}
            </form>
          </div>
        ) : (
          <div className={"login"}>
            <img src={loader} />
          </div>
        )}
      </>
    );
  }
}

export default FormLogIn;

// {

//     "name" : "Sandupa Egodage",
//     "email" :"sanduBatman2@gmail.com",
//     "password":"sandu1234"
// }
