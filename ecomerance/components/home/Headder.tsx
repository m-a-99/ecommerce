
const Headder = () => {

  return (
    <div className="px-10 text-center md:text-start lg:text-start md:px-16  lg:px-20 py-10 items-center bg-gradient-to-r from-purple-300 to-pink-200  rounded-lg mx-10 my-5">
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold ">
          Explore New Products{" "}
          <span>
            <i className=" text-3xl mt-1  bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500  text-transparent far fa-cart-arrow-down"></i>
          </span>
        </h1>
        {/* <i className=" text-3xl mt-1 text-red-400 fa-solid fa-cart-shopping-fast"></i> */}
      </div>
      <div>
        <h2 className="text-gray-500 m-2 ">Search for the best products .</h2>
      </div>
    </div>
  );
};

export default Headder;
