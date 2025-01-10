import { NavLink } from "react-router-dom";
import logo from '../../../assets/others/Group 1.png'
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { IoMdContact } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import UseCart from "../../../Hooks/UseCart";
import UseAdmins from "../../../Hooks/UseAdmins";
const Navbar = () => {
    const {user,logOut}=useContext(AuthContext)
    const [cart]=UseCart()
    const [isAdmin]=UseAdmins()
    const handleLogOut=()=>{
        logOut()
        .then(()=>{
           
          })
          .catch(err=>{
            console.log(err);
            
          })
    }
    const links =
        <>

            <li>
                <NavLink
                    className={({ isActive }) =>
                        `font-extrabold  ${isActive ?
                            " text-yellow-500 " :
                            
                            " text-white"}`
                    }
                    to="/"
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                     className={({ isActive }) =>
                        `font-extrabold  ${isActive ?
                            " text-yellow-500 " :
                            
                            " text-white"}`
                    }
                    to="/contact"
                >
                    Contact Us
                </NavLink>
            </li>
         
            <li>
                <NavLink
                     className={({ isActive }) =>
                        `font-extrabold  ${isActive ?
                            " text-yellow-500 " :
                            
                            " text-white"}`
                    }
                    to="/menu"
                >
                    Our Menu
                </NavLink>
            </li>
            <li>
                <NavLink
                     className={({ isActive }) =>
                        `font-extrabold  ${isActive ?
                            " text-yellow-500 " :
                            
                            " text-white"}`
                    }
                    to="/order/salad"
                >
                    Order Food
                </NavLink>
            </li>
            {
            // user ? 'true': 'false'
            // user ? condition ? 'double true' : 'one true' : 'false' 
        }
        {
            user && isAdmin && 
            <li>
                <NavLink className={({ isActive }) =>
                `font-extrabold  ${isActive ?
                    " text-yellow-500 " :        
                    " text-white"}`
            } to="/dashboard/adminHome" >Dashboard</NavLink>
            </li>
        }
        {
            user && !isAdmin && 
            <li>
                <NavLink className={({ isActive }) =>
                `font-extrabold  ${isActive ?
                    " text-yellow-500 " :
                    
                    " text-white"}`
            } to="/dashboard/userHome">Dashboard</NavLink>
            </li>
        }
            <li>
                <NavLink
                   
                    to="/dashboard/cart"
                >
                 <button className="flex justify-center items-center text-white gap-2 ">
                 <IoCartOutline className="text-xl" />
  <div className="badge badge-secondary">+{cart.length}</div>
</button>
                </NavLink>
            </li>
            {
                user?
                <>
                <button onClick={handleLogOut} className="text-white font-bold mx-2">LogOut</button>
                <img referrerPolicy="no-referrer" className="w-8 h-8 rounded-full"  src={user?.photoURL}alt="" />
                </>
                :
                <li>
                <NavLink
                     className={({ isActive }) =>
                        `font-extrabold  ${isActive ?
                            " text-yellow-500 " :
                            
                            " text-white"}`
                    }
                    to="/login"
                >
                    Login <span className="text-xl"><IoMdContact/></span>
                </NavLink>
            </li>
            }

        </>
    return (
        <>
            <div className="navbar max-w-screen-xl fixed z-10 bg-opacity-30 bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <img  className="w-40 ml-6" src={logo} alt="" />
                </div>
               
                <div className="navbar-end">
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;