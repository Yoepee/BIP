import { createSlice } from "@reduxjs/toolkit";
 
//카카오 네이버 로그인시 정보 수집용도
export const social = createSlice({
    name:"social",
    initialState: {
        data: {},
        success: false,
        error: null,
        isLoading: false
      },
    reducers:{
      // 소셜로그인 시, 데이터 저장용도 (닉네임, 번호 유무 확인)
      readSocial(state,action){
        state.data = action.payload
      }
    },
})

export let {readSocial} = social.actions;

export default social;