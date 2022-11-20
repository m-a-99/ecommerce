import Link from "next/link"
type props={
    page:string
}
const SettingLeftNavbar = ({ page }:props) => {
  return (
    <div className="col-span-3 bg-white h-screen py-5 space-y-2 drop-shadow-md rounded-md">
      <Link href={"/profile"}>
        <div
          className={`${
            page === "Profile"
              ? "text-pink-500 border-pink-500"
              : "border-transparent"
          } cursor-pointer select-none font-semibold  py-2 px-6 border-l-4   hover:text-pink-500 transition-colors `}
        >
          Profile
        </div>
      </Link>
      <Link href={"/change-password"}>
        <div
          className={`${
            page === "Change Password"
              ? "text-pink-500 border-pink-500"
              : "border-transparent"
          } cursor-pointer select-none font-semibold  py-2 px-6 border-l-4   hover:text-pink-500 transition-colors `}
        >
          Change Password
        </div>
      </Link>
      <Link href={"/my-orders"}>
        <div
          className={`${
            page === "My Orders"
              ? "text-pink-500 border-pink-500"
              : "border-transparent"
          } cursor-pointer select-none font-semibold  py-2 px-6 border-l-4   hover:text-pink-500 transition-colors `}
        >
          My Orders
        </div>
      </Link>
      <Link href={"/my-whishlist"}>
        <div
          className={`${
            page === "My Wishlist"
              ? "text-pink-500 border-pink-500"
              : "border-transparent"
          } cursor-pointer select-none font-semibold  py-2 px-6 border-l-4   hover:text-pink-500 transition-colors `}
        >
          My Wishlist
        </div>
      </Link>
    </div>
  );
};
 
export default SettingLeftNavbar;