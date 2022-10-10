import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import Swal from "sweetalert2";

// 게시물 댓글 (스트링 쿼리 : postId:게시물 id, page: 댓글 페이지 (댓글 30개씩))
export const __getComment = createAsyncThunk(
  "/api/comment?postId=게시물id&page=댓글 페이지",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/comments?postId=${payload.id}&page=${payload.page}`, {
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
// 댓글 생성
export const __addComment = createAsyncThunk(
  "/api/comment/{postid}",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(process.env.REACT_APP_SERVER_HOST + `/api/comments/${payload.id}`, payload.data, {
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
// 댓글 수정 
export const __editComment = createAsyncThunk(
  "/api/comment/update/{commentId}",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.put(process.env.REACT_APP_SERVER_HOST + `/api/comments/update/${payload.id}`, payload.data, {
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
// 댓글 삭제
export const __removeComment = createAsyncThunk(
  "/api/comment/delete/{commentId}",
  async (payload, thunkAPI) => {
    try {
      console.log(payload)
      const data = await axios.put(process.env.REACT_APP_SERVER_HOST + `/api/comments/delete/${payload}`, null, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      })
      if (data.data.success === false)
        Swal.fire(data.data.data, "　", "error");
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// createSlice를 통한 redux 생성 - store에서 사용할 수 있는 내용들을 담고 있음
export const comment = createSlice({
  name: "comment",
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
    //댓글 목록 받아오기
    [__getComment.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getComment.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.data = action.payload; // 받아온 데이터 값을 data에 입력
    },
    [__getComment.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    // 댓글 추가
    [__addComment.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__addComment.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.data.data.unshift(action.payload.data); // 받아온 데이터 값을 data에 입력
    },
    [__addComment.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    // 댓글 수정
    [__editComment.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__editComment.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      const index = state.data.data.findIndex(user => user.id === action.payload.data.id);
      state.data.data.splice(index, 1, { ...state.data.data[index], content: action.payload.data.content })
    },
    [__editComment.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    // 댓글 삭제
    [__removeComment.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__removeComment.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      console.log(action.payload)
      const index = state.data.data.findIndex(user => user.id === action.payload);
      state.data.data.splice(index, 1, { ...state.data.data[index], content: "댓글 작성자가 삭제한 댓글입니다." })
    },
    [__removeComment.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },


})

export default comment;