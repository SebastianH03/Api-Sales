import React from 'react'
import styled from 'styled-components'
import logo from '../logoXYZ.png';


function Navbar() {
  return (
    <>
      <Navb2>
        <LogoAndName>
          <a href="/"><img src={logo} alt= "logo" /></a> 
          <Name>XYZ</Name>
          <Name2>LTDA.</Name2>
        </LogoAndName>
        <Nav>
          <a href='/historial'>Historial</a>
          <a href='/ventas'>Ventas</a>
          <a href='/Proveedores'>Proveedores</a>
          <a href='/iniciarSesion'>Iniciar sesion</a>
        </Nav>
      </Navb2>

    </>
  )
}

const Navb2 = styled.nav`
  display: flex;
  justify-content: flex-start;
  padding: .4r;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img{
    height: 90px;
    cursor: pointer;
    transition: 0.7s;
  }
  img:hover{
    -webkit-transform:scale(1.35);transform:scale(1.35)
    border: 5px dotted green;
  }
`;
const LogoAndName = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.div`
  
  color: black;
  font-family: 'Muli', sans-serif;
  font-weight: 700;
  font-size: 25px;
  margin-right: 10px;
`;

const Name2 = styled.div`
  color: black;
  font-family: 'Muli', sans-serif;
  font-size: 25px;
`;

const Nav = styled.nav`


a{
  position: relative;
  text-decoration: none;
  font-family: 'Poppins',sans-serif;
  color: #a0a0a0;
  font-size: 18px;
  letter-spacing: 0.5px;
  padding: 0 25px;
  transition: 0.7s;
}
a:after{
  content: "";
  position: absolute;
  background-color: #043F6A;
  height: 3px;
  width: 0;
  left: 0;
  bottom: -10px;
  transition: 0.3s;
}
a:hover{
  color: #043F6A;
  font-size: 22px;
}
a:hover:after{
  width: 99%;
}
`
export default Navbar