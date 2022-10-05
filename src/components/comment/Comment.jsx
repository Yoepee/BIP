import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __editComment, __getComment, __removeComment } from "../../redux/modules/comment";
import CommentFooter from "../footer/CommentFooter";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Comment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment);
  const initialState = {
    content:""
  }
  const [edit, setEdit] = useState(initialState);
  const [chkEdit, setChkEdit] = useState(0);

  useEffect(() => {
    dispatch(__getComment({ id: id, page: 0 }));
  }, [dispatch])

  const editComment = (CommentId) => {
    if (window.confirm("댓글을 수정하시겠습니까?")) {
      dispatch(__editComment({id:CommentId, data:edit}))
      .then((res)=>{
        setEdit(initialState);
        setChkEdit(0);
      })
    } else {
      return;
    }

  }
  const removeComment = (CommentId) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      dispatch(__removeComment(CommentId))
    } else {
      return;
    }
  }

  const onChangeHandler = (e)=>{
    const {name, value} = e.target;
    setEdit({...edit,[name]:value})
  }

  return (
    <>
      <div>
        댓글 목록
        <CommentFooter />
        {commentList?.data?.data?.map((comment) => {
          if (comment.id === chkEdit) {
            return (
              <div key={comment.id} style={{ display: "flex", border: "1px solid black" }}>
                <div style={{ fontWeight: "bold" }}>{comment.nickname}</div>
                <input name="content" value={edit.content} onChange={onChangeHandler}/>
                {/* <div style={{ marginLeft: "auto" }}>{comment.createdAt}</div> */}
                {comment.nickname === localStorage.getItem("name") ?
                  <div style={{ display: "flex", marginLeft:"auto" }}>
                    <div onClick={() => { editComment(comment.id) }}>수정하기</div>
                    <div onClick={() => { setChkEdit(0)}}>취소</div>
                  </div>
                  : null}
              </div>
            )
          } else {
            return (
              <div key={comment.id} style={{ display: "flex", border: "1px solid black" }}>
                <div style={{ fontWeight: "bold" }}>{comment.nickname}</div>
                <div>{comment.content}</div>
                <div style={{ marginLeft: "auto" }}>{comment.createdAt}</div>
                {comment.nickname === localStorage.getItem("name") ?
                  <div style={{ display: "flex" }}>
                    <div onClick={() => { setChkEdit(comment.id); setEdit({...edit,content:comment.content}) }}><EditIcon /></div>
                    <div onClick={() => { removeComment(comment.id) }}><DeleteIcon /></div>
                  </div>
                  : null}
              </div>
            )
          }
        })}
      </div>
    </>
  )
}

export default Comment;