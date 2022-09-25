import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


  export const __searchName = createAsyncThunk(
    "/api/search/?q=name&type=name",
    async (payload, thunkAPI) => {
        try {
          console.log(payload)
            const data =  await axios.get(process.env.REACT_APP_SERVER_HOST+`/api/search/?q=${payload.value}&type=name`, {
                headers: {
                    Authorization: localStorage.getItem('Authorization'),
                    RefreshToken: localStorage.getItem('RefreshToken'),
              }})
              console.log(data)
            if(data.data.success===false)
              alert(data.data.data);
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );

  export const __searchPhone = createAsyncThunk(
    "/api/search/?q=phone&type=phone",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.get(process.env.REACT_APP_SERVER_HOST+`/api/search/?q=${payload.value}&type=phone`, {
                headers: {
                    Authorization: localStorage.getItem('Authorization'),
                    RefreshToken: localStorage.getItem('RefreshToken'),
              }})
              if(data.data.success===false)
              alert(data.data.data);
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );


// createSlice를 통한 redux 생성 - store에서 사용할 수 있는 내용들을 담고 있음
export const searchMember = createSlice({
    name:"searchMember",
    initialState: {
        data: [],
        success: false,
        error: null,
        isLoading: false
      },
    reducers:{
      clearSearch(state,action){
        state.data=[];
      }
    },
    // 내부에서 동작하는 함수 외 외부에서 선언해준 함수 동작을 보조하는 기능
    extraReducers: {
        [__searchName.pending]:(state) =>{
          state.isLoading = true;
        },
        [__searchName.fulfilled]: (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        },
        [__searchName.rejected]: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },

        [__searchPhone.pending]: (state) => {
          state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__searchPhone.fulfilled]: (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
          state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__searchPhone.rejected]: (state, action) => {
          state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
          state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
        
      },
})

export let {clearSearch} = searchMember.actions;

export default searchMember;