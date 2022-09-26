import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import PromiseLeader from "../../components/main/list/PromiseLeader";

const PromiseLeaderPage = () =>{
  const {type}= useParams();
  return (
    <>
    {type==="leader"?
    <Header option={0} head={"방장 위임"}/>
    :<Header option={0} head={"멤버 조정"}/>
    }
    <PromiseLeader/>
    </>
  )
}

export default PromiseLeaderPage;