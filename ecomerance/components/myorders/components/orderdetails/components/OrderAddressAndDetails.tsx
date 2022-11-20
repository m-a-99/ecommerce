import OrderType from "../../../../../types/OrderType";

type props = {
  order: OrderType;
};
const OrderAddressAndDetails = ({order}:props) => {
  return (
    <div className="p-5  grid grid-cols-12 border-b-[1px] gap-5 border-gray-300 ">
      <div className="col-span-7 border-r-[1px] space-y-2  border-gray-300">
        <div>
          <div className="font-semibold text-zinc-700 ">Shipping Address</div>
          <div className="text-sm text-gray-500">
            {order.shipping_address.address}
          </div>
        </div>
        <div>
          <div className="font-semibold text-zinc-700 "> Billing Address </div>
          <div className="text-sm text-gray-500">
            {order.billing_address.address}
          </div>
        </div>
      </div>
      <div className="col-span-5">
        <div className="flex justify-between text-gray-500">
          <div>Sub Total</div>
          <div>
            $
            {order.order_items.reduce((pre, cur) => pre + (cur.quantity * cur.product_info.price),0).toFixed(2)
              }
          </div>
        </div>
        <div className="flex justify-between text-gray-500">
          <div>Discount</div>
          <div>${0.0}</div>
        </div>
        <div className="flex justify-between text-gray-500">
          <div>Delivery Fee</div>
          <div>${order.delivery_fee.toFixed(2)}</div>
        </div>
        <div className="flex justify-between text-gray-500">
          <div>Tax</div>
          <div>${order.tax.toFixed(2)}</div>
        </div>
        <div className="flex justify-between font-semibold text-zinc-700">
          <div>Total</div>
          <div>
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

export default OrderAddressAndDetails;
