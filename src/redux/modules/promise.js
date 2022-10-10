import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import Swal from "sweetalert2";

// 약속 리스트 받아오기 (unit = day,week,month, date = 날짜)
  export const __getPromise = createAsyncThunk(
    "/api/events/list/{unit}",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.get(process.env.REACT_APP_SERVER_HOST+`/api/events/list?unit=${payload.unit}&querydate=${payload.date}`,{
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

// createSlice를 통한 redux 생성 - store에서 사용할 수 있는 내용들을 담고 있음
export const promise = createSlice({
    name:"promise",
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
        [__getPromise.pending]: (state) => {
          state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__getPromise.fulfilled]: (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
          state.data = action.payload; // 받아온 데이터 값을 data에 입력
        },
        [__getPromise.rejected]: (state, action) => {
          state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
          state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
        
        
      },
      
    
})

export default promise;