import type { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/general/Navbar";
import FilterCard from "../components/home/FilterCard";
import Headder from "../components/home/Headder";
import ProductsList from "../components/home/products/ProductsList";
import { storeWrapper } from "../redux/store";
import { setUserInfo } from "../redux/userInfo";

export const getServerSideProps = storeWrapper.getServerSideProps(
  (store) => async (context) => {
    // Fetch data from external API
    // const agent = new https.Agent({
    //   rejectUnauthorized: false,
    // });

      let userInfo = await fetch(
        `${process.env.NEXT_PUBLIC_SERVERURL}/api/getUserInfo`,
        {
          method: "GET",
          headers: { cookie: context.req.headers.cookie as string },
          credentials: "include",
          // agent
        }
      );
      if (userInfo.ok) {
        userInfo = await userInfo.json();
      } else {
        userInfo = JSON.parse(await userInfo.text());
      }
      console.log("index fetch");
      store.dispatch(setUserInfo(userInfo));
    

    const Products = await fetch(
      `${process.env.NEXT_PUBLIC_SERVERURL}/api/getProducts?page=1&limit=20`
      // { agent }
    );
    const products = await Products.json();
    const Shops = await fetch(
      `${process.env.NEXT_PUBLIC_SERVERURL}/api/getShops`
      // { agent }
    );
    const shops = await Shops.json();
    // Pass data to the page via props
    return { props: { products, shops, userInfo } };
  }
);

const Home: NextPage = ({ products, shops, userInfo }: any) => {
  return (
    <div>
      <Navbar />
      <div className="mt-[100px]">
        <Headder />
        <FilterCard shops={shops} />
        <ProductsList products={products} />
      </div>
    </div>
  );
};

export default Home;
