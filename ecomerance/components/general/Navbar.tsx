import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const Navbar = () => {
  const [SearchFocus, setSearchFocus] = useState(false);
  const userInfo = useAppSelector((state) => state.userInfo.value);
  return (
    <div className="fixed z-20 top-0 w-full md:py-[16px] lg:py-[16px] space-x-6 md:space-x-10 lg:space-x-10 flex justify-between items-center bg-white  py-[12px] px-[20px] sm:px-[50px] md:px-[65px] lg:px-[80px] border-b-[2px]">
      {/* left sid + */}
      <div className="flex  ">
        {/* logo + */}
        <div className=" mr-5 text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-400 flex items-center justify-center lg:hidden md:hidden">
          <i className="fas fa-list"></i>
        </div>
        <div className="hidden xsm:block sm:block md:block lg:block lg:mr-10 md:mr-10 w-max cursor-pointer select-none">
          <Link href={"/"}>
            {/* <Image src={"/shopping.png"} width={120} height={120} /> */}
            <div className="flex  items-center space-x-2  text-transparent text-4xl bg-clip-text font-extrabold bg-gradient-to-r from-purple-400 to-pink-500">
              <i className="fa-solid fa-briefcase-arrow-right  "></i>
              <div className="flex flex-col items-center">
                <div className="text-xl mb-[-10px]">Smart</div>
                <div className="text-base">shop</div>
              </div>
            </div>
          </Link>
        </div>
        {/* logo - */}
        {/* nav links + */}

        <div className=" md:flex lg:flex text-sm items-center hidden start space-x-10  w-max font-semibold">
          <Link href={"/Shops"}>Shops</Link>
          <Link href={"/Offers"}>Offers</Link>
          <Link href={"/Contacts"}>Contacts</Link>
        </div>
        {/* nav links - */}
      </div>
      {/* left sid - */}
      {/* right sid + */}
      <div className="flex justify-between  h-full grow md:space-x-8 lg:space-x-8 ">
        {/* search card + */}
        <div className="border-r-[1.5px] pr-3 mr-2 lg:mr-0 md:mr-0 md:pr-8 lg:pr-8  h-full  flex items-center grow  min-w-[150px] relative">
          <i
            className={`${
              SearchFocus
                ? "fas text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to bg-pink-400 "
                : "far text-gray-400"
            } absolute  z-10   fa-magnifying-glass left-3 `}
          ></i>
          <input
            onBlur={() => setSearchFocus(false)}
            onFocus={() => setSearchFocus(true)}
            type="text"
            placeholder="Search products"
            className="outline-none bg-gray-50 p-3 pl-10 rounded-xl shadow-sm  focus:bg-gray-100  w-full drop-shadow-sm "
          />
        </div>
        {/* search card - */}
        {/* profile card + */}
        {userInfo?.login === false && (
          <Link href={"/login"}>
            <div className=" flex space-x-2 items-center cursor-pointer ite">
              <div className="bg-gradient-to-tr from-purple-400 to-pink-500 text-white rounded-lg  px-4 py-2">
                login
              </div>
            </div>
          </Link>
        )}
        {!(userInfo?.login === false) && (
          <Link href={"/profile"}>
            <div className=" flex space-x-2 items-center cursor-pointer ">
              {userInfo?.img ? (
                <div>
                  <img
                    src={
                      process.env.NEXT_PUBLIC_SERVERURL +
                      "/api/file/" +
                      userInfo.img
                    }
                    className="rounded-full w-10 h-10 min-w-[2.5rem] min-h-[2.5rem]"
                  />
                </div>
              ) : (
                <div className="bg-gradient-to-tr from-purple-400 to-pink-500 rounded-full min-w-[2.5rem] min-h-[2.5rem] w-10 h-10"></div>
              )}
              <div className=" hidden lg:block">
                <div className="text-black font-bold text-lg whitespace-nowrap flex space-x-1">
                  <div>
                    {userInfo?.firstName &&
                      userInfo.firstName.charAt(0).toUpperCase() +
                        userInfo.firstName.substring(1)}
                  </div>
                  <div>
                    {userInfo?.lastName &&
                      userInfo.lastName.charAt(0).toUpperCase() +
                        userInfo.lastName.substring(1)}
                  </div>
                </div>
                <div className="text-gray-400 text-xs whitespace-nowrap">
                  {userInfo?.email}
                </div>
              </div>
            </div>
          </Link>
        )}
        {/* profile card - */}
      </div>
      {/* right sid - */}
    </div>
  );
};

export default Navbar;
