import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'



import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
const Menu = () => {
    const [menu]=useMenu()
    const desserts = menu.filter(item => item.category === 'dessert')
    const soups= menu.filter(item => item.category === 'soup')
    const pizzas = menu.filter(item => item.category === 'pizza')
    const salads = menu.filter(item => item.category === 'salad')
    const offered = menu.filter(item => item.category === 'offered')
    return (
        <div>
            <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>  

      {/* main cover  */}

      <Cover img={menuImg} title={'our menu'} description={'Would you like to try a dish?'}/>
      <SectionTitle
                
                subHeading="Don't miss"
                heading="Today's offer"
            />
            {/* offered menu items  */}

            <MenuCategory items={offered}/>

            {/* desserts menu items  */}
            <MenuCategory img={dessertImg} items={desserts} title={'dessert'} description={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}/>
  {/* pizzas menu items  */}
  <MenuCategory img={pizzaImg} items={pizzas} title={'pizza'} description={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}/>
  {/* salads menu items  */}
  <MenuCategory img={saladImg} items={salads} title={'salad'} description={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}/>
    {/* soups menu items  */}
    <MenuCategory img={soupImg} items={soups} title={'soup'} description={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}/>
        </div>
    );
};

export default Menu;