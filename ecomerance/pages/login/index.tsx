import { isPending } from "@reduxjs/toolkit";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import usePostFetch from "../../custom_hooks/usePostFetch";
import Cookies from "universal-cookie";

const Login: NextPage = () => {
  const [signinState, setsigninState] = useState(true);
  const firstName = useRef("");
  const lastName = useRef("");
  const email = useRef("");
  const password = useRef("");
  const conf = useRef("");

  const { data, IsPending, err, post } = usePostFetch();
  const goback = useRouter().back;

  useEffect(() => {
    if (data?.login || data?.signup) {
      console.log(data);
      const cookies = new Cookies();
      cookies.set("jwt", data.token, {
        path: "/",
        maxAge: data.maxAge,
        secure: true,
        sameSite: "none",
      });

      goback();
    }
  }, [data]);

  function Signup() {
    const formdata = new FormData();
    formdata.append("firstName", firstName.current);
    formdata.append("lastName", lastName.current);
    formdata.append("email", email.current);
    formdata.append("password", password.current);
    formdata.append("confirmationpassword", conf.current);

    post("/auth/signup", formdata);
  }

  function Signin() {
    const formdata = new FormData();
    formdata.append("email", email.current);
    formdata.append("password", password.current);
    post(
      "/auth/login",
      formdata
    );
  }
  return (
    <div className="h-screen w-full transition-all bg-loginbg md:bg-loginbg2 lg:bg-loginbg2 bg-cover bg-center lg:px-28 md:px-28  py-16 shadow-md">
      <div className="lg:bg-white md:bg-white md:drop-shadow-lg lg:drop-shadow-lg w-full h-full md:rounded-2xl lg:rounded-2xl flex max-w-[800px] m-auto">
        {/* left_col_+ */}
        <div className="w-2/3 h-full lg:block md:block hidden">
          <div className="relative top-1/2 transition -translate-y-1/2 -mt-5 left-1/2 -translate-x-1/2">
            <Image
              src="/loginimg.png"
              width={"100%"}
              height={"70%"}
              layout="responsive"
              className=""
            />
            <div className="flex  select-none justify-center">
              <div
                onClick={() => setsigninState((v) => !v)}
                className=" px-3 py-[4px] hover:bg-gray-200  w-24 flex items-center  cursor-pointer justify-center  border-2 border-zinc-500 font-semibold  rounded-full"
              >
                {!signinState ? "Sign in" : "Sign up"}
              </div>
            </div>
          </div>
        </div>
        {/* left_col_- */}
        {/* right_col_+ */}
        <div className="lg:w-1/2 md:w-1/2 w-full  h-full flex flex-col justify-center items-center p-5  space-y-8 lg:space-y-4 md:space-y-4 ">
          <div className="select-none pointer-events-none	">
            <Image src={"/profile.png"} width="100px" height="100px"></Image>
          </div>

          {signinState ? (
            <div>Sign in to your Account</div>
          ) : (
            <div>Create New Account</div>
          )}
          {err && (
            <div className="text-sm text-center max-h-20 overflow-auto scrollbar-track-zinc-200 scrollbar-thin scrollbar-thumb-slate-400">
              {err?.firstName && (
                <h1 className="text-red-500">{err.firstName}</h1>
              )}
              {err?.lastName && (
                <h1 className="text-red-500">{err.lastName}</h1>
              )}
              {err?.email && <h1 className="text-red-500">{err.email}</h1>}
              {err?.password && (
                <h1 className="text-red-500">{err.password}</h1>
              )}
              {err?.confirmationpassword && (
                <h1 className="text-red-500">{err.confirmationpassword}</h1>
              )}
            </div>
          )}
          {!signinState && (
            <div className="flex ">
              <input
                onChange={(e) => {
                  firstName.current = e.target.value;
                }}
                type="text"
                placeholder="First name"
                className="py-[6px] px-4 w-full max-w-[125px] outline-none rounded-l-full  focus:placeholder:text-indigo-500 border-2 border-r-[1px] border-zinc-400  focus:border-indigo-500 "
              />
              <input
                onChange={(e) => {
                  lastName.current = e.target.value;
                }}
                type="text"
                placeholder="Last name"
                className="py-[6px] px-4 w-full max-w-[125px] outline-none rounded-r-full  focus:placeholder:text-indigo-500 border-2 border-l-[1px] border-zinc-400  focus:border-indigo-500 "
              />
            </div>
          )}
          <input
            onChange={(e) => {
              email.current = e.target.value;
            }}
            type="text"
            placeholder="Email"
            className="py-[6px] px-4 w-full max-w-[250px] outline-none rounded-full  focus:placeholder:text-indigo-500 border-2 border-zinc-400  focus:border-indigo-500 "
          />
          <input
            onChange={(e) => {
              password.current = e.target.value;
            }}
            type="password"
            placeholder="Password"
            className="py-[6px] px-4 w-full max-w-[250px] outline-none rounded-full  focus:placeholder:text-indigo-500 border-2 border-zinc-400  focus:border-indigo-500 "
          />
          {!signinState && (
            <input
              onChange={(e) => {
                conf.current = e.target.value;
              }}
              type="password"
              placeholder="confirm password "
              className="py-[6px] px-4 w-full max-w-[250px] outline-none rounded-full  focus:placeholder:text-indigo-500 border-2 border-zinc-400  focus:border-indigo-500 "
            />
          )}
          <div className="flex space-x-4 select-none">
            {signinState ? (
              <div
                onClick={Signin}
                className="bg-indigo-600 hover:bg-indigo-500 cursor-pointer flex items-center justify-center px-3 py-[5px] w-24  text-white font-semibold  rounded-full"
              >
                Sign in
              </div>
            ) : (
              <div
                onClick={Signup}
                className="bg-indigo-600 hover:bg-indigo-500 cursor-pointer flex items-center justify-center px-3 py-[5px] w-24  text-white font-semibold  rounded-full"
              >
                signup
              </div>
            )}
            <Link rel="stylesheet" href="http://localhost:3000/auth/google">
              <div className="w-10 h-10 cursor-pointer hover:bg-slate-100 flex items-center justify-center rounded-full bg-white drop-shadow-lg shadow-xl">
                <i className="fa-brands text-red-500 fa-google"></i>
              </div>
            </Link>
          </div>
        </div>
        {/* right_col_- */}
      </div>
    </div>
  );
};

export default Login;
