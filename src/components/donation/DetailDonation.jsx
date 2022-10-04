import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getDetailDonation } from "../../redux/modules/detailDonation";

const DetailDonation = () => {
  const dispatch = useDispatch();
  const donation = useSelector((state) => state.detaildonation);
  const {id} = useParams();

  useEffect(()=>{
    dispatch(__getDetailDonation(id));
  },[dispatch]);

  return (
    <div>
    </div>
  )
}
export default DetailDonation;