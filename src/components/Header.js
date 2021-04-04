import React from "react";
import { Fragment } from "react";
import colors from "../assets/colors";
import DateTime from "./DateTime";

const style = {
  username: {
    color: colors.main,
    fontSize: "50px",
  },
};

const Header = ({ username }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "100px 60px 0px 60px",
      }}
    >
      <div style={{ lineHeight: "40px" }}>
        <h1 style={{ color: colors.black, fontSize: "35px" }}>Hello</h1>
        <h1 style={style.username}>DmnCybrg</h1>
      </div>
      <DateTime />
    </div>
  );
};

export default Header;
