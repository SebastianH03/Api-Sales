import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [productId, setProductId] = useState('');
  const [foundProduct, setFoundProduct] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3900/stock/${productId}`);
      const product = response.data.stock;
      if (product) {
        console.log('Producto encontrado:', product);
        setFoundProduct(product);
      } 
    } catch (error) {
      console.error('Error al buscar el producto:', error.message);
      setFoundProduct(null);
    }
  };

  const handleAddProduct = () => {
    // Aquí puedes implementar la lógica para agregar el producto
    // Puedes utilizar el estado 'foundProduct' para obtener la información del producto encontrado
    // y la cantidad del input
    alert('Producto agregado. Cantidad: [obtener valor del input]');
  };

  return (
    <div>
      <Navbar />
      <div className='blueRectangle'>
        <h1 className='Text'>Encuentra el producto que necesitas</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar producto"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <div className='search-button'>
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
            <button id='button1' onClick={handleSearch}>
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div>
        {foundProduct ? (
          <div>
            <div className='shopButton'>
              <button id='addButton' onClick={handleAddProduct}>
                Agregar
              </button>
              <input id='totalInput' type="text" placeholder="Cantidad"/>
            </div>
          </div>
          
        ) : (
          <div id='invalidId'>
            <i class="fa-regular fa-face-frown"></i>
            <p >Producto no encontrado, verifique el ID</p>
          </div>   
        )}
        <h1 className='Text2'>Más que productos, experiencias</h1>
      </div>
    </div>
  );
}

export default App;
