import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ShopCar from './components/ShopCart/ShopCart.jsx'
import Error404 from './components/Error404/Error404.jsx'
import IniciarSesion from './components/IniciarSesion/IniciarSesion.jsx'
import Registro from './components/Registro/Registro.jsx'
import History  from './components/History/History.jsx'
import Ventas  from './components/Ventas/Sales.jsx'

import './index.css'
import {Routes, Route, BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/iniciarSesion" element={<IniciarSesion />}/>
      <Route path="/registro" element={<Registro />}/>
      <Route path="/historial" element={<History />}/>
      <Route path="/ventas" element={<Ventas />}/>
      <Route path="*" element={<Error404 />}/>
    </Routes>
  </BrowserRouter>
)
