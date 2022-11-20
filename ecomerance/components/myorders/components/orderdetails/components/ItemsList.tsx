import Image from "next/image";
import OrderType from "../../../../../types/OrderType";

type props={
  order:OrderType
}
const ItemsList = ({order}:props) => {
    return (
      <div>
        <div className="flex bg-gray-100 p-4 border-[1px] drop-shadow-sm">
          <div className="w-[300px] text-center">Item</div>
          <div className="w-[200px] text-center">Quantity</div>
          <div className="w-[200px] text-center">Price</div>
        </div>
        <div className="overflow-y-auto customscrollbar max-h-[300px]">
          
          {order.order_items.map((item)=><div className="flex  p-4">
            <div className="w-[300px] flex gap-2">
              <div>
                <Image src={item.product_info.img} width={45} height={45}/>
              </div>
              <div>
                <div className="text-sm text-gray-600">{item.product_info.name}</div>
                <div className="text-pink-500 font-semibold">${item.product_info.price.toFixed(2)}</div>
              </div>
            </div>
            <div className="w-[200px]  flex items-center justify-center text-zinc-700">
              {item.quantity}
            </div>
            <div className="w-[200px]  flex items-center justify-center  text-zinc-700">
              ${(item.quantity*item.product_info.price).toFixed(2)}
            </div>
          </div>
          )}
        
        </div>
      </div>
    );
}
 
export default ItemsList;