import { useEffect, useState } from "react";
import usePostFetch from "../../../custom_hooks/usePostFetch";
import Spinner from "../../general/Spinner";

const ChangePasswordComponent = () => {
  const [showOldPassword, setshowOldPassword] = useState(false);
  const [showNewPassword, setshowNewPassword] = useState(false);
  const [showconfPassword, setshowconfPassword] = useState(false);
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confPassword, setconfPassword] = useState("");

  const { data, IsPending, err, post } = usePostFetch();
  useEffect(() => {
    if (data) console.log(data);
  }, [data]);
  
  function save() {
    const formdata = new FormData();
    formdata.append("oldPassword", oldPassword);
    formdata.append("newPassword", newPassword);
    formdata.append("confPassword", confPassword);

    post("/api/change_password", formdata);
  }

  return (
    <div className="relative bg-white p-10 space-y-5 drop-shadow-md  rounded-md">
      {IsPending && <Spinner />}
      <div className="space-y-2">
        <div className="text-zinc-600 text-lg font-semibold">Old Password</div>
        <div className="relative">
          <input
            onChange={(e) => {
              setoldPassword(e.target.value);
            }}
            value={oldPassword}
            className="border-[2px] outline-none px-5 py-2 w-full  focus:border-pink-500 rounded-md"
            type={showOldPassword ? "text" : "password"}
          />
          <div
            onClick={() => setshowOldPassword((v) => !v)}
            className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2"
          >
            <i
              className={`far text-zinc-700 text-lg ${
                showOldPassword ? "fa-eye-slash" : "fa-eye"
              } `}
            ></i>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-zinc-600 text-lg font-semibold">New Password</div>
        <div className="relative">
          <input
            onChange={(e) => {
              setnewPassword(e.target.value);
            }}
            value={newPassword}
            className="border-[2px] outline-none px-5 py-2 w-full  focus:border-pink-500 rounded-md"
            type={showNewPassword ? "text" : "password"}
          />
          <div
            onClick={() => setshowNewPassword((v) => !v)}
            className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2"
          >
            <i
              className={`far text-zinc-700 text-lg ${
                showNewPassword ? "fa-eye-slash" : "fa-eye"
              } `}
            ></i>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-zinc-600 text-lg font-semibold">
          Confirm Password
        </div>
        <div className="relative">
          <input
            onChange={(e) => {
              setconfPassword(e.target.value);
            }}
            value={confPassword}
            className="border-[2px] outline-none px-5 py-2 w-full  focus:border-pink-500 rounded-md"
            type={showconfPassword ? "text" : "password"}
          />
          <div
            onClick={() => setshowconfPassword((v) => !v)}
            className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2"
          >
            <i
              className={`far text-zinc-700 text-lg ${
                showconfPassword ? "fa-eye-slash" : "fa-eye"
              } `}
            ></i>
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-5">
        <div
          onClick={save}
          className="py-2 px-5 cursor-pointer select-none rounded-lg bg-pink-500  text-white w-min font-semibold "
        >
          Save
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordComponent;
