import React ,{Component} from "react";
import './App.css';
import { Link,Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Components/Home";

import {useState,useEffect} from "react";
import jsonData from './Components/posts.json';
 
function App() {
  

  return (
  <div>
    <Navbar  placeholder="Enter title..." data={jsonData} />
   <Home url= "https://jsonplaceholder.typicode.com/posts"/>
   </div>
  );
}
  

export default App;
