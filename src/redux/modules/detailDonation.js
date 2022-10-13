import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import Swal from "sweetalert2";

// 재능기부 상세보기
export const __getDetailDonation = createAsyncThunk(
  "/api/posts/{postId}",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/posts/${payload}`, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      })
      if (data.data.success === false)
        Swal.fire(data.data.data, "　", "error");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 재능기부 게시글 추가하기 
export const __addDonation = createAsyncThunk(
  "/api/posts/{postId}",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(process.env.REACT_APP_SERVER_HOST + `/api/posts`, payload, {
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
//재능기부 게시글 수정하기 (payload = {id:"게시글 번호", data:"수정내용"})
export const __editDonation = createAsyncThunk(
  "/api/posts/{postId}",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.put(process.env.REACT_APP_SERVER_HOST + `/api/posts/${payload.id}`, payload.data, {
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


// createSlice를 통한 redux 생성 - store에서 사용할 수 있는 내용들을 담고 있음
export const detailDonation = createSlice({
  name: "detailDonation",
  initialState: {
    data: [],
    success: false,
    error: null,
    isLoading: false
  },
  reducers: {
    likeDonate(state, action) {
      state.data.data = {...state.data.data, likes:state.data.data.likes+1}
    },
    unlikeDonate(state, action) {
      state.data.data = {...state.data.data, likes:state.data.data.likes-1}
    }
  },
  // 내부에서 동작하는 함수 외 외부에서 선언해준 함수 동작을 보조하는 기능
  extraReducers: {
    //재능기부 상세목록 받아오기
    [__getDetailDonation.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getDetailDonation.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.data = action.payload; // 받아온 데이터 값을 data에 입력
    },
    [__getDetailDonation.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    //재능기부 생성하기 (생성 후 생성한 게시글 내용 받아옴)
    [__addDonation.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__addDonation.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.data = action.payload; // 받아온 데이터 값을 data에 입력
    },
    [__addDonation.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    //재능기부 수정하기 (수정 후 수정한 게시글 내용 받아옴)
    [__editDonation.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__editDonation.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.data = action.payload; // 받아온 데이터 값을 data에 입력
    },
    [__editDonation.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },


})

export let {likeDonate, unlikeDonate} = detailDonation.actions;

export default detailDonation;