import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/cart";

type props = {
  children: React.ReactNode;
};
const StateSetup = ({ children }: props) => {
      // const dispatch = useDispatch();
      // useEffect(() => {
      //   try {
      //     dispatch(setCart(JSON.parse(localStorage.getItem("cart") || "{}")));
      //   } catch (e) {
      //     dispatch(setCart({}));
      //   }
      // }, []);
  return <div>{children}</div>;
};

export default StateSetup;
