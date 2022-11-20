import { useState } from "react";
import OrderDetailsCard from "./components/orderdetails/OrderDetailsCard";
import OrdersList from "./components/orderlist/OrdersList";


const MyOrdersCard = ({orders}:any) => {
const [order_details_id, setorder_details_id] = useState(orders[0]._id);


  return (
    <div className="col-span-9  space-y-10">
      <div className="grid grid-cols-12 gap-10 ">
        <OrdersList orders={orders} setorder_details_id={setorder_details_id} />
        <OrderDetailsCard orders={orders} order_details_id={order_details_id} />
      </div>
    </div>
  );
};

export default MyOrdersCard;
