import React from 'react';
import './ShopCart.css';
import axios from 'axios';

class ShopCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      clientName: '',
      salesmanName: ''
    };
  }

  handleCartClick = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }), () => {
      const shopCart = document.getElementById('shopCart');
      const { setIsCartOpen } = this.props;
      setIsCartOpen(prevState => !prevState);
      if (this.state.isOpen) {
        shopCart.classList.add('open');
      } else {
        shopCart.classList.remove('open');
      }
    });
  };

  handleRemoveProduct = (productId, quantity) => {
    const { cartItems, setCartItems } = this.props;
    const updatedCartItems = cartItems.filter(item => item.product_id !== productId);
    console.log("values ", quantity)
    this.props.setTotalProducts(this.props.totalProductsCar-quantity);
    setCartItems(updatedCartItems);
  };

  handleGenerateSale = () => {
    const clientName = prompt("Ingrese el nombre del cliente:");
    const salesmanName = prompt("Ingrese el nombre del vendedor:");
  
    if (clientName === null || clientName === "" || salesmanName === null || salesmanName === "") {
      alert("Debe ingresar un nombre de cliente y un nombre de vendedor válidos.");
      return;
    }
    this.setState({
      clientName: clientName,
      salesmanName: salesmanName
    });
    console.log("Nombre del cliente:", clientName);
    console.log("Nombre del vendedor:", salesmanName);
    const data = { salesInfo: this.props.cartItems, salesman: salesmanName, client: clientName };
    const stockData = this.props;
    console.log("datos de la venta", stockData)
    axios.post("http://localhost:3900/sales", data)
      .then((response) => {
        alert("Venta generada correctamente :)", response);
        this.props.setCartItems([]);
        this.props.setTotalProducts(0);
      })
      .catch((error) => {
        alert("Datos incorrectos, intente nuevamente :(", error);
      });
  };
  

  render() {
    const { cartItems, total } = this.props;
    const saleTotal = total;
    const showGenerateSaleButton = saleTotal > 0;
    const totalProductsCar = this.props.totalProductsCar 
    return (
      <div id='shopCart'>
        <button onClick={this.handleCartClick}>
          <i id='iconoShopify' className="fa-brands fa-shopify"></i>
          <div id='circle' style={{ cursor: 'default', pointerEvents: 'none' }}>
            <p>{totalProductsCar}</p>
          </div>
        </button>
        <div id='cartDropdown'>
          <p id='saleTittle'>Venta</p>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <div>
                  <strong>{item.product_name}</strong>
                </div>
                <div>
                  Cantidad: {item.quantity}
                </div>
                <div>
                  Precio: ${item.price}
                </div>
                <div>
                  Subtotal: ${item.price * item.quantity}
                </div>
                <button className='deleteProduct' onClick={() => this.handleRemoveProduct(item.product_id, item.quantity)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
          <div id="totalContainer">
            <p>Total: ${total.toFixed(2)}</p>
            {showGenerateSaleButton && (
              <button id='buttonSale' onClick={this.handleGenerateSale} disabled={total <= 0}>Generar venta</button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ShopCart;
