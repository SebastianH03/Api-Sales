import React, { useState, useEffect } from 'react';
import './ventas.css';
import Card from '../CardSale/CardSale.jsx'; // Asegúrate de importar el componente
import Navbar from '../Navbar/Navbar.jsx';
import axios from 'axios';

function History() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      try {
        const response = await axios.get('http://localhost:3900/sales/');
        setSales(response.data.sale);
      } catch (error) {
        console.error('Error al cargar el historial:', error.message);
      }
    }

    loadHistory();
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div className='divGeneral'>
      <Navbar />
      <div className='Titulo-container'>
        <h1 id='titleHistory'>Ventas</h1>
      </div>
      <div className='Load-container'>
        {/* <button id='Load' onClick={loadHistory}>Load</button> */}
      </div>
      <div className="history-container">
        <div className="card-container">
          {sales.map((item, index) => (
            <Card
              key={index}
              date={item.date}
              event={item.client}
              coleccion={item.salesman}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;
