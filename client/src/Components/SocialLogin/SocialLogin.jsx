import { FaGoogle } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {googleLogIn}=UseAuth()
    const axiosPublic =useAxiosPublic()
    const navigate=useNavigate()
    const handleGoogleLogIn=()=>{
        googleLogIn()
        .then(res=>{
            console.log(res.user);
            const userInfo={
                email:res.user?.email,
                name:res.user?.displayName,

            }
            axiosPublic.post('/users',userInfo)
            .then(res=>{
                console.log(res.data);
                navigate('/')
            })
        })
    }
    return (
        <div className="p-2">
            <div className="divider"></div>
          <div>
          <button onClick={handleGoogleLogIn} className="btn btn-outline">
 <FaGoogle/>
  Google
</button>
</div>  
        </div>
    );
};

export default SocialLogin;