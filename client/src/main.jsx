import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ShopCar from './components/ShopCar/ShopCar.jsx'
import Error404 from './components/Error404/Error404.jsx'
import IniciarSesion from './components/IniciarSesion/IniciarSesion.jsx'
import Registro from './components/Registro/Registro.jsx'

import './index.css'
import {Routes, Route, BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/pruebas" element={<ShopCar />}/>
      <Route path="/iniciarSesion" element={<IniciarSesion />}/>
      <Route path="/registro" element={<Registro />}/>
      <Route path="*" element={<Error404 />}/>
    </Routes>
  </BrowserRouter>
)
