import { Margin } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { __addComment } from "../../redux/modules/comment";
import styled from 'styled-components'

const CommentFooter = () =>{
  const {id} = useParams();
  const dispatch = useDispatch();
  const initialState = {
    content:""
  }
  const [comment, setComment] = useState(initialState);

  const onChangeHandler = (e)=>{
    const {name, value} = e.target;
    setComment({...comment,[name]:value});
  }

  const AddComment= () =>{
    if (comment.content=== "") {
      return;
    }
    dispatch(__addComment({id:id,data:comment}))
    .then((res)=>{
      setComment(initialState);
    })
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      AddComment();
    }
  }

  return (
    <CommentWrap>
      <div style={{width:"93%", backgroundColor:"#e9e9e9", borderRadius:"20px", height:"40px"}}>
          <CommentInput  onKeyPress={handleKeyPress} placeholder="댓글 작성" name="content" value={comment.content} onChange={onChangeHandler}/>
      </div>
      
      <CommentBtn onClick={()=>{ AddComment() }}>작성</CommentBtn>
    </CommentWrap>
  )
}

export default CommentFooter;
const CommentWrap = styled.div`
  display: flex;
  margin: 5px auto;
  @media screen and (min-width: 769px) {
    max-width: 1400px;
  }
`
const CommentInput = styled.input`
  width:80%; 
  height: 35px;
  margin-left:30px; 
  outline: none;
  border: none; 
  border-radius: 10px;
  background-color:#e9e9e9;
`

const CommentBtn = styled.div`
  background-color: #D9DCFB;
  margin-left: 10px;
  padding:0 3.5%;
  width:35px; 
  line-height: 35px;
  border: 1px solid #FAFAFA;
  border-radius: 20px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  cursor:pointer;
  &:hover{
    color:white;
    background-color:#3E09D1;
  }
`