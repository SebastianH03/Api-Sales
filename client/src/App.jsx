import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'



function App() {
  return (
    <div>
      <Navbar />
      <div className='blueRectangle'>
        <h1 className='Text'>Encuentra el producto que necesitas</h1>
        <div className="search-container">
          <input type="text" placeholder="Buscar producto"/>
          <div className='search-button'>
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
            <button id='button1'>Buscar</button>
          </div>
        </div>
      </div>
      <div>
        <div className='shopButton'>
          <button id='addButton'>Agregar</button>
          <input id='totalInput' type="text" placeholder="Cantidad"/>
        </div>
        <h1 className='Text2'>Más que productos, experiencias</h1>
      </div>
    </div>
  );
}

export default App;