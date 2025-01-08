
import { useForm } from 'react-hook-form';
import SectionTitle from './../../../Components/SectionTitle/SectionTitle';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { FaUtensils } from 'react-icons/fa';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
const img_hosting_key=import.meta.env.VITE_IMAGE_HOSTING_KEY
const img_hosting_api=`https://api.imgbb.com/1/upload?&key=${img_hosting_key}`
const AddItems = () => {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm()
    const axiosPublic=useAxiosPublic()
    const axiosSecure=UseAxiosSecure()
    const onSubmit = async(data) => {
        console.log(data)
        //img upload to imgbb then get url
        const imgFile={image:data.image[0]}
       const res=await axiosPublic.post(img_hosting_api,imgFile,{
        headers:{
            'content-type':'multipart/form-data'
        }
       })
       if(res.data.success){
        //send menu item to the server with img url
        const menuItem={
            name:data.name,
            category:data.category,
            price:parseFloat(data.price),
            recipe:data.recipe,
            image:res.data.data.display_url

        }
       const menuRes=await axiosSecure.post('/menu',menuItem)
       console.log(menuRes.data);
if(menuRes.data.insertedId){
    reset()
    //show popup
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.name}  is added to the menu`,
        showConfirmButton: false,
        timer: 1500
      });
}
       }
       console.log('with imgurl',res.data);
    }
    return (
        <div>
            <SectionTitle
                subHeading="What's new?"
                heading="ADD AN ITEM"
            />
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input
                            {...register("name", { required: true })}
                            type="text" placeholder="Recipe Name" className="input input-bordered w-full " />

                    </div>
                    <div className='flex items-center gap-3  '>
                        <div className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <select
                            defaultValue="default"
                                {...register("category",{ required: true})}
                                className="select select-bordered w-full ">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soups">Soups</option>
                                <option value="desserts">Desserts</option>
                                <option value="drinks">Drinks</option>


                            </select>
                        </div>
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input
                                {...register("price",{ required: true})}
                                type="number" placeholder="Price" className="input input-bordered w-full " />

                        </div>
                    </div>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details*</span>

                        </div>
                        <textarea  {...register("recipe",{ required: true})}

                            className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>

                    </label>
                    <div className='form-control w-full my-4'>
                        <input
                            {...register("image",{ required: true})}
                            type="file" className="file-input w-full max-w-xs" />
                    </div>
                    <button className="btn btn-outline">
                        Add item <FaUtensils />
                    </button>
                    {/* <input type="submit" /> */}
                </form>
            </div>
        </div>
    );
};

export default AddItems;