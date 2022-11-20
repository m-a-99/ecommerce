import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import usePostFetch from "../../../custom_hooks/usePostFetch";
import { useAppSelector } from "../../../redux/hooks";
import { setUserInfo } from "../../../redux/userInfo";
import Spinner from "../../general/Spinner";

const ImgNameBioCard = () => {
  const userInfo = useAppSelector((state) => state.userInfo.value);
  const file = useRef<HTMLInputElement | null>(null);
  const [dragover, setdragover] = useState(false);

  const [enSave, setenSave] = useState(false);

  const [inputImg, setinputImg] = useState<File | null>(null);

  const [firstNameState, setfirstNameState] = useState(
    userInfo?.firstName || ""
  );

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [bio, setbio] = useState("");
  const [img, setimg] = useState("");
  const dispatch = useDispatch();
  const { data, IsPending, err, post } = usePostFetch();
  useEffect(() => {
    setfirstName(userInfo.firstName || "");
    setlastName(userInfo.lastName || "");
    setemail(userInfo.email || "");
    setbio(userInfo.bio || "");
    setimg(userInfo.img || "");
  }, [userInfo]);
  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch(setUserInfo(data));
      setinputImg(null);
      file.current && (file.current.value = "");
    }
  }, [data]);

  function ondrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setdragover(false);
    setinputImg(e.dataTransfer.files[0]);
  }
  function ondragover(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setdragover(true);
  }
  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setdragover(false);
  }

  function onclick() {
    if (file.current) {
      file.current.click();
    }
  }

  useEffect(() => {
    if (
      firstName === userInfo.firstName &&
      lastName === userInfo.lastName &&
      email === userInfo.email &&
      bio === userInfo.bio &&
      !inputImg
    ) {
      setenSave(false);
    } else {
      setenSave(true);
    }
  }, [firstName, lastName, email, bio, img, inputImg,userInfo]);

  function save() {
    const formdata = new FormData();

    firstName !== userInfo.firstName && formdata.append("firstName", firstName);
    lastName !== userInfo.lastName && formdata.append("lastName", lastName);
    email !== userInfo.email && formdata.append("email", email);
    bio !== userInfo.bio && formdata.append("bio", bio);
    inputImg instanceof File && formdata.append("profileimg", inputImg);

    post("/api/updateprofile_img_firstname_lastname_email_bio", formdata);
  }

  return (
    <div className="relative bg-white drop-shadow-md rounded-md">
      {IsPending && <Spinner />}
      <div className="p-10 space-y-8">
        <div
          onClick={onclick}
          onDragEnter={ondragover}
          onDragOver={ondragover}
          onDragLeave={onDragLeave}
          onDrop={ondrop}
          className={`${
            dragover ? "border-pink-500" : "border-gray-300"
          } w-full cursor-pointer  transition-colors ease-in-out p-10   flex justify-center items-center  border-2 border-dashed rounded-lg `}
        >
          <div className="flex flex-col items-center ">
            <i className="fas text-gray-500 text-2xl fa-cloud-arrow-up"></i>
            <p className="max-w-[220px] text-center text-gray-600">
              <span className="text-pink-600">Upload an image</span> or drag and
              drop PNG, JPG
            </p>
            <div className="-mb-4 mt-2">
              {inputImg && (
                <img
                  src={URL.createObjectURL(inputImg)}
                  className="w-10 h-10"
                />
              )}
            </div>
          </div>

          <input
            onChange={(e) => {
              e.target.files && setinputImg(e.target.files[0]);
            }}
            type="file"
            className="w-0 h-0 invisible"
            ref={file}
          />
        </div>
        <div className="space-y-2">
          <div>First Name</div>
          <div>
            <input
              onChange={(e) => setfirstName(e.target.value)}
              className="border-[2px] outline-none px-5 py-2 w-full  focus:border-pink-500 rounded-md"
              type="text"
              value={firstName}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div>Last Name</div>
          <div>
            <input
              onChange={(e) => setlastName(e.target.value)}
              className="border-[2px] outline-none px-5 py-2 w-full  focus:border-pink-500 rounded-md"
              type="text"
              value={lastName}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div>Email</div>
          <div>
            <input
              onChange={(e) => setemail(e.target.value)}
              className="border-[2px] outline-none px-5 py-2 w-full  focus:border-pink-500 rounded-md"
              type="text"
              value={email}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div>bio</div>
          <div>
            <textarea
              onChange={(e) => setbio(e.target.value)}
              className="border-[2px] outline-none px-5 py-2 w-full  focus:border-pink-500 rounded-md"
              cols={30}
              rows={3}
              value={bio}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end">
          {enSave ? (
            <div
              onClick={save}
              className="py-2 px-5 cursor-pointer select-none rounded-lg bg-pink-500  text-white w-min font-semibold"
            >
              Save
            </div>
          ) : (
            <div className="py-2 px-5  select-none rounded-lg bg-gray-500  text-white w-min font-semibold">
              Save
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImgNameBioCard;
