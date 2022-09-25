import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

  export const __getMember = createAsyncThunk(
    "/api/friends",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.get(process.env.REACT_APP_SERVER_HOST+"/api/friends", {
                headers: {
                    Authorization: localStorage.getItem('Authorization'),
                    RefreshToken: localStorage.getItem('RefreshToken'),
              }})
            if(data.data.success===false)
              alert(data.data.error.message);
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );


  export const __addMemberName =  createAsyncThunk(
    "api/friends/nickname",
     async(payload, thunkAPI) => {
        try{
          console.log(payload)
            const data = await axios.post(process.env.REACT_APP_SERVER_HOST+"/api/friends/nickname",payload,{
                headers: {
                    Authorization:localStorage.getItem('Authorization'),
                    RefreshToken:localStorage.getItem('RefreshToken')
                }})
                return thunkAPI.fulfillWithValue(data.data);
             } catch(error){
                return thunkAPI.rejectWithValue(error)
             }
     }
    );
    export const __addMemberPhone =  createAsyncThunk(
      "/api/friends/phonenumber",
       async(payload, thunkAPI) => {
          try{
            console.log(payload)
              const data = await axios.post(process.env.REACT_APP_SERVER_HOST+"/api/friends/phonenumber",payload,{
                  headers: {
                      Authorization:localStorage.getItem('Authorization'),
                      RefreshToken:localStorage.getItem('RefreshToken')
                  }})
                  return thunkAPI.fulfillWithValue(data.data);
               } catch(error){
                  return thunkAPI.rejectWithValue(error)
               }
       }
      );

      export const __searchFriendName = createAsyncThunk(
        "/api/friends/search/?q=name&type=name",
        async (payload, thunkAPI) => {
            try {
              console.log(payload)
                const data =  await axios.get(process.env.REACT_APP_SERVER_HOST+`/api/friends/search/?q=${payload}&type=name`, {
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
    
      export const __searchFriendPhone = createAsyncThunk(
        "/api/friends/search/?q=phone&type=phone",
        async (payload, thunkAPI) => {
            try {
              console.log(payload)
                const data =  await axios.get(process.env.REACT_APP_SERVER_HOST+`/api/friends/search/?q=${payload}&type=phone`, {
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


// createSlice를 통한 redux 생성 - store에서 사용할 수 있는 내용들을 담고 있음
export const member = createSlice({
    name:"member",
    initialState: {
        data: [],
        success: false,
        error: null,
        isLoading: false
      },
    reducers:{
      removeFriend(state,action){
        let  index = state.data.data.findIndex(member =>  member.id === action.payload);
        state.data.data.splice(index,1);
      },
      giveNickname(state,action){
        let  index = state.data.data.findIndex(member =>  member.nickname === action.payload.nicknmae);
        state.data.data.splice(index,1,{...state.data.data[index],name:action.payload.name});
      }
    },
    // 내부에서 동작하는 함수 외 외부에서 선언해준 함수 동작을 보조하는 기능
    extraReducers: {
        [__getMember.pending]: (state) => {
          state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__getMember.fulfilled]: (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
          state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__getMember.rejected]: (state, action) => {
          state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
          state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
        
        [__addMemberName.pending]:(state) =>{
          state.isLoading = true;
        },
        [__addMemberName.fulfilled]: (state, action) => {
          state.isLoading = false;
          if(action.payload.success===false){}
          else{
            state.data.data?.push(action.payload.data);
          }
          
        },
        [__addMemberName.rejected]: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },

        [__addMemberPhone.pending]:(state) =>{
          state.isLoading = true;
        },
        [__addMemberPhone.fulfilled]: (state, action) => {
          state.isLoading = false;
          if(action.payload.success===false){}
          else{
            state.data.data?.push(action.payload.data);
          }
        },
        [__addMemberPhone.rejected]: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
        
        [__searchFriendName.pending]: (state) => {
          state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__searchFriendName.fulfilled]: (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
          if(action.payload.success===false){}
          else{
          state.data.data = [action.payload.data]} // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__searchFriendName.rejected]: (state, action) => {
          state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
          state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
        
        [__searchFriendPhone.pending]:(state) =>{
          state.isLoading = true;
        },
        [__searchFriendPhone.fulfilled]: (state, action) => {
          state.isLoading = false;
          if(action.payload.success===false){}
          else{
          state.data.data = [action.payload.data]}  
        },
        [__searchFriendPhone.rejected]: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      },
})

export let {removeFriend} = member.actions

export default member;