import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { __addComment } from "../../redux/modules/comment";

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
    <div style={{display:"flex"}}>
      <input onKeyPress={handleKeyPress} placeholder="댓글 작성" name="content" value={comment.content} onChange={onChangeHandler}/>
      <div
      onClick={()=>{
        AddComment()
      }}>작성</div>
    </div>
  )
}

export default CommentFooter;