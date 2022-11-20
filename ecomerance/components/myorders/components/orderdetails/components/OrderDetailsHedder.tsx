import OrderType from "../../../../../types/OrderType";

type props={
  order:OrderType
}
const OrderDetailsHedder = ({ order }: props) => {
  return (
    <div className="p-5 flex justify-between border-b-[1px] border-gray-300 ">
      <div className="text-lg text-zinc-700 font-semibold">
        Order Details - {order._id}
      </div>
      <div className="flex  justify-center items-center text-pink-500 font-semibold space-x-1">
        <i className="far fa-eye"></i>
        <span>Details</span>
      </div>
    </div>
  );
};
 
export default OrderDetailsHedder;