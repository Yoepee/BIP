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
import Swal from "sweetalert2";

const Comment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment);
  const detailDonation = useSelector((state) => state.detailDonation);
  const initialState = {
    content: ""
  }
  const [edit, setEdit] = useState(initialState);
  const [chkEdit, setChkEdit] = useState(0);
  const [chkNick, setChkNick] = useState(0);
  const [notify, setNotify] = useState(0);

  const __isToken = async () => {
    await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/member/reissue`, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken'),
      }
    }
    ).then((res) => {
      if (res.data.success) {
        localStorage.setItem("Authorization", res.headers.authorization);
        localStorage.setItem("RefreshToken", res.headers.refreshtoken);
      }
    })
  }

  useEffect(() => {
    __isToken().then(()=>{
    dispatch(__getComment({ id: id, page: 0 }));
    })
  }, [dispatch, id])

  const editComment = (CommentId) => {
    Swal.fire({
      title: `댓글을 수정하시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: '#3E09D1',
      cancelButtonColor: 'tomato',
      confirmButtonText: '수정',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(__editComment({ id: CommentId, data: edit }))
          .then(() => {
            setEdit(initialState);
            setChkEdit(0);
          })
      }
    })
  }
  const removeComment = (CommentId) => {
    Swal.fire({
      title: `댓글을 삭제하시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: '#3E09D1',
      cancelButtonColor: 'tomato',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(__removeComment(CommentId))
      }
    })
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value })
  }

  const __givePoint = async (nickname) => {
    Swal.fire({
      title: `${nickname}님에게 포인트를 전달하시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: '#3E09D1',
      cancelButtonColor: 'tomato',
      confirmButtonText: '전달',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.put(process.env.REACT_APP_SERVER_HOST + `/api/posts/point/give/${id}`, { nickname: nickname }, {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
            RefreshToken: localStorage.getItem('RefreshToken')
          }
        }).then((res) => {
          console.log(res)
          if(res.data.success===false){
            Swal.fire(res.data.data, "　", 'error')
          }else{
            Swal.fire(res.data.data.message, "　", 'success')
          }
        })
      }
    })
  }

  const __addMember = (nickname) => {
    Swal.fire({
      title: `${nickname}님을 친구로 추가하시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: '#3E09D1',
      cancelButtonColor: 'tomato',
      confirmButtonText: '추가',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(__addMemberName({ value: nickname }))
          .then((response) => {
            if (response.payload.success === false) {
              Swal.fire(response.payload.data, '　', 'error');
              return;
            } else {
              Swal.fire(`${nickname}님을 친구로 등록했습니다.`, '　', "success")
            }
          })
      }
    })
  }

  const __notifyComment= async(commentId) =>{
    Swal.fire({
      title: `댓글작성자를 신고하시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: '#3E09D1',
      cancelButtonColor: 'tomato',
      confirmButtonText: '신고',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
    await axios.post(process.env.REACT_APP_SERVER_HOST+`/api/comments/report/${commentId}`, null, {
      headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
    }}).then((res)=>{
      console.log(res)
      if(res.data.success){
        Swal.fire(res.data.data, "　", "success");
      }else{
        Swal.fire(res.data.data, "　", "error");
      }
    })
    }
  })
  }

  return (
    <>
      <CommentWrap>
        댓글 목록
        <CommentFooter />
        {commentList?.data?.data?.map((comment) => {
          if (comment.id === chkEdit) {
            return (
              <CommentCard key={comment.id}>
                <div style={{ display: "flex", marginLeft: "10px" }}> <div>{comment.nickname}</div> {comment.nickname === localStorage.getItem("name") ?
                  <div style={{ display: "flex", marginLeft: "auto" }}>
                    <div style={{paddingRight:"2px", cursor:"pointer", color:"green"}} onClick={() => { __isToken().then(()=>{editComment(comment.id)}) }}><CheckIcon /></div>
                    <div style={{paddingRight:"2px", cursor:"pointer", color:"tomato"}} onClick={() => { setChkEdit(0) }}><CloseIcon /></div>
                  </div>
                  : null} </div>

                <EditInput name="content" value={edit.content} onChange={onChangeHandler} />
                {/* <div style={{ marginLeft: "auto" }}>{comment.createdAt}</div> */}
              </CommentCard>
            )
          } else {
            return (
              <CommentCard key={comment.id}>
                <div style={{ display: "flex", marginLeft: "10px" }}>
                  <Nickname onClick={() => {
                    if (chkNick !== 0) { setChkNick(0) }
                    else { setChkNick(comment.id); setNotify(0); }
                  }}>{comment.nickname}</Nickname>
                  {detailDonation?.data?.data?.nickname === localStorage.getItem("name") ?
                    chkNick === comment.id && (<ModalLeft>
                      <OptionMenu onClick={() => { __isToken().then(()=>{__addMember(comment.nickname)}) }}>친구추가</OptionMenu>
                      <OptionMenu onClick={() => { __isToken().then(()=>{__givePoint(comment.nickname)}) }}>포인트 전달</OptionMenu>
                    </ModalLeft>)
                    : chkNick === comment.id && (<ModalLeft>
                      <OptionMenu onClick={() => { __isToken().then(()=>{__addMember(comment.nickname)}) }}>친구추가</OptionMenu>
                    </ModalLeft>)}

                  {comment.nickname === localStorage.getItem("name") ?
                    <div style={{ display: "flex", marginLeft: "auto" }}>
                      <div style={{paddingRight:"2px", cursor:"pointer", color:"#6B68F3"}} onClick={() => { setChkEdit(comment.id); setEdit({ ...edit, content: comment.content }) }}><EditIcon /></div>
                      <div style={{paddingRight:"2px", cursor:"pointer", color:"#6B68F3"}} onClick={() => { __isToken().then(()=>{removeComment(comment.id)}) }}><DeleteIcon /></div>
                      <div style={{paddingRight:"2px", cursor:"pointer", color:"#6B68F3"}} onClick={() => { if (notify !== 0) { setNotify(0) } else { setNotify(comment.id);setChkNick(0); } }}><MoreVertIcon /></div>
                    </div>
                    : <div style={{ display: "flex", marginLeft: "auto" }}>
                      <div style={{paddingRight:"2px", cursor:"pointer", color:"#6B68F3"}} onClick={() => { if (notify !== 0) { setNotify(0) } else { setNotify(comment.id);setChkNick(0); } }}><MoreVertIcon /></div>
                    </div>}
                  {notify === comment.id ?
                    <ModalRight>
                      <OptionMenu onClick={()=>{__isToken().then(()=>{__notifyComment(comment.id)})}}>신고하기</OptionMenu>
                    </ModalRight>
                    : null}
                </div>
                <div style={{ marginLeft: "10px" }}>{comment.content}</div>
                <div style={{ marginLeft: "10px", marginRight: "10px", color: "#757575", fontSize: "14px" }}>{comment.createdAt}</div>

              </CommentCard>
            )
          }
        })}
      </CommentWrap>
    </>
  )
}

export default Comment;

const CommentWrap = styled.div`
    @media screen and (min-width: 769px) {
    max-width: 1400px;
  }
  width: 80%;
  margin: 10px auto;
`

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
  position: relative;
`
const Nickname = styled.div`
  cursor: pointer;
  font-weight: bold;
  &:hover {
    color: #3E09D1;
  }
`

const ModalLeft = styled.div`
background-color: #FAFAFA;
position: absolute;
top: 36px;
border: 1px solid #e0e0e0; 
box-shadow: rgb(0 0 0 / 10%) 0 1px 20px 0px;
border-radius: 8px;
`
const ModalRight = styled.div`
background-color: #FAFAFA;
position: absolute;
top: 36px;
right: 10px;
border: 1px solid #e0e0e0; 
box-shadow: rgb(0 0 0 / 10%) 0 1px 20px 0px;
border-radius: 8px;
`

const OptionMenu = styled.div`
font-size: 14px;
cursor: pointer;
padding:5px 8px;
text-align: center;
/* border-radius: 8px; */
&:hover{
  border-radius: 7px;
  background-color:#3E09D1;
  color:white;
}`