import { Route, Routes, useNavigate } from "react-router-dom"
import SignUpNickname from "../pages/signup/SignUpNickname"
import SignUp from "../pages/signup/SignUp"
import SignUpEmail from "../pages/signup/SignUpEmail"
import ProfilePage from "../pages/profile/ProfilePage"
import EditProfilePage from "../pages/profile/EditProfilePage"
import DetailProfilePage from "../pages/profile/DetailProfilePage"
import MainPage from "../pages/MainPage"
import IntroPage from "../pages/IntroPage"
import MemberPage from "../pages/MemberPage"
import AddPromisePage from "../pages/promise/AddPromisePage"
import DetailPromisePage from "../pages/promise/DetailPromisePage"
import SignUpChange from "../pages/signup/SignUpChange"
import KakaoPage from "../pages/signup/KakaoPage"
import NaverPage from "../pages/signup/NaverPage"
import PromiseLeaderPage from "../pages/promise/PromiseLeaderPage"
import AddCreditPage from "../pages/profile/AddCreditPage"
import ChatPage from "../pages/ChatPage"
import DonationPage from "../pages/donation/DonationPage"
import AddDonationPage from "../pages/donation/AddDonationPage"
import DetailDonationPage from "../pages/donation/DetailDonationPage"
import MonthlyPage from "../pages/MonthlyPage"
import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { __getLogin } from "../redux/modules/login"
import MyHistoryPage from "../pages/profile/MyHistoryPage"
import  {  NativeEventSource ,  EventSourcePolyfill  }  from  'event-source-polyfill' ;

const Router = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [listening, setListening] = useState(false);

    const [meventSource, msetEventSource] = useState(undefined);

    let eventSource = undefined;


    useEffect(() => {
        let array = window.location.href.split("/");
        let index = array.findIndex((item) => item === "localhost:3000" || item === "berryimportantpromise.com");
        if (array[index + 1] !== "login" && array[index + 1] !== "signup" && array[index + 1] !== "intro") {
            if (localStorage.getItem("Authorization") === null) {
                navigate("/intro")
            }
            if (localStorage.getItem("RefreshToken") === null) {
                navigate("/intro")
            }
            if (localStorage.getItem("name") === null) {
                navigate("/intro")
            }
            __isToken().then(() => {
                dispatch(__getLogin())
                    .then((res) => {
                        if(!res.payload.data){
                            navigate("/intro");
                        }
                    });
            // 알림기능
            __isSSE();
            });
        }
    }, [])

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
        .catch((error)=>{
            localStorage.removeItem('Authorization');
            localStorage.removeItem('RefreshToken');
            localStorage.removeItem('name');
            navigate("/intro")
        })
    }

    const __isSSE= async () => {

        if (!listening) {
            eventSource = new EventSourcePolyfill(process.env.REACT_APP_SERVER_HOST + `/api/member/subscribe`,{
                headers: {
                    Authorization: localStorage.getItem('Authorization'),
                    RefreshToken: localStorage.getItem('RefreshToken'),
              },
              heartbeatTimeout: 1000*60*20,
            }); //구독

            msetEventSource(eventSource);

            
            eventSource.onopen = event => {
                // console.log("connection opened");
            };

            eventSource.onmessage = event => {
                console.log(JSON.parse(event.data))
                // 최초 입장 메세지 출력 x
                if(JSON.parse(event.data).message === "입장"){
                }else if(JSON.parse(event.data).message === "채팅"){
                    if (Notification.permission !== "granted") {
                        Notification.requestPermission().then((permission) => {
                            if (permission === "granted") {
                                /* 권한을 요청받고 nofi를 생성해주는 부분 */
                                const noti = new Notification("읽지않은 채팅이 있습니다.", { body: "채팅을 확인해주세요." });
                                noti.addEventListener("click",()=>{
                                    navigate(`/chat/${JSON.parse(event.data).eventId}`)
                                })
                            }
                        });
                    } else {
                        /* 권한이 있을때 바로 noti 생성해주는 부분 */
                        const noti = new Notification("읽지않은 채팅이 있습니다.", { body: "채팅을 확인해주세요." });
                        noti.addEventListener("click",()=>{
                            navigate(`/chat/${JSON.parse(event.data).eventId}`)
                        })
                    }
                }else if(JSON.parse(event.data).message === "댓글"){
                    if (Notification.permission !== "granted") {
                        Notification.requestPermission().then((permission) => {
                            if (permission === "granted") {
                                /* 권한을 요청받고 nofi를 생성해주는 부분 */
                                const noti = new Notification("새로운 댓글이 있습니다.", { body: "내용을 확인해주세요." });
                                noti.addEventListener("click",()=>{
                                    navigate(`/detaildonation/${JSON.parse(event.data).eventId}`)
                                })
                            }
                        });
                    } else {
                        /* 권한이 있을때 바로 noti 생성해주는 부분 */
                        const noti = new Notification("새로운 댓글이 있습니다.", { body: "내용을 확인해주세요." });
                        noti.addEventListener("click",()=>{
                            navigate(`/detaildonation/${JSON.parse(event.data).eventId}`)
                        })
                    }
                }
                else{
                if (Notification.permission !== "granted") {
                    Notification.requestPermission().then((permission) => {
                        if (permission === "granted") {
                            /* 권한을 요청받고 nofi를 생성해주는 부분 */
                            const noti = new Notification(JSON.parse(event.data).message, { body: "약속을 확인해주세요." });
                            noti.addEventListener("click",()=>{
                                navigate(`/detailpromise/${JSON.parse(event.data).eventId}`)
                            })
                        }
                    });
                } else {
                    /* 권한이 있을때 바로 noti 생성해주는 부분 */
                    const noti = new Notification(JSON.parse(event.data).message, { body: "약속을 확인해주세요." });
                    noti.addEventListener("click",()=>{
                        navigate(`/detailpromise/${JSON.parse(event.data).eventId}`)
                    })
                }
                }
            };

            eventSource.onerror = event => {
                
                if (event.target.readyState === EventSourcePolyfill.CLOSED) {
                    // console.log("eventsource closed (" + event.target.readyState + ")");
                }
                eventSource.close();
            };

            setListening(true);
        }

        return () => {
            eventSource.close();
            
        };

    }

    return (
        <Routes>
            {/* 메인페이지 */}
            <Route path="/" exact element={<MainPage />} />
            {/* 전체달력 확인페이지 */}
            <Route path="/monthly" exact element={<MonthlyPage />} />
            {/* 시작페이지 */}
            <Route path="/intro" exact element={<IntroPage />} />
            {/* 회원가입 */}
            <Route path="/signup" exact element={<SignUp __isSSE={__isSSE} />} />
            {/* 전화번호 변경시 이메일 로그인 */}
            <Route path="/signup/email" exact element={<SignUpEmail/>} />
            {/* 닉네임 설정이 안된 계정 닉네임 설정 페이지 */}
            <Route path="/signup/nickname" exact element={<SignUpNickname __isSSE={__isSSE} />} />
            {/* 카카오 최초 로그인시 휴대폰 번호 설정하도록, 이메일 계정시에는 별도 동작 */}
            <Route path="/signup/change/:type" exact element={<SignUpChange __isSSE={__isSSE} />} />
            {/* 친구목록 */}
            <Route path="/member" exact element={<MemberPage />} />
            {/* 약속 멤버 초대하기 */}
            <Route path="/member/invite:id" exact element={<MemberPage />} />
            {/* 친구 신용도 점수 주기 기능 */}
            <Route path="/member/add:add" exact element={<MemberPage />} />
            {/* 마이페이지 */}
            <Route path="/profile" exact element={<ProfilePage />} />
            {/* 프로필 상세페이지 */}
            <Route path="/detailprofile" exact element={<DetailProfilePage />} />
            {/* 프로필 수정 */}
            <Route path="/editprofile/:type" exact element={<EditProfilePage />} />
            {/* 내역보기 */}
            <Route path="/profile/history/:type" exact element={<MyHistoryPage />} />
            {/* 신용도 구매 */}
            <Route path="/addcredit" exact element={<AddCreditPage />} />
            {/* 약속잡기 */}
            <Route path="/addpromise" exact element={<AddPromisePage />} />
            {/* 약속 수정하기 */}
            <Route path="/addpromise/edit:id" exact element={<AddPromisePage />} />
            {/* 약속 상세보기 */}
            <Route path="/detailpromise/:id" exact element={<DetailPromisePage />} />
            {/* 약속 방장권한 기능 */}
            <Route path="/promiseleader/id=:id/type=:type" exact element={<PromiseLeaderPage />} />
            {/* 재능기부 */}
            <Route path="/donation" exact element={<DonationPage />} />
            {/* 재능기부 추가 */}
            <Route path="/adddonation" exact element={<AddDonationPage />} />
            {/* 재능기부 수정 */}
            <Route path="/adddonation/edit:id" exact element={<AddDonationPage />} />
            {/* 재능기부 상세페이지 */}
            <Route path="/detaildonation/:id" exact element={<DetailDonationPage />} />
            {/* 소셜로그인 */}
            <Route path="/login/kakao" exact element={<KakaoPage __isSSE={__isSSE} />} />
            <Route path="/login/naver" exact element={<NaverPage __isSSE={__isSSE}/>} />
            {/* 채팅 */}
            <Route path="/chat/:id" exact element={<ChatPage />} />
            {/* 없는 페이지 */}
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    )
}

export default Router;