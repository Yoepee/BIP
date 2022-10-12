import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import Swal from "sweetalert2";

// 채팅 대화 내용 불러오기 (eventId = 게시글 번호, page = 50개씩 불러오는 인피니티 스크롤)
export const __getChat = createAsyncThunk(
  "/api/chat/message/{eventId}",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/chat/message?eventId=${payload.id}&page=${payload.page}`, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      })
      return thunkAPI.fulfillWithValue({ data: data.data, page: payload.page });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// createSlice를 통한 redux 생성 - store에서 사용할 수 있는 내용들을 담고 있음
export const chat = createSlice({
  name: "chat",
  initialState: {
    data: [],
    success: false,
    error: null,
    isLoading: false
  },
  reducers: {
    clearChat(state, action) {
      state.data = [];
    }
  },
  // 내부에서 동작하는 함수 외 외부에서 선언해준 함수 동작을 보조하는 기능
  extraReducers: {
    // 대화 내용 불러오기
    [__getChat.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getChat.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      if(!action.payload.data.success){}
      else{
      // 처음으로 데이터 값 불러올때는 배열에 추가식이 아닌 state값 수정
      if (action.payload.page === 0) {
        // 처음 불러오기때 데이터 변경
        if(action.payload.data.data.length!==0)
          state.data = action.payload.data.data.reverse();
      } else {
        // 이후 인피니티 스크롤 시 데이터 앞에 저장

        state.data.unshift(...action.payload.data.data.reverse());
      } // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    }
    },
    [__getChat.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
})

export let {clearChat} = chat.actions;

export default chat;