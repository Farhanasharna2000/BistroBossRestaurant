import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import orderCoverImg from "../../assets/shop/banner2.jpg";
import Cover from "../Shared/Cover/Cover";
// import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import useMenu from "../../Hooks/useMenu";
import './Order.css'
import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Order = () => {
    const categories=['salad','pizza','soup','dessert','drinks']
    const {category}=useParams()
    const initialIndex=categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const soups = menu.filter((item) => item.category === "soup");
  const pizzas = menu.filter((item) => item.category === "pizza");
  const salads = menu.filter((item) => item.category === "salad");
  const drinks = menu.filter((item) => item.category === "drinks");

  return (
    <div>
          <Helmet>
                <title>Bistro Boss | Order Food</title>
              </Helmet> 
      <Cover
        img={orderCoverImg}
        title={"Order Food"}
        description={"Would you like to try a dish?"}
      />
      <Tabs
        defaultIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
        className="py-12"
      >
        <TabList className="custom-tablist  mb-4">
          <Tab
            className={`custom-tab uppercase ${tabIndex === 0 ? "active" : ""}`}
          >
            salad
          </Tab>
          <Tab
            className={`custom-tab uppercase ${tabIndex === 1 ? "active" : ""}`}
          >
            pizza
          </Tab>
          <Tab
            className={`custom-tab uppercase ${tabIndex === 2 ? "active" : ""}`}
          >
            soups
          </Tab>
          <Tab
            className={`custom-tab uppercase ${tabIndex === 3 ? "active" : ""}`}
          >
            desserts
          </Tab>
          <Tab
            className={`custom-tab uppercase ${tabIndex === 4 ? "active" : ""}`}
          >
            drinks
          </Tab>
        </TabList>

        <TabPanel>
          <OrderTab items={salads}/>
        </TabPanel>
        <TabPanel>
          <OrderTab items={pizzas}/>
        </TabPanel>
        <TabPanel>
        <OrderTab items={soups}/>
        </TabPanel>
        <TabPanel>
        <OrderTab items={desserts}/>
        </TabPanel>
        <TabPanel>
        <OrderTab items={drinks}/>

        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
