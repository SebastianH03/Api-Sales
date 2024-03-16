import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ShopCart from './components/ShopCart/ShopCart.jsx';

function App() {
  const [stock_id, setstock_id] = useState('');
  const [foundProduct, setFoundProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const [totalProducts, setTotalProducts] = useState(0); 

  const handleSearch = async () => {
    setFoundProduct(null);
    if (stock_id && stock_id.length > 0) {
      try {
        const response = await axios.get(`http://localhost:3900/stock/${stock_id}`);
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
      
      const existingItemIndex = cartItems.findIndex((item) => item.product_id === foundProduct.product._id);
      const quantityToAdd = parseInt(quantity, 10);
      setTotalProducts(totalProducts + quantityToAdd);
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += quantityToAdd;
        setCartItems(updatedCartItems);
      } else {
        const newItem = {
          stock_id: stock_id,
          product_id: foundProduct.product._id,
          product_name: foundProduct.product.name,
          price: foundProduct.product.price,
          quantity: quantityToAdd,
          provider: foundProduct.product.provider,
        };
        setCartItems([...cartItems, newItem]);
      }
      setQuantity(1);
    }
  };
  

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  return (
    
    <div className={`App ${isCartOpen ? 'cart-open' : ''}`}>
      <Navbar />
      <ShopCart
      cartItems={cartItems}
      setCartItems={setCartItems}
      total={calculateTotal()}
      setIsCartOpen ={setIsCartOpen}
      totalProductsCar = {totalProducts}
      setTotalProducts = {setTotalProducts}
      />
      <div className='blueRectangle' >
        <p className='Text' >Encuentra el producto que necesitas</p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar producto"
            value={stock_id}
            onChange={(e) => setstock_id(e.target.value)}
          />
          <div className='search-button'>
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
            <button id='button1' onClick={handleSearch} >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div>
  {foundProduct ? (
    <div>
      {foundProduct && (
        <p id='foundProduct' >Producto encontrado: <strong>{foundProduct.product.name}</strong></p>
      )} 
      <div className='shopButton'>
        <button id='addButton' onClick={handleAddProduct}>
          Agregar <i className="fa-brands fa-shopify"></i>
        </button>
        <input
          id='totalInput'
          type="number"
          placeholder="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
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
    </div>
  );
}

export default App;
