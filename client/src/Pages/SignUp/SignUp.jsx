import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const SignUp = () => {
    const{createUser,updateUserProfile}=useContext(AuthContext)
    const axiosPublic =useAxiosPublic()
    const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit= (data) =>{ 
    console.log(data);
    createUser(data.email,data.password)
    .then(result=>{
        const loggedUser=result.user;
        console.log(loggedUser);
        updateUserProfile(data.name,data.photoURL)
        .then(()=>{
// console.log('profile updated');
//create user entry in db
const userInfo={
  name:data.name,
  email:data.email
}
axiosPublic.post('/users',userInfo)
.then(res=>{
  if(res.data.insertedId){
    console.log('user added to db');
    
    reset(); 

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "User created successfully",
      showConfirmButton: false,
      timer: 1500
    });
    
  navigate('/')
  }
})


        })
        .catch(err=>{
            console.log(err);
            
        })
      })
  }
  return (
    <>
    <Helmet>
        <title>Bistro Boss | SignUp</title>
    </Helmet>
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center md:w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">SignUp now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 md:w-1/2 max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">Name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
             
                placeholder="photo url"
                className="input input-bordered"
                {...register("photoURL", { required: true })}
              />
              {errors.photoURL && (
                <span className="text-red-500 text-sm">Photo URL is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email",{ required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { 
                    required: true,
                    minLength:6, 
                    maxLength: 20 ,
                    pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/
                })}
              />
               {errors.password?.type==='required' && (
                <span className="text-red-500 text-sm">Password is required</span>
              )}
              {errors.password?.type==='minLength' && (
                <span className="text-red-500 text-sm">Password must be 6 characters</span>
              )}
               {errors.password?.type==='maxLength' && (
                <span className="text-red-500 text-sm">Password must be less than 20 characters</span>
              )}
               {errors.password?.type==='pattern' && (
                <span className="text-red-500 text-sm">Password must have one lowerCase & one upperCase & one number & one special character</span>
              )}
              
              
            </div>
            <div className="form-control mt-6">
                <input type="submit" className="btn btn-primary" value="SignUp" />
        <p className='text-red-600 px-6 py-2'><small>Already registered? <Link to={'/login'}>Go to log in</Link></small></p>
<SocialLogin/>
            </div>
          </form>
        </div>
      </div>
    </div>

    </>
  );
};

export default SignUp;
