import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __editComment, __getComment, __removeComment } from "../../redux/modules/comment";
import CommentFooter from "../footer/CommentFooter";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styled from 'styled-components'
import axios from "axios";
import { __addMemberName } from "../../redux/modules/member";

const Comment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment);
  const detailDonation = useSelector((state)=>state.detailDonation);
  const initialState = {
    content: ""
  }
  const [edit, setEdit] = useState(initialState);
  const [chkEdit, setChkEdit] = useState(0);
  const [chkNick, setChkNick] = useState(0);
  const [notify, setNotify] = useState(0);

  useEffect(() => {
    dispatch(__getComment({ id: id, page: 0 }));
  }, [dispatch])

  const editComment = (CommentId) => {
    if (window.confirm("댓글을 수정하시겠습니까?")) {
      dispatch(__editComment({ id: CommentId, data: edit }))
        .then((res) => {
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

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value })
  }

  const __givePoint = async (nickname) => {
    if (window.confirm(`${nickname}님에게 포인트를 주시겠습니까?`)) {
      let a = await axios.put(process.env.REACT_APP_SERVER_HOST + `/api/posts/point/give/${id}`, { nickname: nickname }, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken')
        }
      }).then((res) => {
        console.log(res)
      })
    } else {
      return;
    }
  }

  const __addMember = (nickname) => {
    if (window.confirm(`${nickname}님을 친구로 추가하시겠습니까?`)) {
      dispatch(__addMemberName({ value: nickname }))
        .then((response) => {
          if (response.payload.success === false) {
            alert(response.payload.data);
            return;
          }else{
            alert(`${nickname}님을 친구로 등록했습니다.`)
          }
        })
    } else {
      return;
    }
  }

  return (
    <>
      <div style={{ width: "80%", margin: "10px auto" }}>
        댓글 목록
        <CommentFooter />
        {commentList?.data?.data?.map((comment) => {
          if (comment.id === chkEdit) {
            return (
              <CommentCard key={comment.id}>
                <div style={{ display: "flex", fontWeight: "bold", marginLeft: "10px" }}> <div>{comment.nickname}</div> {comment.nickname === localStorage.getItem("name") ?
                  <div style={{ display: "flex", marginLeft: "auto" }}>
                    <div onClick={() => { editComment(comment.id) }}><CheckIcon /></div>
                    <div onClick={() => { setChkEdit(0) }}><CloseIcon /></div>
                  </div>
                  : null} </div>

                <EditInput name="content" value={edit.content} onChange={onChangeHandler} />
                {/* <div style={{ marginLeft: "auto" }}>{comment.createdAt}</div> */}

              </CommentCard>
            )
          } else {
            return (
              <CommentCard key={comment.id}>
                <div style={{ display: "flex", fontWeight: "bold", marginLeft: "10px" }}> 
                <div onClick={() => { 
                  if(chkNick!==0){setChkNick(0)}
                  else{setChkNick(comment.id)} 
                }}>{comment.nickname}</div>
                {detailDonation?.data?.data?.nickname === localStorage.getItem("name")?
                  chkNick===comment.id&&(<Modaldiv>
                    <OptionMenu onClick={() => { __addMember(comment.nickname) }}>친구추가</OptionMenu>
                    <OptionMenu onClick={() => { __givePoint(comment.nickname) }}>포인트주기</OptionMenu>
                  </Modaldiv>)
                  :chkNick===comment.id&&(<Modaldiv>
                    <div onClick={() => { __addMember(comment.nickname) }}>친구추가</div>
                  </Modaldiv>)}

                  {comment.nickname === localStorage.getItem("name") ?
                    <div style={{ display: "flex", marginLeft: "auto" }}>
                      <div onClick={() => { setChkEdit(comment.id); setEdit({ ...edit, content: comment.content }) }}><EditIcon /></div>
                      <div onClick={() => { removeComment(comment.id) }}><DeleteIcon /></div>
                      <div onClick={() => {  }}><MoreVertIcon /></div>
                    </div>
                    : <div style={{ display: "flex", marginLeft: "auto" }}>
                    <div onClick={() => { if(notify!==0){setNotify(0)}else{setNotify(comment.id)}  }}><MoreVertIcon /></div>
                  </div>}
                  {notify===comment.id?
                  <Modaldiv onClick={()=>{}}>
                    <OptionMenu>신고하기</OptionMenu>
                  </Modaldiv>
                  :null}
                </div>
                <div style={{ marginLeft: "10px" }}>{comment.content}</div>
                <div style={{ marginLeft: "10px", marginRight: "10px", color: "#757575", fontSize: "14px" }}>{comment.createdAt}</div>

              </CommentCard>
            )
          }
        })}
      </div>
    </>
  )
}

export default Comment;

const EditInput = styled.input`
  width: 90%; 
  margin-left: 10px; 
  margin-top:10px;
  border:none; 
  background-color:#e9e9e9;
  outline: none;  
  height: 35px;
  border-radius:10px;
  
`
const CommentCard = styled.div`
  display: flex; 
  flex-direction: column;
  width: 100%; 
  margin: 10px auto;
  padding:10px 5px; 
  border: none; 
  border-radius: 8px;
  box-shadow: rgb(0 0 0 / 10%) 0 1px 20px 0px;
`

const Modaldiv = styled.div`
position:relative;
border: none; 
border-radius: 8px;
box-shadow: rgb(0 0 0 / 10%) 0 1px 20px 0px;
`
const OptionMenu = styled.div`
cursor: pointer;
padding:10px 5px;
border-radius: 8px;
&:hover{
  background-color:#6D09D1;
  color:white;
}`