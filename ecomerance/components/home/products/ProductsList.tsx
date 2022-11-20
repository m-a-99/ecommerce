import { Key, useState } from "react";
import Product from "./components/product/Product";

type props = {
  products: [any];
};
function ProductsList({ products }: props) {
  return (
    products && (
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 gap-y-[100px] justify-center py-16 px-12 md:px-20 lg:px-24 mt-10 ">
        {products.map((product) => (
          <div key={product._id}>
            <Product product={product} />
          </div>
        ))}
      </div>
    )
  );
}

export default ProductsList;
