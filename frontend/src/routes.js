import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage'

const Urls = () => (
  <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route exact path="/home" element={<Home/>} />
  </Routes>
);

export default Urls;
