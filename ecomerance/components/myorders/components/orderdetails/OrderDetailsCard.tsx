import { useEffect, useState } from "react";
import OrderType from "../../../../types/OrderType";
import ItemsList from "./components/ItemsList";
import OrderAddressAndDetails from "./components/OrderAddressAndDetails";
import OrderDetailsHedder from "./components/OrderDetailsHedder";
import ProgressBar from "./components/ProgressBar";
type props = {
  orders: [OrderType];
  order_details_id: string;
};
const OrderDetailsCard = ({ orders, order_details_id }: props) => {
  const [order, setorder] = useState<OrderType>(orders[0]);
  useEffect(() => {
    setorder(orders.filter((order)=>order._id===order_details_id)[0])
  }, [order_details_id]);
  console.log(order);
  return (
    <div className="col-span-8 bg-white drop-shadow-lg">
      <OrderDetailsHedder order={order} />
      <OrderAddressAndDetails order={order} />
      <ProgressBar />
      <ItemsList order={order} />
    </div>
  );
};

export default OrderDetailsCard;
