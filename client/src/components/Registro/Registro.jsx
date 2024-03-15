import React, {useState} from "react";
import './Registro.css'
import logoRegister from '../logoXYZ.png'
import firebaseApp from '../../credenciales.js';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

const auth = getAuth(firebaseApp);


function Registro(){
  const [mensaje, setMensaje] = useState("")
  async function pulsar(e){
    e.preventDefault();
    const nombre = e.target.nombre.value
    const correo = e.target.correoUser.value;
    const contra = e.target.contraUser.value;
    const contraV = e.target.contraUserV.value
    if (nombre.length === 0 || correo.length == 0 || contra.length == 0 || contraV.length == 0 ){
      setMensaje("Complete todos los campos")
    }
    if(contra !== contraV){
      setMensaje("Las contraseñas no coinciden")
    }
    if (!correo.includes("@gmail.com") && (!correo.includes("@hotmail.com")))  {
      setMensaje("correo invalido")
    }
    if (contra.length < 6){
      setMensaje("contraseña minimo 6 caracteres")
    }
    const usuario = await createUserWithEmailAndPassword(auth, correo, contra).catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      if ( errorCode === 'auth/email-already-in-use' ){
        setMensaje("Ya existe una cuenta con este correo")
      }
    })
  }
  const [showPass, setShowPass] = useState(false);

  return<div className='Registro'>
    <div class='title'>
      <img src={logoRegister} alt= "logo" className='logoRegister'/>{} 
    </div>
    <form onSubmit={pulsar} id='divForm'>
      <label>
        <i class="fa-solid fa-user"></i>
        <input className="textInput" placeholder="nombre"type="text" id="nombre"></input>
      </label>
      <label>
        <i class="fa-solid fa-envelope"></i>
        <input className="textInput" placeholder="correo electronico"type="text" id="correoUser"></input>
      </label>
      <label>
        <i class="fa-sharp fa-solid fa-unlock"></i>
        <input className="textInput" placeholder="contraseña" type={showPass ? "text" : 'password'} id="contraUser"></input>
        {showPass ? <i class="fa-solid fa-eye" id='eye' onClick={()=> setShowPass(!showPass)}></i> : <i class="fa-sharp fa-solid fa-eye-slash" id='eye' onClick={()=> setShowPass(!showPass)}></i> }
      </label>
      <label>
        <i class="fa-sharp fa-solid fa-lock"></i>
        <input className="textInput" placeholder="confirmas contraseña"type={showPass ? "text" : 'password'} id="contraUserV"></input>
        {showPass ? <i class="fa-solid fa-eye" id='eye' onClick={()=> setShowPass(!showPass)}></i> : <i class="fa-sharp fa-solid fa-eye-slash" id='eye' onClick={()=> setShowPass(!showPass)}></i> }
      </label>
      <label>
        <i class="fa-solid fa-address-book" id="rolUser"></i>
        <input className="textInput" placeholder="role"></input>
      </label>
      <p>{mensaje}</p>
      <a href='/' class="link">cancelar</a>
        <float href='/Registro' class="link">¿Ya tienes cuenta?</float>  <a href='/IniciarSesion' class="link">Iniciar sesion</a> 
        <button id="button" >Crear cuenta</button>
    </form>
  </div>
}


export default Registro;