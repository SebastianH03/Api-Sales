// App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Pruebas from './components/ShopCar/ShopCar.jsx';

function App() {
  const [productId, setProductId] = useState('');
  const [foundProduct, setFoundProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleSearch = async () => {
    setFoundProduct(null);
    if (productId && productId.length > 0) {
      try {
        const response = await axios.get(`http://localhost:3900/stock/${productId}`);
        const product = response.data.stock;

        if (product) {
          console.log('Producto encontrado:', product);
          setFoundProduct(product);
        }
      } catch (error) {
        console.error('Error al buscar el producto:', error.message);
      }
    }
  };

  const handleAddProduct = () => {
    if (foundProduct) {
      const existingItemIndex = cartItems.findIndex((item) => item.id === foundProduct.product._id);
    
      // Convertir la cantidad del input a un número, para calcular el total
      const quantityToAdd = parseInt(quantity, 10);
    
      if (existingItemIndex !== -1) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += quantityToAdd;
        setCartItems(updatedCartItems);
      } else {
        // Si el producto no está en el carrito, se agrega
        const newItem = {
          id: foundProduct.product._id,
          name: foundProduct.product.name,
          price: foundProduct.product.price || 0,
          quantity: quantityToAdd,
        };
        setCartItems([...cartItems, newItem]);
      }
    
      setFoundProduct(null);
      setQuantity(1);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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
          Agregar <i className="fa-brands fa-shopify"></i>
        </button>
        <input
          id='totalInput'
          type="number"
          placeholder="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)} //cambiar cantidad con las flechas
        />
      </div>
    </div>
  ) : (
    <div id='invalidId'>
      <i className="fa-regular fa-face-frown"></i>
      <p>Producto no encontrado, verifique el ID</p>
    </div>
  )}
  <h1 className='Text2'>Más que productos, experiencias</h1>
</div>
<Pruebas
      cartItems={cartItems}
      setCartItems={setCartItems}
      total={calculateTotal()}
    />
    </div>
  );
}

export default App;
