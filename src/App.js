import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadImg from './containers/UploadImg';
import ErrorPage from './containers/ErrorPage';
import axios from 'axios';
import {useState} from 'react';

function App() {

  return (
    <>
    { <UploadImg />}
    </>
  );
}

export default App;