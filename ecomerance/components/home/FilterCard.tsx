import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import CartList from "./cartList/CartList";

type props = {
  shops: [
    {
      _id: string;
      name: string;
      desc: string;
      icon: string;
      iconType: string;
    }
  ];
};
const FilterCard = ({ shops:categories }: props) => {
  const [cartlist, setcartlist] = useState(false);
  const [cartListAnimation, setcartListAnimation] =useState("animate-growleft");
  const [Categoriesmount, setCategoriesmount] = useState(false);
  const [Categoriesdown, setCategoriesdown] = useState(false);
  const mouseovercategory = useRef(false);
  const cart=useAppSelector(state=>state.cart.value)

  function cat() {
    if (!mouseovercategory.current) setCategoriesdown(false);
  }
  useEffect(() => {
    window.addEventListener("click", cat);
    return () => {
      window.removeEventListener("click", cat);
    };
  }, []);

  function Animationend() {
    if (cartListAnimation === "animate-growright") {
      setcartlist(false);
      setcartListAnimation("animate-growleft");
    }
  }

  function CategoriesAnimationEnd() {
    if (!Categoriesdown) {
      setCategoriesmount(false);
      setCategoriesdown(false);
    }
  }

  return (
    <>
      {cartlist && (
        <CartList
          Animationend={Animationend}
          setcartListAnimation={setcartListAnimation}
          cartListAnimation={cartListAnimation}
        />
      )}
      <div className="bg-gray-50 py-5 px-10 md:px-20 lg:px-24 flex items-center justify-between max-h-16 sticky top-[74px] md:top-[80px] lg:top-[80px] z-20 drop-shadow-sm">
        <div
          onMouseOver={() => {
            mouseovercategory.current = true;
          }}
          onMouseLeave={() => {
            mouseovercategory.current = false;
          }}
          className=" relative"
        >
          <div
            onClick={() => {
              setCategoriesdown((v) => !v);
              setCategoriesmount(true);
            }}
            className="  hover:bg-gray-300 select-none cursor-pointer font-semibold flex items-center justify-center border-[1px]  rounded-md space-x-2 py-2 px-3 "
          >
            <i className="fa-regular fa-filter"></i>
            <span className="hidden lg:block md:block">Categories</span>
          </div>
          {Categoriesmount && (
            <>
              {/* categories button + */}
              <div
                onAnimationEnd={CategoriesAnimationEnd}
                className={`${
                  Categoriesdown ? "animate-growdown" : "animate-growup"
                } absolute bg-white  rounded-md border-[1px] animate-grow origin-top border-gray-300 top-12 p-5 drop-shadow-xl  whitespace-nowrap `}
              >
                {/*categories button - */}
                {/* categories list + */}
                <ul className="text-gray-800 space-y-2 font-semibold">
                  {categories &&
                    categories.map((v) => (
                      <li
                        key={v._id}
                        className="flex space-x-2 cursor-pointer select-none hover:bg-gray-200 p-2"
                      >
                        <div className="w-5  text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to bg-pink-500">
                          <i className={`fas ${v.icon}`}></i>
                        </div>

                        <div>
                          {v.name.charAt(0).toUpperCase() + v.name.substring(1)}
                        </div>
                      </li>
                    ))}
                </ul>
                {/* categories list - */}
              </div>
            </>
          )}
        </div>
        {/* filter card + */}
        <div className=" select-none flex space-x-2 md:space-x-5 lg:space-x-5 items-center ">
          <div className="cursor-pointer lg:w-20 md:w-20 text-center rounded-full bg-gradient-to-r text-slate-50 from-purple-500 p-2 to-pink-400">
            Popular
          </div>
          <div className="cursor-pointer lg:w-20 md:w-20 text-center rounded-full hover:bg-gradient-to-r hover:text-slate-50 from-purple-500 p-2 to-pink-400">
            Hot
          </div>
          <div className=" cursor-pointer lg:w-20 md:w-20  text-center rounded-full hover:bg-gradient-to-r hover:text-slate-50 from-purple-500 p-2 to-pink-400">
            Recent
          </div>
        </div>
        {/* filter card -*/}

        {/* cart card + */}
        <div
          onClick={() => setcartlist(true)}
          className=" border-2  shadow-sm p-2 rounded-xl relative cartelement cursor-pointer"
        >
          <div className="w-6 h-6 bg-gradient-to-r from-purple-700 to-indigo-400 text-white flex justify-center items-center rounded-full absolute top-[-12px] right-[-12px]">
            {Object.keys(cart).length}
          </div>
          <i className="fas fa-cart-shopping-fast text-2xl  bg-clip-text bg-gradient-to-r text-transparent  from-purple-400 to-pink-500" />
        </div>
        {/* cart card + */}
      </div>
    </>
  );
};

export default FilterCard;
