import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface userinfotype {
  value: {
    email?: string;
    img?: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
    contacts?: [
      { _id?: string; title?: string; number?: string }
    ];
    addresses?: [
      { _id?: string; type?: string; address?: string }
    ];
    login?: boolean;
    msg?: string;
    token?: string;
  };
}
const initialState: userinfotype = {
  value: {
  },
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.value = action.payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      const{email,img,firstName,lastName,bio,contacts,addresses,login,msg,token}=action.payload.userInfo.value
      if (!(email||img||firstName||lastName||bio||contacts||addresses||login!==undefined||msg||token))return state;
      state.value = action.payload.userInfo.value;
    },
  },
});
export const { setUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
