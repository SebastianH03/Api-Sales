import './IniciarSesion.css'
import logo from '../logoXYZ.png';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import firebaseApp from '../../credenciales.js'
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect} from "firebase/auth";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();


function IniciarSesion(){
  const [showPass, setShowPass] = useState(false);
  const [mensaje, setMensaje] = useState("")
  const navigate = useNavigate();
  async function iniciar(e) {
    e.preventDefault();
    const correo = e.target.correo.value;
    const contra = e.target.contra.value;
    if (contra.length < 6){
      setMensaje("contraseña minimo 6 caracteres")
    }
    else if (!correo.includes("@gmail.com") && (!correo.includes("@hotmail.com")))  {
      setMensaje("correo invalido")
    }
    const logueo = await signInWithEmailAndPassword(auth, correo, contra).catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      if ( errorCode === 'auth/wrong-password' ){
        setMensaje("contraseña incorrecta, intente de nuevo")
      }
    })
    if (logueo.user =! null){
      navigate("/");
    }
  }

  const singUpGoogle = ()=>{
    console.log("te has logueado con Google");
    signInWithRedirect(auth, googleProvider);
  }
  return<div className='Login'>
    <div>
      <img src={logo} alt= "logo" className='logo'/>{} 
      </div>
    <form onSubmit={iniciar} id='divForm'>
      <label>
        <i class="fa-solid fa-envelope" id='correoI'></i>
        <input placeholder="correo"type="text" id="correo" ></input>
      </label>
      <label>
        <i class="fa-solid fa-lock"></i>
        <input placeholder="contraseña" type={showPass ? "text" : 'password'} id="contra"></input>
        {showPass ? <i class="fa-solid fa-eye" id='eye' onClick={()=> setShowPass(!showPass)}></i> : <i class="fa-sharp fa-solid fa-eye-slash" id='eye' onClick={()=> setShowPass(!showPass)}></i> }
      </label>
      <p>{mensaje}</p>
      <a href='#' class="link">¿Has olvidado tu contraseña?</a>
      <div >
        <a href='/Registro' class="link">Crear cuenta</a>  <a href='/' class="link">Cancelar</a>
      </div>
      <div id='googleDiv'>
        <i class="fa-brands fa-google" id='googleButton' onClick={singUpGoogle}></i>
        
      </div>
      <button id="button">Iniciar sesion</button>
    </form>
  </div>
}


export default IniciarSesion;