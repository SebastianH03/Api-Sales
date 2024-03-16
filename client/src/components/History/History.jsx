import React, { useState, useEffect } from 'react';
import './History.css';
import Card from './../Card/Card'; 
import Navbar from './../Navbar/Navbar.jsx';
import axios from 'axios';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      try {
        const response = await axios.get('http://localhost:3900/history/');
        setHistory(response.data);
      } catch (error) {
        console.error('Error al cargar el historial:', error.message);
      }
    }

    loadHistory();
  }, []); 

  return (
    <div className='divGeneral'>
      <Navbar />
      <div className='Titulo-container'>
        <h1 id='titleHistory'>Historial</h1>
      </div>
      <div className="history-container">
        <div className="card-container">
          {history.map((item, index) => (
            <Card
              key={index}
              date={item.date}
              event={item.action}
              coleccion={item.collection}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;
