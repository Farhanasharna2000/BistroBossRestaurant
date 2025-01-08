import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import icon from '../../../assets/home/Group.png'

// import required modules
import { Navigation } from 'swiper/modules';
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
       const [reviews,setReviews]=useState([])
        useEffect(()=>{
    fetch('http://localhost:4000/reviews')
    .then(res=>res.json())
    .then(data=>{
        setReviews(data)})
        },[])
    return (
        <section className="mb-20">
              <SectionTitle 
                subHeading="What Our Clients Say" 
                heading="TESTIMONIALS" 
            /> 
             <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
       {
        reviews.map(review=>
        <SwiperSlide key={review._id}>
           <div className="mx-24  flex flex-col items-center ">
           <Rating
      style={{ maxWidth: 180 }}
      value={review.rating}
      readOnly
    />
    <img className="w-14 py-4" src={icon} alt="" />
            <p>{review.details}</p>
            <h3 className="text-2xl text-[#CD9003]">{review.name}</h3>
           </div>
            </SwiperSlide>

        )
       }
      </Swiper>
        </section>
    );
};

export default Testimonials;