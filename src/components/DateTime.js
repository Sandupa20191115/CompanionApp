import React, { Component } from "react";
import colors from "../assets/colors";

export default class DateTime extends Component {
  constructor() {
    super();
    this.state = {
      currentDateTime: new Date(),
    };
  }

  componentDidMount() {
    setInterval(this.update, 1000);
  }

  update = () => {
    this.setState({
      currentDateTime: new Date(),
    });
  };

  render() {
    let hours = this.state.currentDateTime.getHours();
    let amPm = "AM";
    if (hours > 12) {
      hours = hours - 12;
      amPm = "PM";
    }
    let minutes = this.state.currentDateTime.getMinutes();
    if (minutes.toString().length === 1) minutes = "" + 0 + minutes;
    const seconds = this.state.currentDateTime.getSeconds();

    const month = this.state.currentDateTime.getMonth();
    const date = this.state.currentDateTime.getDate();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
      <div className={"dateTime"}>
        <div style={this.style.time} className={"time"}>
          {hours} : {minutes} {amPm}
        </div>
        <div style={this.style.date} className={"date"}>
          {date}
          <sup>th </sup>
          of
          {" " + months[month]}
        </div>
      </div>
    );
  }

  style = {
    time: {
      fontFamily: "Quicksand",
      textAlign: "end",
      color: colors.main,
    },
    date: {
      fontFamily: "Quicksand",
    },
  };
}
