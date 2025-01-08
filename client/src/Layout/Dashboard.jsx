import { NavLink, Outlet } from "react-router-dom";
import { GrCart } from "react-icons/gr";
import { TiHomeOutline } from "react-icons/ti";
import { FaBook, FaCalendarAlt, FaList, FaUsers, FaUtensils } from "react-icons/fa";
import { PiCalendarCheckFill } from "react-icons/pi";
import { MdReviews } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { GiShoppingBag } from "react-icons/gi";
import { IoMdMail } from "react-icons/io";
import UseCart from "../Hooks/UseCart";
import UseAdmins from "../Hooks/UseAdmins";
const Dashboard = () => {
    const [cart] = UseCart()
    const [isAdmin ]= UseAdmins();
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-[#D1A054]">
                <ul className="menu p-4">
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to={'/dashboard/adminHome'}>
                                        <TiHomeOutline />

                                       Admin Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/addItems'}>
                                    <FaUtensils />

                                        Add Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/manageItems'}>
                                    <FaList />

                                        Manage Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/manageBookings'}>
                                        <FaBook/>

                                        Manage bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/allUsers'}>
                                    <FaUsers />

                                        All Users
                                    </NavLink>
                                </li>
                               
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to={'/dashboard/userHome'}>
                                        <TiHomeOutline />

                                        User Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/reservation'}>
                                        <FaCalendarAlt />

                                        Reservation
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/cart'}>
                                        <GrCart />

                                        My Cart ({cart.length})
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/review'}>
                                        <MdReviews />

                                        Add review
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/booking'}>
                                        <PiCalendarCheckFill />

                                        My booking
                                    </NavLink>
                                </li>
                            </>
                    }

                    {/* shared navlinks  */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to={'/'}>
                            <TiHomeOutline />

                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/menu'}>
                            <IoMenu />

                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/order/salad'}>
                            <GiShoppingBag />

                            Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/contact'}>
                            <IoMdMail />

                            Contact
                        </NavLink>
                    </li>

                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;