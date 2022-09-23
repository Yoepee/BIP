import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import base from "../../img/baseProfile.jpg"
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { __getProfile } from "../../redux/modules/profile";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = useSelector((state)=>state.profile);

    useEffect(()=>{
        dispatch(__getProfile());
    },[dispatch])
    console.log(profile)
    return (
        <div>
            <div>
                <Prodiv onClick={() => { navigate("/detailprofile") }}>
                    {!profile?.data?.data?.profileImgUrl?
                    <img src={base} width="20%" style={{ margin: "20px", borderRadius: "50%" }} />
                    :<img src={profile?.data?.data?.profileImgUrl} width="20%" style={{ margin: "20px", borderRadius: "50%" }} />}
                    <div>
                        <p>{profile?.data?.data?.nickname}</p>
                        <p>{profile?.data?.data?.phoneNumber}</p>
                        {profile?.data?.data?.email?
                        <p>{profile?.data?.data?.email}</p>
                        :<p>이메일 정보를 입력해야 <br/>휴대폰 분실 시 접속할 수 있습니다.</p>}
                    </div>
                    <div style={{ marginLeft: "auto", alignItems: "center", display: "flex" }}>
                        <p><ArrowForwardIosRoundedIcon /></p>
                    </div>
                </Prodiv>
                <div style={{borderBottom:"1px solid black"}}>
                    <p>점수 : {profile?.data?.data?.point}</p>
                    <p>신용도 : {profile?.data?.data?.creditScore}</p>
                    <p>약속이행 : {profile?.data?.data?.numOfDone}</p>
                </div>
                <Prodiv>
                    <p>활동 내역</p>
                </Prodiv>
            </div>
        </div>
    )
}

export default Profile;

const Prodiv = styled.div`
display:flex;
border-bottom:1px solid black;
`