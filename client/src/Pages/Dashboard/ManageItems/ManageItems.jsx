import { RiDeleteBinLine } from "react-icons/ri";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import { FaEdit } from "react-icons/fa";

const ManageItems = () => {
    const [menu] = useMenu()
    return (
        <div>
            <SectionTitle
                subHeading="Hurry Up!"
                heading="MANAGE ALL ITEMS"
            />
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>ITEM IMAGE</th>
                            <th>ITEM NAME</th>
                            <th>PRICE</th>
                            <th>Update</th>
                            <th>Delete</th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((item, index) =>

                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {item.name}

                                    </td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button

                                            className="btn btn-ghost btn-lg text-[#B91C1C]"><FaEdit /></button>
                                    </td>
                                    <td>
                                        <button

                                            className="btn btn-ghost btn-lg text-[#B91C1C]"><RiDeleteBinLine /></button>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItems;