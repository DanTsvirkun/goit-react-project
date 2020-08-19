import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import React, { Component } from "react";

export default class App extends Component {
  //other logic
  render() {
    return (
      <Loader
        type="TailSpin"
        color="#FF6B08"
        height={80}
        width={80}
        timeout={50000} //3 secs
      />
    );
  }
}
