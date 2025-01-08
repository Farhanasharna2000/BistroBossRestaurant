import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseCart from "../../Hooks/UseCart";
const FoodCard = ({ item }) => {
  const { name, recipe, image, price, _id } = item
  const { user } = UseAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const axiosSecure = UseAxiosSecure()
  const [, refetch] = UseCart()

  const handleAddToCart = () => {
    if (user && user.email) {
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        price,
        image,
      }
      //send cart item to db
      axiosSecure.post('/carts', cartItem)
        .then(res => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${name} added to your cart`,
              showConfirmButton: false,
              timer: 1500
            });
            //refetch cart to update cart items count
            refetch()
          }
        })
    }
    else {
      Swal.fire({
        title: "You are not logged in?",
        text: "Please login add to the cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!"
      }).then((result) => {
        if (result.isConfirmed) {
          //send user to login page
          navigate('/login', { state: { from: location } })
        }
      });
    }

  }
  return (
    <div className="card  rounded-none bg-[#F3F3F3] shadow-xl">
      <figure>
        <img
          className=" w-full"
          src={image}
          alt="" />
      </figure>
      <p className="bg-slate-900 text-white absolute right-0 mr-5 mt-4 px-3 py-1">${price}</p>
      <div className="card-body  ">
        <h2 className="card-title justify-center">{name}</h2>
        <p className="text-center">{recipe}</p>
        <div className="card-actions justify-center">
          <button
            onClick={handleAddToCart}
            className="btn btn-outline border-0 border-b-2 bg-[#E8E8E8] border-b-[#BB8506] hover:text-[#BB8506] mt-6 uppercase text-[#BB8506]">add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;