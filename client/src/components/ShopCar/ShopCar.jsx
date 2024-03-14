import React from 'react';
import './ShopCar.css';
import axios from 'axios';

class Pruebas extends React.Component {
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

  handleGenerateSale = () => {
    const clientName = prompt("Ingrese el nombre del cliente:");
    const salesmanName = prompt("Ingrese el nombre del vendedor:");
  
    if (clientName === null || clientName === "" || salesmanName === null || salesmanName === "") {
      alert("Debe ingresar un nombre de cliente y un nombre de vendedor válidos.");
      return;
    }
  
    // Guardar los nombres en el estado del componente
    this.setState({
      clientName: clientName,
      salesmanName: salesmanName
    });
    console.log("Nombre del cliente:", clientName);
    console.log("Nombre del vendedor:", salesmanName);
  
    // Generar venta
    const data = { salesInfo: this.props.cartItems, salesman: salesmanName, client: clientName };
    console.log(data)
    axios.post("http://localhost:3900/sales", data)
      .then((response) => {
        alert("respuesta del servidor", response);
      })
      .catch((error) => {
        alert("error del servidor", error);
      });
  };
  

  render() {
    const { cartItems, total } = this.props;
    const { clientName, salesmanName } = this.state;

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
                <div>
                  <strong>{item.name}</strong>
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
                <button className='deleteProduct' onClick={() => this.handleRemoveProduct(item.id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
          <div id="totalContainer">
            <p>Total: ${total.toFixed(2)}</p>
          </div>
          <div>
            <button id='buttonSale' onClick={this.handleGenerateSale}>Generar venta</button>
          </div>
        </div>
        {/* Mostrar la información del cliente y del vendedor */}
        {clientName && salesmanName && (
          <div>
            <p>Información de la venta:</p>
            <p>Cliente: {clientName}</p>
            <p>Vendedor: {salesmanName}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Pruebas;
