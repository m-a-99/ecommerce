import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { appendCart, deleteFromCart } from "../../../../../redux/cart";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { RootState } from "../../../../../redux/store";
import FlyImg from "./components/FlyImg";

type props = {
  product: {
    _id: string;
    name: string;
    desc: string;
    sale: string;
    rate: string;
    sku: string;
    img: string;
    product_category_id: string;
    price: number;
    __v: string;
    createdAt: Date;
    updatedAt: string;
  };
};
const Product = ({ product }: props) => {
  const [wished, setwished] = useState(false);
  const [visable, setvisable] = useState(false);

  const AddedCount = useAppSelector(
    (state) => state.cart.value[product._id]?.count||0
  );

  const count = useAppSelector((state: RootState) => state.cart.value);
  const dispatch = useAppDispatch();

  function add() {
    setvisable(true);
    dispatch(appendCart(product));
  }
  function Animationend() {
    setvisable(false);
  }

  function addmore() {
    dispatch(appendCart(product));
  }
  function remove() {
    dispatch(deleteFromCart(product));
  }

  return (
    <>
      {visable && <FlyImg imgsrc={product.img} Animationend={Animationend} />}
      <div className="w-full bg-white  h-full drop-shadow-sm rounded-2xl shadow-xl  transition  md:lg:hover:scale-105 lg:hover:scale-105">
        <div className="-top-16 w-11/12 relative rounded-lg left-1/2 transform -translate-x-1/2 drop-shadow-lg">
          <div className="absolute w-full flex justify-between  z-10 ">
            <div className="text-[14px] h-6 font-medium bg-blacktrans drop-shadow-lg  text-white flex justify-center items-center w-20 rounded-full m-1 bg-opacity-80">
              Sale {product.sale}%
            </div>

            {!wished && (
              <div
                onClick={() => setwished((w) => !w)}
                className=" cursor-pointer  shadow-lg w-10 mr-1 h-10 flex justify-center items-center  rounded-full bg-white drop-shadow-lg"
              >
                <i className="fat text-xl mt-1 transition ease-out duration-75  fa-heart text-gray-600"></i>
              </div>
            )}
            {wished && (
              <div
                onClick={() => setwished((w) => !w)}
                className=" bg-red-100 shadow-red-300  cursor-pointer shadow-lg w-10 mr-1 h-10 flex justify-center items-center  rounded-full drop-shadow-lg"
              >
                <i className="fas text-xl mt-1 transition ease-in duration-75 fa-heart text-rose-500"></i>
              </div>
            )}
          </div>
          <Image
            src={product.img}
            width="100%"
            height="70%"
            layout="responsive"
            className="rounded-2xl"
            priority
          />
        </div>
        <div className="px-3 text-lg -mt-12 flex justify-between">
          <h2 className=" font-bold ">{product.name}</h2>
          <div className="text-[16px] flex items-center">
            <i className="fa-solid fa-star text-yellow-300"></i>
            <span>{product.rate}</span>
          </div>
        </div>
        <h4 className="px-3 m-1 text-sm text-gray-400">{product.desc}</h4>
        <div className="p-3 flex justify-between">
          <div className="font-extrabold text-lg mt-2">$ {product.price}</div>

          {AddedCount === 0 && (
            <div
              onClick={add}
              className="bg-zinc-600 p-2 select-none hover:bg-zinc-700  text-[14px] font-bold rounded-lg text-white cursor-pointer"
            >
              Add +
            </div>
          )}

          {AddedCount > 0 && (
            <div className="bg-zinc-600 select-none hover:bg-zinc-700  text-[14px] font-bold rounded-lg text-white cursor-pointer">
              <div className="flex h-full ">
                <div
                  onClick={remove}
                  className=" rounded-tl-lg rounded-bl-lg px-2 h-full flex items-center hover:bg-zinc-500"
                >
                  -
                </div>
                <div className="px-2 flex items-center">{AddedCount}</div>
                <div
                  onClick={addmore}
                  className="rounded-tr-lg rounded-br-lg px-2 h-full flex items-center hover:bg-zinc-500"
                >
                  +
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
