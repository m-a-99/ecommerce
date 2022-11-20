import { useState } from "react";
import { appendCart, deleteFromCart } from "../../../../redux/cart";
import { useAppDispatch } from "../../../../redux/hooks";

type props = {
  item: {
    count: number;
    product: {
      _id: string;
      name: string;
      desc: string;
      sku: string;
      img: string;
      rate: number;
      sale: number;
      product_category_id: string;
      price: number;
      __v: number;
      createdAt: string;
      updatedAt: string;
    };
  };
};


const CartIteam = ({item}:props) => {
    const dispatch=useAppDispatch()
    const [confDelete, setconfDelete] = useState(false)
    function addMore() {
      dispatch(appendCart(item.product))
    }
    function deleteItem(){
      if(item.count>1){
        dispatch(deleteFromCart(item.product))
      }
      else{
        setconfDelete(true)
      }
    }
    function cancel(){
      setconfDelete(false)
    }
    function remove(){
      dispatch(deleteFromCart(item.product))
    }
    return (
      <div className="flex justify-between bg-white drop-shadow-lg p-4 m-2 rounded-lg relative">
        <div className="flex h-20 justify-center items-center space-x-2">
          <div className="w-8  select-none  rounded-full h-full bg-gray-100 flex flex-col justify-between items-center">
            <div
              onClick={addMore}
              className="cursor-pointer rounded-t-full hover:bg-gray-300 border-b-[1px] w-full border-gray-300 flex justify-center   items-center"
            >
              +
            </div>
            <div className=" flex justify-center items-center">
              {item.count}
            </div>
            <div
              onClick={deleteItem}
              className="cursor-pointer rounded-b-full hover:bg-gray-300 border-t-[1px] w-full border-gray-300 flex justify-center   items-center"
            >
              -
            </div>
          </div>
          <img src={item.product.img} className="w-16 h-16 rounded-full" />
          <div>
            <h1 className="font-semibold">
              {item.product.name.charAt(0).toUpperCase() +
                item.product.name.substring(1)}
            </h1>
            <p className="text-gray-600">${item.product.price}</p>
          </div>
        </div>
        <div className="flex items-center  p-5 drop-shadow-2xl rounded-xl ">
          <div className="font-bold">${item.count * item.product.price}</div>
        </div>
        {confDelete && (
          <div className="space-x-2 transition absolute w-full h-full flex justify-center items-center backdrop-blur-[1px] bg-opacity-60 bg-zinc-900  top-0 left-0 z-200 rounded-lg">
            <div
              onClick={remove}
              className="bg-red-500 p-1 cursor-pointer hover:bg-red-600 drop-shadow-lg flex justify-center items-center px-2 w-fit text-white font-semibold rounded-full"
            >
              remove
            </div>
            <div
              onClick={cancel}
              className="bg-white p-1  cursor-pointer hover:bg-gray-300 flex justify-center items-center px-2 w-fit  drop-shadow-lg  font-[30px] rounded-full"
            >
              cancel
            </div>
          </div>
        )}
      </div>
    );
}
 
export default CartIteam;