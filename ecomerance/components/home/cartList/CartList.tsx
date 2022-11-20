import Link from "next/link";
import { type } from "os";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { appendCart, deleteFromCart } from "../../../redux/cart";
import { useAppSelector } from "../../../redux/hooks";
import CartIteam from "./components/CartItem";

type props = {
  Animationend: () => void;
  setcartListAnimation: (v: string) => void;
  cartListAnimation: string;
};
const CartList = ({
  Animationend,
  setcartListAnimation,
  cartListAnimation,
}: props) => {
  const cart = useAppSelector((state) => state.cart.value);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="bg-black bg-opacity-60 w-full h-full fixed top-0 right-0 z-30 flex justify-end">
      <div
        onAnimationEnd={Animationend}
        className={`bg-gray-100 shadow-xl border-[1px] border-gray-100 drop-shadow-xl  z-30  w-[350px] h-screen  origin-right ${cartListAnimation}`}
      >
        <div className="flex items-center justify-between p-4 border-b-2 bg-white border-gray-300">
          <div
            onClick={() => setcartListAnimation("animate-growright")}
            className="rounded-full flex justify-center items-center m-2 bg-gradient-to-r from-purple-600 to-pink-400  hover:from-red-400 hover:to-red-400 cursor-pointer w-8 h-8 drop-shadow-xl text-white"
          >
            <i className="fa-regular fa-xmark"></i>
          </div>
          <div className="font-semibold drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
            <i className="fa-solid fa-cart-plus m-2 text-lg "></i>
            {Object.keys(cart).length > 1
              ? `${Object.keys(cart).length} items`
              : `${Object.keys(cart).length} item`}
          </div>
        </div>
        <div className="overflow-y-scroll h-[calc(100%-160px)] scrollbar-thin">
          {Object.values(cart).map((item) => (
            <div key={item.product._id}>
              <CartIteam item={item} />
            </div>
          ))}
        </div>
        <Link href={"/checkout"}>
          <div className=" drop-shadow-2xl cursor-pointer transition duration-75 hover:to-pink-500 select-none bg-gradient-to-r from from-purple-700 to-pink-400 p-1 rounded-full mx-4 flex justify-between ">
            <div className="p-2 font-semibold text-white">Checkout</div>
            <div className="bg-white p-2 px-4 rounded-full ">
              <div className="text-zinc-800">
                $
                {Object.values(cart).reduce(
                  (previousValue, currentValue, currentIndex, array) =>
                    currentValue.count * currentValue.product.price +
                    previousValue,
                  0
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CartList;
