import { useNavigate } from "react-router-dom";
import axios from "axios";


const Option6 = ({head}) =>{
  
    const navigate = useNavigate()
    const logoutHandle = async() => {
        const data  = await axios.post(process.env.REACT_APP_SERVER_HOST+"/api/member/logout",null,{
            headers: {
                Authorization: localStorage.getItem('Authorization'),
                RefreshToken: localStorage.getItem('RefreshToken'),
          }})
        localStorage.removeItem('Authorization')
        localStorage.removeItem('RefreshToken')
        localStorage.removeItem('name')
        
        console.log(data)
    }
    return (
      <>
      <div style={{marginLeft:"1%"}}>
          <p>{head}</p>
          
        </div>
        <div onClick={ logoutHandle
            // () => { 
            // navigate("/intro")
        // }
             } 
            style={{ marginLeft: "auto", marginRight: "2%" }}>
        <p>로그아웃</p>
      </div>
      </>
    )
  }
  
  export default Option6;