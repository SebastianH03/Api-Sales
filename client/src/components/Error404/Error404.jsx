import './Error404.css';

function Error404(){
  return(
    <div className="divError">
      <div className="iconError">
        <i class="fa-regular fa-face-frown"></i>
      </div>
      <h1 id="number">404</h1>
      <h1 id="error">Page not found  </h1>
      <h1 id="page"> the page you are looking for doesnt exist</h1>
      <a href='/' id="home">Go to home</a> 
    </div>
    
  )
}

export default Error404;