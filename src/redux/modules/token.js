import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import Swal from "sweetalert2";

// 체크인 정보 불러오기(상세보기 멤버 상태) (상태 NOSHOW, ONTIME, LATE)
  export const __getToken = createAsyncThunk(
    "/api/member/reissue",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.get(process.env.REACT_APP_SERVER_HOST+`/api/member/reissue`,{
                headers: {
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


// createSlice를 통한 redux 생성 - store에서 사용할 수 있는 내용들을 담고 있음
export const token = createSlice({
    name:"token",
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
      // 체크인 정보 받아오기
        [__getToken.pending]: (state) => {
          state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__getToken.fulfilled]: (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
          state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__getToken.rejected]: (state, action) => {
          state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
          state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
      },
      
    
})

export default token;