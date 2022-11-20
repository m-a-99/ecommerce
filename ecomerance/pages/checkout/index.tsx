import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../../components/general/Navbar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { storeWrapper } from "../../redux/store";
import { setUserInfo } from "../../redux/userInfo";
export const getServerSideProps = storeWrapper.getServerSideProps(
  (store) => async (context) => {
    let userInfo = await fetch(
      `${process.env.NEXT_PUBLIC_SERVERURL}/api/getUserInfo`,
      {
        method: "GET",
        headers: { cookie: context.req.headers.cookie as string },
        credentials: "include",
        // agent
      }
    );
    if (userInfo.ok) {
      userInfo = await userInfo.json();
    } else {
      userInfo = JSON.parse(await userInfo.text());
    }
    console.log("profile fetch");
    store.dispatch(setUserInfo(userInfo));

    return { props: { userInfo } };
  }
);

const Checkout: NextPage = ({userInfo}:any) => {
  const cart = useAppSelector((state) => state.cart.value);
  const navto = useRouter().push;

  useEffect(() => {
    if (userInfo?.login === false) {
      navto("/login");
    }
  }, []);
  return (
    <>
      {!(userInfo?.login === false) && (
        <div>
          <Navbar />
          <div className="mt-[80px] grid grid-cols-3 px-32 py-10 bg-gray-100 min-h-[calc(100vh-80px)]">
            <div className="col-span-2 space-y-5">
              <div className="p-8 bg-white drop-shadow-xl space-y-5 ">
                <div className="flex space-x-2 items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r flex justify-center items-center text-white  from-purple-500 to-pink-300">
                    1
                  </div>
                  <div className="text-xl">Contact</div>
                </div>
                <input
                  className="p-2 w-full border-2 outline-none"
                  type="text"
                  placeholder="phone nubmer"
                />
              </div>
              <div className="p-8 bg-white drop-shadow-xl space-y-5 ">
                <div className="flex space-x-2 items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r flex justify-center items-center text-white  from-purple-500 to-pink-300">
                    2
                  </div>
                  <div className="text-xl">Billing Address</div>
                </div>
                <div className="max-w-[180px] border-2  rounded-xl p-4 text-sm space-y-2">
                  <div className="text-zinc-900 font-semibold">Billing</div>
                  <div className="text-gray-700">
                    Billing 2231 Kidd Avenue, AK, Kipnuk, 99614, United States
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white drop-shadow-xl space-y-5 ">
                <div className="flex space-x-2 items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r flex justify-center items-center text-white  from-purple-500 to-pink-300">
                    3
                  </div>
                  <div className="text-xl">Shipping Address</div>
                </div>
                <div className="max-w-[180px] border-2  rounded-xl p-4 text-sm space-y-2">
                  <div className="text-zinc-900 font-semibold">Shipping</div>
                  <div className="text-gray-700">
                    2148 Straford Park, KY, Winchester, 40391, United States
                  </div>
                </div>
              </div>
              <div className="p-8 bg-white drop-shadow-xl space-y-5 ">
                <div className="flex space-x-2 items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r flex justify-center items-center text-white  from-purple-500 to-pink-300">
                    4
                  </div>
                  <div className="text-xl">Delivery Schedule</div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="max-w-[180px] m-2 max-h-20 border-2  rounded-xl p-4 text-sm space-y-2">
                    <div className="text-zinc-900 font-semibold">Morning</div>
                    <div className="text-gray-700">11.00 AM - 2.00 PM</div>
                  </div>
                  <div className="max-w-[180px] m-2  max-h-20  border-2  rounded-xl p-4 text-sm space-y-2">
                    <div className="text-zinc-900 font-semibold">Noon</div>
                    <div className="text-gray-700">8.00 AM - 11.00</div>
                  </div>
                  <div className="max-w-[180px] m-2  max-h-20  border-2  rounded-xl p-4 text-sm space-y-2">
                    <div className="text-zinc-900 font-semibold">Afternoon</div>
                    <div className="text-gray-700">2.00 PM - 5.00 PM</div>
                  </div>
                  <div className="max-w-[180px] m-2 max-h-20  border-2  rounded-xl p-4 text-sm space-y-2">
                    <div className="text-zinc-900 font-semibold">Evening</div>
                    <div className="text-gray-700">5.00 PM - 8.00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 p-5">
              <div className="p-4 space-y-3 border-b-[1px]">
                {Object.values(cart).map((v) => (
                  <div className="flex justify-between">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="font-bold text-zinc-600">{v.count}</div>
                      <i className="fa-regular fa-xmark text-gray-600"></i>
                      <div className="text-gray-600  ">
                        {v.product.name.charAt(0).toUpperCase() +
                          v.product.name.substring(1)}
                      </div>
                    </div>
                    <div className="text-gray-600 font-mono">
                      {`$${v.count * v.product.price}`}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 space-y-2 border-b-[1px]">
                <div className="text-gray-600  flex justify-between">
                  <div>Sub Total</div>
                  <div className="text-sm">
                    $
                    {Object.values(cart).reduce(
                      (previousValue, currentValue) => {
                        return (
                          previousValue +
                          currentValue.count * currentValue.product.price
                        );
                      },
                      0
                    )}
                  </div>
                </div>
                <div className="text-gray-600  flex justify-between">
                  <div>Tax</div>
                  <div className="text-sm">$0.00</div>
                </div>
                <div className="text-gray-600  flex justify-between">
                  <div>Shipping</div>
                  <div className="text-sm">$0.00</div>
                </div>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center ">
                  <div className="font-bold  text-zinc-600 text-lg"> Total</div>
                  <div className="text-gray-700 font-semibold">
                    $
                    {Object.values(cart).reduce(
                      (previousValue, currentValue) => {
                        return (
                          previousValue +
                          currentValue.count * currentValue.product.price
                        );
                      },
                      0
                    )}
                  </div>
                </div>
              </div>
              <div className=" p-5 bg-white drop-shadow-lg space-y-5">
                <div className="font-semibold text-slate-600">
                  Choose Payment Method
                </div>
                <div className="flex justify-center space-x-4">
                  <div className="p-5 border-[1px] flex justify-between items-center   w-min rounded-md">
                    stripe
                  </div>
                  <div className="p-5 text-sm  border-[1px] flex justify-between items-center w-24 rounded-md">
                    Cash On Delivery
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="px-5 py-3 select-none bg-indigo-900 text-white w-min rounded-md">
                    Confirm
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
