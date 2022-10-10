import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import Swal from "sweetalert2";

// 프로필 정보 받아오기
  export const __getProfile = createAsyncThunk(
    "/api/user",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.get(process.env.REACT_APP_SERVER_HOST+"/api/user", {
                headers: {
                    Authorization: localStorage.getItem('Authorization'),
                    RefreshToken: localStorage.getItem('RefreshToken'),
              }})
            if(data.data.success===false)
              Swal.fire(data.data.error.message,"　","error");
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );

  // 번호 수정 (받아오는 형태 {phonenumber:"내용", authCode:"코드번호"})
  export const __editPhone = createAsyncThunk(
    "/api/user/phonenumber",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.put(process.env.REACT_APP_SERVER_HOST+"/api/user/phonenumber", payload,{
                headers: {
                  Authorization: localStorage.getItem('Authorization'),
                  RefreshToken: localStorage.getItem('RefreshToken'),
              }})
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );

  // 닉네임 수정(받아오는 형태 {value:"내용"})
  export const __editNickname = createAsyncThunk(
    "/api/user/nickname",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.put(process.env.REACT_APP_SERVER_HOST+"/api/user/nickname", payload,{
                headers: {
                  Authorization: localStorage.getItem('Authorization'),
                  RefreshToken: localStorage.getItem('RefreshToken'),
              }})
              if(data.data.success){
                localStorage.setItem("name",data.data.data.nickname)
              }
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );

  // 이메일 수정(받아오는 형태 {email:"내용", authCode:"코드번호"})
  export const __editEmail = createAsyncThunk(
    "/api/user/email",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.put(process.env.REACT_APP_SERVER_HOST+"/api/user/email", payload,{
                headers: {
                  Authorization: localStorage.getItem('Authorization'),
                  RefreshToken: localStorage.getItem('RefreshToken'),
              }})
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );

  // 프로필 사진 수정 (받아오는 형태 {imgUrl:"사진 url"})
  export const __editPicture = createAsyncThunk(
    "/api/user/picture",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.put(process.env.REACT_APP_SERVER_HOST+"/api/user/profileimage", payload,{
                headers: {
                  Authorization: localStorage.getItem('Authorization'),
                  RefreshToken: localStorage.getItem('RefreshToken'),
              }})
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );
// createSlice를 통한 redux 생성 - store에서 사용할 수 있는 내용들을 담고 있음
export const profile = createSlice({
    name:"profile",
    initialState: {
        data: [],
        success: false,
        error: null,
        isLoading: false
      },
    reducers:{
    },
    // 내부에서 동작하는 함수 외 외부에서 선언해준 함수 동작을 보조하는 기능
    extraReducers: {
      // 데이터 받아오기
        [__getProfile.pending]: (state) => {
          state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__getProfile.fulfilled]: (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
          state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__getProfile.rejected]: (state, action) => {
          state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
          state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
        // 휴대폰 번호 변경 (변경된 데이터값을 받아옴)
        [__editPhone.pending]: (state) => {
          state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__editPhone.fulfilled]: (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
          state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__editPhone.rejected]: (state, action) => {
          state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
          state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
        // 닉네임 번호 변경 (변경된 데이터값을 받아옴)
        [__editNickname.pending]: (state) => {
          state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__editNickname.fulfilled]: (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
          state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__editNickname.rejected]: (state, action) => {
          state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
          state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
        // 이메일 변경 (변경된 데이터값을 받아옴)
        [__editEmail.pending]: (state) => {
          state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__editEmail.fulfilled]: (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
          state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__editEmail.rejected]: (state, action) => {
          state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
          state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
        // 프로필사진 변경 (변경된 데이터값을 받아옴)
        [__editPicture.pending]: (state) => {
          state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__editPicture.fulfilled]: (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
          state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__editPicture.rejected]: (state, action) => {
          state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
          state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
      },
})

export default profile;