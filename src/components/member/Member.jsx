import axios from "axios";
import styled from "styled-components"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __invitePromise } from "../../redux/modules/detailPromise";
import { __getMember, removeFriend } from "../../redux/modules/member";

const Member = ({type, setType}) =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const member = useSelector((state)=>state.member);
  const {id, add} = useParams();


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

  const __addFriendCredit = async(nickname,num) =>{
    if(window.confirm(`${nickname}님의 신용점수를 ${num}점 구매하시겠습니까?`)){
    let a = await axios.put(process.env.REACT_APP_SERVER_HOST+`/api/user/point`,{point:2000*num, nickname:nickname},{
      headers: {
          Authorization:localStorage.getItem('Authorization'),
          RefreshToken:localStorage.getItem('RefreshToken')
      }}).then((response)=>{
        console.log(response);
        if(response.data.success){
          alert(response.data.data.context);
        navigate("/addcredit");
        setType("none");
        }
      })
      return;
    }else{
      return;
    }
  }

  return (
    <div>
      <Wrap>
        {member?.data?.data?.map((friend, i)=>{
          return (
            <Card key={i} 
            onClick={()=>{
              if(type==="none"){
                if(id!==undefined){
                  inviteMember(friend.nickname);
                }else if(add!==undefined){
                  __addFriendCredit(friend.nickname, add)
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
            <ProfileImg src={process.env.PUBLIC_URL + `/assets/user_svg.svg`} />
            :<ProfileImg src={friend.profileImgUrl} />
            }
            <Username>{friend.nickname}</Username>
            <Nickname>({friend.nickname})</Nickname>
            <Credit><span>C</span>{friend.creditScore}</Credit>
            </Card>
          )
        })}
      </Wrap>
    </div>
  )
}

export default Member;

const Wrap = styled.div`
  /* background-color: green; */
  width: 80%;
  margin: 50px auto;
  /* font-family: "NotoSansKR-Regular"; */
  /* font-family: "YUniverse-B"; */
  /* font-family: "YiSunShin-B"; */
  /* font-family: "Hambak"; */
  font-family: "GowunDodum";
  /* font-family: "Mimiworld-B"; */
  /* font-family: "Mimiworld-R"; */

  @media screen and (min-width: 769px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    
  }
`

const Card = styled.div`
display:flex;
height: 80px;
border:none;
border-radius: 8px;
background-color: #F5EAFB;
margin:10px;
padding-right: 10px;
position: relative;

  @media screen and (min-width: 769px) {
    width: 150px;
    font-size: 12px;
    box-shadow: 0px 5px 5px 0px rgba(144, 144, 144, 0.5);
    :hover{
      transform: translateY(-5px);
      box-shadow: 0px 10px 10px 2px rgba(144, 144, 144, 0.25);
    }
  }
`

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 15px;
  @media screen and (min-width: 769px) {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: auto 0;
    margin-left: 10px;
  }
`

const Username = styled.p`
  @media screen and (min-width: 769px) {
    font-size: 12px;
    font-weight: bold;
    position: absolute;
    left: 48px;
    top: 12px;
  }
`

const Nickname = styled.p`
  @media screen and (min-width: 769px) {
      font-size: 11px;
      position: absolute;
      left: 48px;
      top: 28px;
  }
`

const Credit = styled.p`  
  /* background-color: blue; */
  height: 20px;
  margin-left: auto;
  margin-right: 2%;
  display: flex;
  span {
    background-color: #EDFFEB;
    border-radius: 50%;
    width: 20px;
    text-align: center;
    margin-right: 1px;
  }
  @media screen and (min-width: 769px) {
    font-size: 10px;
    position: absolute;
    right: 5px;
    height: 12px;
    span {
      width: 12px;
    }
  }
`