import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import Swal from "sweetalert2";

// 친구목록 불러오기
export const __getMember = createAsyncThunk(
  "/api/friends",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(process.env.REACT_APP_SERVER_HOST + "/api/friends", {
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

// 닉네임 친구추가 (받아오는 값 : {value:"닉네임"})
export const __addMemberName = createAsyncThunk(
  "api/friends/nickname",
  async (payload, thunkAPI) => {
    try {
      console.log(payload)
      const data = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/friends/nickname", payload, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken')
        }
      })
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
);

//휴대폰번호 친구추가 (받아오는 값 : {value:"휴대폰 번호"})
export const __addMemberPhone = createAsyncThunk(
  "/api/friends/phonenumber",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/friends/phonenumber", payload, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken')
        }
      })
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
);

// 닉네임으로 친구 검색 (멤버 닉네임을 쿼리스트링 값으로 전달 : url경로 참고)
export const __searchFriendName = createAsyncThunk(
  "/api/friends/search/?q=name&type=name",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/friends/search/?q=${payload}&type=name`, {
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

// 휴대폰으로 친구 검색 (휴대폰 번호를 쿼리스트링 값으로 전달 : url경로 참고)
export const __searchFriendPhone = createAsyncThunk(
  "/api/friends/search/?q=phone&type=phone",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/friends/search/?q=${payload}&type=phone`, {
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

export const __secondName = createAsyncThunk(
  "/api/friends/secondname",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.put(process.env.REACT_APP_SERVER_HOST + "/api/friends/secondname", payload, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken')
        }
      })
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
);


// createSlice를 통한 redux 생성 - store에서 사용할 수 있는 내용들을 담고 있음
export const member = createSlice({
  name: "member",
  initialState: {
    data: [],
    success: false,
    error: null,
    isLoading: false
  },
  reducers: {
    // 친구삭제 하고 스테이트 내용 수정
    removeFriend(state, action) {
      let index = state.data.data.findIndex(member => member.id === action.payload);
      state.data.data.splice(index, 1);
    },
    // 별명 바꾸고 state값 수정
    giveNickname(state, action) {
      let index = state.data.data.findIndex(member => member.nickname === action.payload.nicknmae);
      state.data.data.splice(index, 1, { ...state.data.data[index], name: action.payload.name });
    }
  },
  // 내부에서 동작하는 함수 외 외부에서 선언해준 함수 동작을 보조하는 기능
  extraReducers: {
    // 멤버정보 받아오기
    [__getMember.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getMember.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.data = action.payload; // 서버에서 가져온 친구목록을 넣습니다.
    },
    [__getMember.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    // 닉네임 추가
    [__addMemberName.pending]: (state) => {
      state.isLoading = true;
    },
    [__addMemberName.fulfilled]: (state, action) => {
      state.isLoading = false;
      // 실패시 동작x
      if (action.payload.success === false) { }
      // 성공시 친구 값 추가
      else {
        state.data.data?.push(action.payload.data);
      }
    },
    [__addMemberName.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 휴대폰 번호 친구추가
    [__addMemberPhone.pending]: (state) => {
      state.isLoading = true;
    },
    [__addMemberPhone.fulfilled]: (state, action) => {
      state.isLoading = false;
      // 실패시 동작x
      if (action.payload.success === false) { }
      // 성공시 친구 값 추가
      else {
        state.data.data?.push(action.payload.data);
      }
    },
    [__addMemberPhone.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 닉네임 친구 검색
    [__searchFriendName.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__searchFriendName.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      // 실패시 동작x
      if (action.payload.success === false) { }
      // 친구목록 검색 (받은데이터를 배열형식으로 저장 (기존에 map함수로 나와서))
      else {
        state.data.data = action.payload.data
      }
    },
    [__searchFriendName.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    //전화번호 친구검색
    [__searchFriendPhone.pending]: (state) => {
      state.isLoading = true;
    },
    [__searchFriendPhone.fulfilled]: (state, action) => {
      state.isLoading = false;
      // 실패시 동작x
      if (action.payload.success === false) { }
      // 친구목록 검색 (받은데이터를 배열형식으로 저장 (기존에 map함수로 나와서))
      else {
        state.data.data = action.payload.data
      }
    },
    [__searchFriendPhone.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //별명붙이기
    [__secondName.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__secondName.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      const index = state.data.data.findIndex(user => user.nicknameByFriend === action.payload.data.nicknameByFriend);
      state.data.data.splice(index, 1, { ...state.data.data[index], nicknameByOwner: action.payload.data.nicknameByOwner })
    },
    [__secondName.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
})

export let { removeFriend } = member.actions

export default member;