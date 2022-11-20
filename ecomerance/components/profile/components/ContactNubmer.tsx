import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useDeleteFetch from "../../../custom_hooks/useDeleteFetch";
import usePostFetch from "../../../custom_hooks/usePostFetch";
import { useAppSelector } from "../../../redux/hooks";
import { setUserInfo } from "../../../redux/userInfo";
import Spinner from "../../general/Spinner";
const ContactNubmer = () => {
  const userInfo = useAppSelector((state) => state.userInfo.value);

  const [addcontact, setaddcontact] = useState(false);
  const [addEnable, setaddEnable] = useState(false);
  const [title, settitle] = useState("");
  const [number, setnumber] = useState("");
  const { data, IsPending, err, post } = usePostFetch();
  const {
    data: deleteData,
    IsPending: deleteIsPending,
    err: deleteErr,
    Delete,
  } = useDeleteFetch();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      settitle("")
      setnumber("")
      setaddcontact(false);
      dispatch(setUserInfo(data))
    }
  }, [data]);
  function add() {
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("number", number);
    post("/api/add_contact", formdata);
  }

  useEffect(() => {
    if (title.length > 0 && number.length > 0) {
      setaddEnable(true);
    } else {
      setaddEnable(false);
    }
  }, [title, number]);

  function delete_contact(contactId: string) {
    const formdata = new FormData();
    formdata.append("contact_id", contactId);
    Delete("/api/delete_contact", formdata);
  }

  useEffect(() => {
    if (deleteData) {
      dispatch(setUserInfo(deleteData));
    }
  }, [deleteData]);

  return (
    <div>
      {addcontact ? (
        <div className="bg-white p-10 space-y-5 drop-shadow-md  rounded-md">
          {IsPending && <Spinner />}
          <div className="flex justify-between text-zinc-600 text-lg font-semibold">
            <div>Add Contact Number</div>
            <div
              onClick={() => {
                setaddcontact(false);
              }}
            >
              <i className="text-red-500  text-2xl far fa-circle-xmark"></i>
            </div>
          </div>
          <div className="flex space-x-2">
            <input
              className="border-[2px] outline-none px-5 py-2 w-full  focus:border-pink-500 rounded-md"
              type="text"
              placeholder="Title"
              onChange={(e) => settitle(e.target.value)}
              value={title}
            />
            <input
              className="border-[2px] outline-none px-5 py-2 w-full  focus:border-pink-500 rounded-md"
              type="text"
              placeholder="Number"
              onChange={(e) => setnumber(e.target.value)}
              value={number}
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
            <div className="text-zinc-600 text-lg font-semibold">Contacts </div>
            <div
              onClick={() => {
                setaddcontact(true);
              }}
              className=" cursor-pointer select-none flex  font-semibold text-pink-500 "
            >
              + Add
            </div>
          </div>
          <div className="grid grid-cols-3  gap-5">
            {userInfo?.contacts&&userInfo?.contacts.map((e) => (
              <div
                className=" max-w-[250px] space-y-2 rounded-xl bg-gray-100  p-5 text-sm"
                key={e._id}
              >
                <div className="flex justify-between ">
                  <div className="font-bold text-zinc-800">
                    {e?.title &&
                      e.title.split(" ").reduce((pre, cur) => {
                        return (
                          pre +
                          " " +
                          cur.charAt(0).toUpperCase() +
                          cur.substring(1)
                        );
                      }, "")}
                  </div>
                  <div
                    onClick={() => e._id && delete_contact(e._id)}
                    className="text-red-500 cursor-pointer select-none"
                  >
                    <i className="fa-solid fa-trash-xmark"></i>
                  </div>
                </div>
                <div>{e.number}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactNubmer;
