import { useState } from "react";
import OrderType from "../../../../types/OrderType";
import OrderCard from "./components/OrderCard";
type props = {
  orders: [
    OrderType
  ],
setorder_details_id :(id:string)=>void;
};
const OrdersList = ({ orders, setorder_details_id }: props) => {
  return (
    <div className="col-span-4 bg-white h-screen drop-shadow-md p-5 space-y-5 min-w-[320px]">
      <h1 className="text-zinc-700 font-semibold   text-lg  ">My Orders</h1>
      <div className="space-y-4 overflow-y-auto h-[calc(100%-60px)] customscrollbar p-4 ">
        {orders.map((order, index) => (
          <div onClick={() => setorder_details_id(order._id)} key={order._id}>
            <OrderCard order={order} index={orders.length - index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
