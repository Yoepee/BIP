import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import WebHeader from "../../components/header/WebHeader";
import MyHistory from "../../components/profile/menu/MyHistory";

const MyHistoryPage = () =>{
  const {type} = useParams();
  return (
    <>
    <WebHeader />
    {type==="like"&&<Header head={"관심목록"} option={0}/>}
    {type==="promise"&&<Header head={"약속내역"} option={0}/>}
    {type==="write"&&<Header head={"작성목록"} option={0}/>}
    <MyHistory/>
    </>
  )
}

export default MyHistoryPage;