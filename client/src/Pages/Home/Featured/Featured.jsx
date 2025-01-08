import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import '../Featured/Featured.css'
const Featured = () => {
    return (
        <div className="featured-item bg-fixed bg-blend-overlay bg-black/30 mb-12 pt-5 text-white">
            <SectionTitle
                subHeading="Check it out" 
                heading="From our menu" 
            />  
            <div className="md:flex justify-center items-center pb-12 px-36   ">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10 text-white space-y-2">
                    <p>March 20, 2025</p>
                    <p>WHERE CAN I GET SOME?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    <button className="btn btn-outline border-0 border-b-2 text-white">Order Now</button>
                </div>
                </div> 
        </div>
    );
};

export default Featured;