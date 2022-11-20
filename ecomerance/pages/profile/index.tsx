import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../../components/general/Navbar";
import SettingLeftNavbar from "../../components/general/SettingLeftNavbar";
import ProfileCard from "../../components/profile/ProfileCard";
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

const Profile = ({userInfo}:any) => {

  const navto = useRouter().push;

  useEffect(() => {
    if (userInfo?.login === false) {
      navto("/login");
    }
  }, []);
  return (
    <>
      {!(userInfo?.login === false) && (
        <div className="bg-gray-100  pt-16">
          <Navbar />
          <div className=" grid grid-cols-12 py-10 px-5 gap-10">
            <SettingLeftNavbar page="Profile" />
            <ProfileCard />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
