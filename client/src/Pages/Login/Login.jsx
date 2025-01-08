import { useContext} from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
const Login = () => {
    const [disabled,setDisabled]=useState(true)
const navigate=useNavigate();
const location=useLocation()
const from = location.state?.from?.pathname || '/';
    const{logIn}=useContext(AuthContext)
    const handleLogin=e=>{
        e.preventDefault();
        const form=e.target;
        const email=form.email.value;
        const password=form.password.value;
// console.log(email,password);
logIn(email,password)
.then(result=>{
  const user=result.user;
  console.log(user);
  Swal.fire({
    title: "Logged in successfully",
    showClass: {
      popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `
    },
    hideClass: {
      popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
    }
  })
  navigate(from,{replace:true})
})

    }
    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[])

    const handleValidateCaptcha=(e)=>{
const user_captcha_value=e.target.value;
if (validateCaptcha(user_captcha_value)) {
    alert('Captcha Matched');
    setDisabled(false)
}

else {
    alert('Captcha Does Not Match');
}
    }
    return (
      <>
        <Helmet>
              <title>Bistro Boss | Login</title>
          </Helmet>
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex flex-col md:flex-row">
    <div className="text-center md:w-1/2 lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 md:w-1/2 max-w-sm  shadow-2xl">
    <h1 className='text-2xl font-bold text-center pt-5'>Login</h1>
      <form onSubmit={handleLogin} className="card-body pt-0">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
        
        </div>
        <div className="form-control">
          <label className="label">
          <LoadCanvasTemplate />
          </label>
          <input type="text"  onBlur={handleValidateCaptcha} name="captcha" placeholder="Type the text above" className="input input-bordered" required />
          <button className="btn btn-outline btn-xs">Validate</button>
          
        </div>
        <div className="form-control mt-6">
          <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
        </div>
        <p className='text-red-600'><small>New here? <Link to={'/signup'}>Create a New Account</Link></small></p>
        <SocialLogin/>
      </form>
    </div>
  </div>
</div>
      </>
    );
};

export default Login;