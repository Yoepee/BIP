import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __invitePromise } from "../../redux/modules/detailPromise";
import { __getMember, removeFriend } from "../../redux/modules/member";

const Member = ({type, setType}) =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const member = useSelector((state)=>state.member);
  const {id} = useParams();

  console.log(id)

  useEffect(()=>{
    dispatch(__getMember());
  },[dispatch])
  console.log(member)
  const removeMember = async(id) =>{
    if(window.confirm("정말로 친구삭제 하시겠습니까?")){
    let a = await axios.delete(process.env.REACT_APP_SERVER_HOST+`/api/friends/${id}`,{
      headers: {
          Authorization:localStorage.getItem('Authorization'),
          RefreshToken:localStorage.getItem('RefreshToken')
      }}).then((response)=>{
        dispatch(removeFriend(id));
        setType(0);
      })
      return;
    }else{
      return;
    }
  }

  const giveName =async(nickname)=>{
    let name = prompt("변경할 별명을 지어주세요.");
    let a = await axios.put(process.env.REACT_APP_SERVER_HOST+`/api/friends/secondName`,{friendNickname:nickname, secondName:name},{
      headers: {
          Authorization:localStorage.getItem('Authorization'),
          RefreshToken:localStorage.getItem('RefreshToken')
      }}).then((response)=>{
        console.log(response);
      })
      return;
  }

  const inviteMember = async(nickname)=>{
    if(window.confirm(`${nickname}님을 약속에 초대하시겠습니까?`)){
    dispatch(__invitePromise({id:id, nickname:nickname}))
      .then((response)=>{
        navigate(`/detailpromise/${id}`)
      })
      return;
    }else{
      return;
    }
  }

  return (
    <div>
      <div style={{ margin:"10px"}}>
        {member?.data?.data?.map((friend, i)=>{
          return (
            <div style={{display:"flex", border:"1px solid black", margin:"10px"}} key={i} 
            onClick={()=>{
              if(type==="none"){
                if(id!==undefined){
                  inviteMember(friend.nickname);
                }
                return;
              }else if(type==="give"){
                giveName(friend.nickname);
                }
              else if(type==="remove"){
                removeMember(friend.id);
              }
            }}>
            {friend.profileImgUrl===null?
            <img src={process.env.PUBLIC_URL + `/assets/user_svg.svg`} style={{width:"50px"}}/>
            :<img src={friend.profileImgUrl} style={{width:"50px"}}/>
            }
            <p>{friend.nickname}</p>
            <p>({friend.nickname})</p>
            <p style={{marginLeft:"auto", marginRight:"2%"}}>{friend.creditScore}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Member;