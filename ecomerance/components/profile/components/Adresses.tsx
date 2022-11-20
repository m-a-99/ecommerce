import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useDeleteFetch from "../../../custom_hooks/useDeleteFetch";
import usePostFetch from "../../../custom_hooks/usePostFetch";
import { useAppSelector } from "../../../redux/hooks";
import { setUserInfo } from "../../../redux/userInfo";
import Spinner from "../../general/Spinner";

const Adresses = () => {
  const shipping = useRef<HTMLInputElement | null>(null);
  const billing = useRef<HTMLInputElement | null>(null);
  const userInfo = useAppSelector((state) => state.userInfo.value);

  const { data, IsPending, err, post } = usePostFetch();
  const {
    data: deletaData,
    IsPending: deleteIsPending,
    err: deleteErr,
    Delete,
  } = useDeleteFetch();
  const [addAddress, setaddAddress] = useState(false);
  const [addEnable, setaddEnable] = useState(false);

  const [address_type, setaddress_type] = useState("");
  const [address_value, setaddress_value] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setaddress_type("");
      setaddress_value("");
      dispatch(setUserInfo(data));
      setaddAddress(false);
    }
  }, [data]);

  useEffect(() => {
    if (address_type.length > 0 && address_value.length > 0) {
      setaddEnable(true);
    } else {
      setaddEnable(false);
    }
  }, [address_type, address_value]);
  useEffect(() => {
    if (deletaData) {
      dispatch(setUserInfo(deletaData));
    }
  }, [deletaData]);
  function add() {
    const formdata = new FormData();
    formdata.append("type", address_type);
    formdata.append("address", address_value);
    post("/api/add_address", formdata);
  }
  function delete_address(id: string) {
    const formdate = new FormData();
    console.log(id);
    formdate.append("address_id", id);
    Delete("/api/delete_address", formdate);
  }
  return (
    <div>
      {addAddress ? (
        <div className="bg-white p-10 space-y-5 drop-shadow-md  rounded-md">
          {IsPending && <Spinner />}
          <div className="flex justify-between text-zinc-600 text-lg font-semibold">
            <div>Add new Address</div>
            <div
              onClick={() => {
                setaddAddress(false);
              }}
            >
              <i className="text-red-500  text-2xl far fa-circle-xmark"></i>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <div className="flex space-x-2 cursor-pointer select-none text-zinc-600 font-semibold">
                <input
                  ref={billing}
                  type="radio"
                  name="address_type"
                  value="Billing"
                  onChange={(e) => setaddress_type(e.target.value)}
                />
                <div onClick={() => billing.current?.click()}>Billing</div>
              </div>
              <div className="flex space-x-2 cursor-pointer select-none text-zinc-600 font-semibold">
                <input
                  ref={shipping}
                  type="radio"
                  name="address_type"
                  value="Shipping"
                  onChange={(e) => setaddress_type(e.target.value)}
                />
                <div onClick={() => shipping.current?.click()}>Shipping</div>
              </div>
            </div>
            <input
              className="border-[2px] outline-none px-5 py-2 w-full  focus:border-pink-500 rounded-md"
              type="text"
              placeholder="Address"
              onChange={(e) => setaddress_value(e.target.value)}
              value={address_value}
            />
          </div>
          <div className="flex justify-end">
            {addEnable ? (
              <div
                onClick={add}
                className="py-2 px-5 cursor-pointer select-none rounded-lg bg-pink-500  text-white w-min font-semibold "
              >
                Add
              </div>
            ) : (
              <div className="py-2 px-5  select-none rounded-lg bg-gray-500  text-white w-min font-semibold">
                Add
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-10 space-y-5 drop-shadow-md  rounded-md">
          <div className="flex justify-between">
            <div className="text-zinc-600 text-lg font-semibold">Adresses</div>
            <div
              onClick={() => setaddAddress(true)}
              className=" cursor-pointer select-none flex  font-semibold text-pink-500 "
            >
              + Add
            </div>
          </div>
          <div className="grid grid-cols-3  gap-5">
            {userInfo?.addresses&&userInfo?.addresses.map((e) => (
              <div
                key={e._id}
                className=" max-w-[250px] space-y-2 rounded-xl bg-gray-100  p-5 text-sm"
              >
                <div className="flex justify-between ">
                  <div className="font-bold text-zinc-800">
                    {e.type &&
                      e.type?.charAt(0).toUpperCase() + e.type?.substring(1)}
                  </div>
                  <div
                    onClick={() => e._id && delete_address(e._id)}
                    className="text-red-500 cursor-pointer select-none"
                  >
                    <i className="fa-solid fa-trash-xmark"></i>
                  </div>
                </div>
                <div>{e.address}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Adresses;
