// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; 

// Import required modules
import { Pagination, Autoplay,FreeMode } from 'swiper/modules'; 

import slide1 from '../../../assets/home/slide1.jpg';
import slide2 from '../../../assets/home/slide2.jpg';
import slide3 from '../../../assets/home/slide3.jpg';
import slide4 from '../../../assets/home/slide4.jpg';
import slide5 from '../../../assets/home/slide5.jpg';

import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <section>
            <SectionTitle 
                subHeading="From 11.00am to 10.00pm" 
                heading="Order Online" 
            />
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                freeMode={true}
                centeredSlides={true}
                autoplay={{
                    delay: 3000, 
                    disableOnInteraction: false, 
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Autoplay,FreeMode]} 
                className="mySwiper "
            >
                <SwiperSlide>
                    <img src={slide1} alt="" />
                    <h2 className='text-4xl text-center text-white uppercase -mt-16 pb-16'>Salads</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2} alt="" />
                    <h2 className='text-4xl text-center text-white uppercase -mt-16'>Pizzas</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide3} alt="" />
                    <h2 className='text-4xl text-center text-white uppercase -mt-16'>Soups</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide4} alt="" />
                    <h2 className='text-4xl text-center text-white uppercase -mt-16'>Desserts</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide5} alt="" />
                    <h2 className='text-4xl text-center text-white uppercase -mt-16'>Salads</h2>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Category;
