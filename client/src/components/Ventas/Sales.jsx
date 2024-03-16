import React, { useState, useEffect } from 'react';
import './Sales.css';
import Card from '../CardSale/CardSale.jsx'; 
import Navbar from '../Navbar/Navbar.jsx';
import axios from 'axios';

function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    async function loadSales() {
      try {
        const response = await axios.get('http://localhost:3900/sales/');
        setSales(response.data.sale);
      } catch (error) {
        console.error('Error al cargar las ventas:', error.message);
      }
    }

    loadSales();
  }, []);
  return (
    <div className='divGeneral'>
      <Navbar />
      <div className='Titulo-container'>
        <h1 id='titleSales'>Ventas</h1>
      </div>
      <div className="sales-container">
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

export default Sales;
