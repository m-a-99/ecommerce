type OrderType = {
  _id: string;
  user_id: string;
  status: string;
  delivery_time: string;
  delivery_fee: number;
  tax: number;
  payment_details: {
    amount: number;
    provider: string;
    status: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
  order_items: [
    {
      _id: string;
      order_id: string;
      product_id: string;
      quantity: number;
      createdAt: string;
      updatedAt: string;
      product_info: {
        _id: string;
        name: string;
        desc: string;
        sku: string;
        img: string;
        sale: number;
        price: number;
        createdAt: string;
        updatedAt: string;
      };
    }
  ];
  shipping_address: {
    type: string;
    address: string;
    _id: string;
  };
  billing_address: {
    type: string;
    address: string;
    _id: string;
  };
};

export default OrderType;