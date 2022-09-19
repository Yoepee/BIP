import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProEdit from "./ProEdit";

const ProEditText = () => {
    const navigate = useNavigate();
    const {type} = useParams();
    const [name,setName] = useState("");
    return (
        <div>
            <ProEdit type={type} name={name} setName={setName}/>
            <div>
                <button
                onClick={()=>{
                    navigate("/detailprofile")
                }}>프로필 변경</button>
            </div>
        </div>
    )
}

export default ProEditText;