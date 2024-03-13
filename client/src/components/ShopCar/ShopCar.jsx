// Pruebas.jsx
import React from 'react';
import './ShopCar.css';

class Pruebas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleCartClick = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }), () => {
      const divPruebas = document.getElementById('divPruebas');
      if (this.state.isOpen) {
        divPruebas.classList.add('open');
      } else {
        divPruebas.classList.remove('open');
      }
    });
  };

  handleRemoveProduct = (productId) => {
    const { cartItems, setCartItems } = this.props;
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  render() {
    const { cartItems, total } = this.props;

    return (
      <div id='divPruebas' className={cartItems.length > 0 ? 'open' : ''}>
        <button onClick={this.handleCartClick}>
          <i id='iconoShopify' className="fa-brands fa-shopify"></i>
        </button>
        <div id='cartDropdown'>
          <p>Tu canasta</p>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - Cantidad: {item.quantity} - Precio: ${item.price} - Subtotal: ${item.price * item.quantity}
                <button onClick={() => this.handleRemoveProduct(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <div id="totalContainer">
            <p>Total: ${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Pruebas;