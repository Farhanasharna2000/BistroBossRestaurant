import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const MenuCategory = ({items,title,img,description}) => {
 


    return (
        <div className="pb-16">
                { title && <Cover img={img} title={title} description={description}/>}
        <div className="grid md:grid-cols-2 gap-10 mt-16">
                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className="text-center">
<Link to={`/order/${title}`}>

<button className="btn btn-outline border-0 border-b-2 mt-6 uppercase">Order Your Favourite Food</button>
</Link>
</div>
        </div>
    );
};

export default MenuCategory;