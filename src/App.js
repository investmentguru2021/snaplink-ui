import "./styles.css";
import { Route, Routes } from "react-router-dom";
import { Component, useState, useEffect } from "react";
import Home from "./routes/Home";
import ApplicationHomeComponent from "./routes/ApplicationHomeComponent";

export default function App() {

  const [props, setProps] = useState([]);
  props.authenticationStatus = 'false';

  const [ data, setData] = useState({
    soeId:'',
    authenticationStatus:'false'
  })

  const sendData = ( data) => {
    setData(data);
  }


  return (
    <div className="App">
      <ApplicationHomeComponent sendData = {sendData} data={data}/>
    </div>
  );
}
