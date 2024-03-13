import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ShopCar from './components/ShopCar/ShopCar.jsx'
import Error404 from './components/Error404/Error404.jsx'

import './index.css'
import {Routes, Route, BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/pruebas" element={<ShopCar />}/>
      <Route path="*" element={<Error404 />}/>
    </Routes>
  </BrowserRouter>
)
