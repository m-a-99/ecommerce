import OrderType from "../../../../../types/OrderType";

type props = {
  order: OrderType;
  index: number;
};
const OrderCard = ({ order, index }: props) => {
  return (
    <div className="bg-gray-100  rounded-md border-2 border-pink-500">
      <div className="p-3 border-b-[1px] border-gray-300 ">
        <span className="font-semibold text-zinc-800 text-lg">Order</span>#
        {index}
      </div>
      <div className="p-3  text-ellipsis ">
        <div className="flex justify-between text-sm text-zinc-600  space-x-2">
          <div className="whitespace-nowrap min-w-[85px]">Order Date</div>
          <div>:</div>
          <div className="text-center  min-w-[100px] text-ellipsis whitespace-nowrap overflow-hidden">
            {new Date(order.createdAt).toLocaleString("en-US", {
              dateStyle: "medium",
              // timeStyle: "long",
            })}
            {/* January 12, 2022 */}
          </div>
        </div>
        <div className="flex justify-between text-sm text-zinc-600  space-x-2   ">
          <div className="whitespace-nowrap min-w-[85px]">Delivery Time</div>
          <div>:</div>
          <p className="text-center min-w-[100px]  text-ellipsis whitespace-nowrap overflow-hidden">
            {order.delivery_time}
          </p>
        </div>
        <div className="flex justify-between  space-x-2">
          <div className="whitespace-nowrap min-w-[85px]">Amount</div>
          <div>:</div>
          <div className="text-right min-w-[100px]">
            $
            {order.order_items
              .reduce(
                (pre, cur) => pre + cur.quantity * cur.product_info.price,
                0
              )
              .toFixed(2)}
          </div>
        </div>
        <div className="flex justify-between space-x-2 ">
          <div className="whitespace-nowrap min-w-[85px]">Total Price</div>
          <div>:</div>
          <div className=" min-w-[100px] text-right">
            $
            {(order.tax +
              order.delivery_fee +
              order.order_items
                .reduce(
                  (pre, cur) => pre + cur.quantity * cur.product_info.price,
                  0
                )).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
