import React from 'react'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <div>
      <Navbar />
      <div className='blueRectangle'>
        <h1 className='Text'>Encuentra el producto que necesitas</h1>
        {/* Aquí puedes agregar tu barra de búsqueda */}
        <div className="search-container">
          <input type="text" placeholder="Buscar producto" />
          <button>Buscar</button>
        </div>
      </div>
      <h1 className='Text2'>Más que productos, experiencias</h1>
    </div>
  );
}

export default App;