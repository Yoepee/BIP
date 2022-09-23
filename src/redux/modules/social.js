import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
 
// createSlice를 통한 redux 생성 - store에서 사용할 수 있는 내용들을 담고 있음
export const social = createSlice({
    name:"social",
    initialState: {
        data: {},
        success: false,
        error: null,
        isLoading: false
      },
    reducers:{
      readSocial(state,action){
        state.data = action.payload
      }
    },
})

export let {readSocial} = social.actions;

export default social;