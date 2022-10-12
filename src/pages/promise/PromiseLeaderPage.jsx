import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import WebHeader from "../../components/header/WebHeader";
import PromiseLeader from "../../components/main/list/PromiseLeader";

// 약속 상세 방장권한
const PromiseLeaderPage = () =>{
  const {type}= useParams();
  return (
    <>
    <WebHeader />
    {type==="leader"?
    <Header option={0} head={"방장 위임"}/>
    :<Header option={0} head={"멤버 조정"}/>
    }
    <PromiseLeader/>
    </>
  )
}

export default PromiseLeaderPage;