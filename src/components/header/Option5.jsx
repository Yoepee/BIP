import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { __searchName, __searchPhone } from '../../redux/modules/searchMember';

const Option5 = ({ head, payload }) => {
  const dispatch = useDispatch();
  
  const searchMemberName = () => {
    dispatch(__searchName(payload));
   }
   const searchMemberPhone = () => {
    dispatch(__searchPhone(payload));
   }

  return (
    <>
      <div style={{ marginLeft: "1%" }}>
        <p>{head}</p>
      </div>
      <div onClick={() => {
        if(head==="닉네임으로 친구 추가"){
          searchMemberName();
        }else{
          searchMemberPhone();
        }
        }} style={{ marginLeft: "auto", marginRight: "2%" }}>
        <p>확인</p>
      </div>
    </>
  )
}

export default Option5;