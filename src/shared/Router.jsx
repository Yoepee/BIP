import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
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
import { clearChat } from "../redux/modules/chat"
import GuidePage from "../pages/profile/GuidePage"


const Router = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [listening, setListening] = useState(false);

    const [meventSource, msetEventSource] = useState(undefined);

    let eventSource = undefined;

    const locationHook = useLocation();
	const [currentLastUrl, setCurrentLastUrl] = useState(null);
    const [currentLastId, setCurrentLastId] = useState(null);
    //?????? ????????? ?????? 
    const exitChat = async(id) => {
        await axios.post(process.env.REACT_APP_SERVER_HOST + `/api/chat/member/disconnect/${id}`, null, {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
            RefreshToken: localStorage.getItem('RefreshToken'),
          }
        });
      }

    useEffect(() => {
        const splitUrl = locationHook?.pathname?.split('/') ?? null;
        const location =
            splitUrl?.length > 1 ? splitUrl[splitUrl.length - 2] : null;
        const lastId = 
            splitUrl?.length > 1 ? splitUrl[splitUrl.length - 1] : null;
        setCurrentLastUrl(location);
        setCurrentLastId(lastId);
        if(currentLastUrl==="chat"){
            __isToken().then(() => {
                dispatch(__getLogin())
                    .then((res) => {
                        if(!res.payload.data){
                            navigate("/intro");
                        }else{
                            exitChat(currentLastId)
                            dispatch(clearChat());
                        }
                    });
                });
        }
    }, [locationHook]);

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
            // ????????????
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
            }); //??????

            msetEventSource(eventSource);

            
            eventSource.onopen = event => {
                // console.log("connection opened");
            };

            eventSource.onmessage = event => {
                // ?????? ?????? ????????? ?????? x
                if(JSON.parse(event.data).message === "??????"){
                }else if(JSON.parse(event.data).message === "??????"){
                    if (Notification.permission !== "granted") {
                        Notification.requestPermission().then((permission) => {
                            if (permission === "granted") {
                                /* ????????? ???????????? nofi??? ??????????????? ?????? */
                                const noti = new Notification(`[${JSON.parse(event.data).title}]???????????? ????????? ????????????.`, { body: "????????? ??????????????????." });
                                noti.addEventListener("click",()=>{
                                    navigate(`/chat/${JSON.parse(event.data).eventId}`)
                                })
                            }
                        });
                    } else {
                        /* ????????? ????????? ?????? noti ??????????????? ?????? */
                        const noti = new Notification(`[${JSON.parse(event.data).title}]???????????? ????????? ????????????.`, { body: "????????? ??????????????????." });
                        noti.addEventListener("click",()=>{
                            navigate(`/chat/${JSON.parse(event.data).eventId}`)
                        })
                    }
                }else if(JSON.parse(event.data).message === "??????"){
                    if (Notification.permission !== "granted") {
                        Notification.requestPermission().then((permission) => {
                            if (permission === "granted") {
                                /* ????????? ???????????? nofi??? ??????????????? ?????? */
                                const noti = new Notification(`[${JSON.parse(event.data).title}]????????? ????????? ????????????.`, { body: "????????? ??????????????????." });
                                noti.addEventListener("click",()=>{
                                    navigate(`/detaildonation/${JSON.parse(event.data).eventId}`)
                                })
                            }
                        });
                    } else {
                        /* ????????? ????????? ?????? noti ??????????????? ?????? */
                        const noti = new Notification(`[${JSON.parse(event.data).title}]????????? ????????? ????????????.`, { body: "????????? ??????????????????." });
                        noti.addEventListener("click",()=>{
                            navigate(`/detaildonation/${JSON.parse(event.data).eventId}`)
                        })
                    }
                }
                else{
                if (Notification.permission !== "granted") {
                    Notification.requestPermission().then((permission) => {
                        if (permission === "granted") {
                            /* ????????? ???????????? nofi??? ??????????????? ?????? */
                            const noti = new Notification(JSON.parse(event.data).message, { body: "????????? ??????????????????." });
                            noti.addEventListener("click",()=>{
                                navigate(`/detailpromise/${JSON.parse(event.data).eventId}`)
                            })
                        }
                    });
                } else {
                    /* ????????? ????????? ?????? noti ??????????????? ?????? */
                    const noti = new Notification(JSON.parse(event.data).message, { body: "????????? ??????????????????." });
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
            {/* ??????????????? */}
            <Route path="/" exact element={<MainPage />} />
            {/* ???????????? ??????????????? */}
            <Route path="/monthly" exact element={<MonthlyPage />} />
            {/* ??????????????? */}
            <Route path="/intro" exact element={<IntroPage />} />
            {/* ???????????? */}
            <Route path="/signup" exact element={<SignUp __isSSE={__isSSE} />} />
            {/* ???????????? ????????? ????????? ????????? */}
            <Route path="/signup/email" exact element={<SignUpEmail/>} />
            {/* ????????? ????????? ?????? ?????? ????????? ?????? ????????? */}
            <Route path="/signup/nickname" exact element={<SignUpNickname __isSSE={__isSSE} />} />
            {/* ????????? ?????? ???????????? ????????? ?????? ???????????????, ????????? ??????????????? ?????? ?????? */}
            <Route path="/signup/change/:type" exact element={<SignUpChange __isSSE={__isSSE} />} />
            {/* ???????????? */}
            <Route path="/member" exact element={<MemberPage />} />
            {/* ?????? ?????? ???????????? */}
            <Route path="/member/invite:id" exact element={<MemberPage />} />
            {/* ?????? ????????? ?????? ?????? ?????? */}
            <Route path="/member/add:add" exact element={<MemberPage />} />
            {/* ??????????????? */}
            <Route path="/profile" exact element={<ProfilePage />} />
            {/* ????????? ??????????????? */}
            <Route path="/detailprofile" exact element={<DetailProfilePage />} />
            {/* ????????? ?????? */}
            <Route path="/editprofile/:type" exact element={<EditProfilePage />} />
            {/* ???????????? */}
            <Route path="/profile/history/:type" exact element={<MyHistoryPage />} />
            {/* ????????? ?????? */}
            <Route path="/addcredit" exact element={<AddCreditPage />} />
            {/* ???????????? */}
            <Route path="/addpromise" exact element={<AddPromisePage />} />
            {/* ?????? ???????????? */}
            <Route path="/addpromise/edit:id" exact element={<AddPromisePage />} />
            {/* ?????? ???????????? */}
            <Route path="/detailpromise/:id" exact element={<DetailPromisePage />} />
            {/* ?????? ???????????? ?????? */}
            <Route path="/promiseleader/id=:id/type=:type" exact element={<PromiseLeaderPage />} />
            {/* ???????????? */}
            <Route path="/donation" exact element={<DonationPage />} />
            {/* ???????????? ?????? */}
            <Route path="/adddonation" exact element={<AddDonationPage />} />
            {/* ???????????? ?????? */}
            <Route path="/adddonation/edit:id" exact element={<AddDonationPage />} />
            {/* ???????????? ??????????????? */}
            <Route path="/detaildonation/:id" exact element={<DetailDonationPage />} />
            {/* ??????????????? */}
            <Route path="/login/kakao" exact element={<KakaoPage __isSSE={__isSSE} />} />
            <Route path="/login/naver" exact element={<NaverPage __isSSE={__isSSE}/>} />
            {/* ?????? */}
            <Route path="/chat/:id" exact element={<ChatPage />} />
            {/* ???????????? ????????? */}
            <Route path="/profile/guide" exact element={<GuidePage/>} />
            {/* ?????? ????????? */}
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    )
}

export default Router;