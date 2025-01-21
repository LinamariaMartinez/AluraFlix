import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BasePage from './pages/BasePage';
import NewVideo from './pages/NewVideo';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<BasePage />}>
          <Route index element={<Home />} />
          <Route path="/new-video" element={<NewVideo />} />
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
