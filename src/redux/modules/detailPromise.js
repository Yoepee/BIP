import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import Swal from "sweetalert2";

// 약속 상세보기
export const __getDetailPromise = createAsyncThunk(
  "/api/events/{eventId}",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/events/${payload}`, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      })
      if (data.data.success === false)
        Swal.fire(data.data.error.message, "　", "error");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 약속 추가 (promise에서 initialState 값 참고)
export const __addPromise = createAsyncThunk(
  "/api/events",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(process.env.REACT_APP_SERVER_HOST + `/api/events`, payload, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      })
      if (data.data.success === false)
        Swal.fire(data.data.error.message, "　", "error");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 약속 수정 (promise에서 initialState 값 참고)
export const __editPromise = createAsyncThunk(
  "/api/events/{eventId}e",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.put(process.env.REACT_APP_SERVER_HOST + `/api/events/${payload.id}`, payload.data, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      })
      if (data.data.success === false)
        Swal.fire(data.data.error.message, "　", "error");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 멤버 초대 (닉네임 값을 이용해서 멤버초대)
export const __invitePromise = createAsyncThunk(
  "/api/events/{eventId}",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(process.env.REACT_APP_SERVER_HOST + `/api/events/${payload.id}`, { nickname: payload.nickname }, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      })
      if (!data.data.success) {
        Swal(data.data.data, "　", "error")
        return;
      }
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// createSlice를 통한 redux 생성 - store에서 사용할 수 있는 내용들을 담고 있음
export const detailPromise = createSlice({
  name: "detailPromise",
  initialState: {
    data: [],
    success: false,
    error: null,
    isLoading: false
  },
  reducers: {
  },
  // 내부에서 동작하는 함수 외 외부에서 선언해준 함수 동작을 보조하는 기능
  extraReducers: {
    // 약속 상세보기
    [__getDetailPromise.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getDetailPromise.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.data = action.payload;
    },
    [__getDetailPromise.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    // 약속 추가
    [__addPromise.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__addPromise.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.data = action.payload;
    },
    [__addPromise.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },


})

export default detailPromise;