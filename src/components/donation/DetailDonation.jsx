import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getDetailDonation } from "../../redux/modules/detailDonation";

const DetailDonation = () => {
  const dispatch = useDispatch();
  const donation = useSelector((state) => state.detailDonation);
  const { id } = useParams();

  // console.log(donation)
  useEffect(() => {
    dispatch(__getDetailDonation(id));
  }, [dispatch]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ border: "1px solid black", margin: "10px" }}>
          {donation?.data?.data?.board === "request" && <div> 재능요청</div>}
          {donation?.data?.data?.board === "donation" && <div>  재능기부</div>}
        </div>
        <div style={{ border: "1px solid black", margin: "10px" }}>
          {donation?.data?.data?.category === "volunteer" && <div> 봉사</div>}
          {donation?.data?.data?.category === "care" && <div>  돌봄</div>}
          {donation?.data?.data?.category === "edu" && <div> 교육</div>}
          {donation?.data?.data?.category === "share" && <div> 나눔</div>}
          {donation?.data?.data?.category === "cultureart" && <div> 문화/예술</div>}
          {donation?.data?.data?.category === "people" && <div> 모임/구인</div>}
          {donation?.data?.data?.category === "etc" && <div> 기타</div>}
        </div>
      </div>
      <div style={{ border: "1px solid black" }}>
        <div style={{fontWeight:"bold"}}>{donation?.data?.data?.nickname}</div>
        <div style={{display:"flex"}}>
            <div>{donation?.data?.data?.address}º</div>
            <div>{donation?.data?.data?.createdAt}</div>
        </div>
      </div>
      <div style={{ border: "1px solid black"}}>
        <div>
          {donation?.data?.data?.point === 0?
          <p>포인트 : {donation?.data?.data?.point}</p>
          :null
          }
          <p>내용 : {donation?.data?.data?.content}</p>
        </div>
        <div>
          <div>관심 : {donation?.data?.data?.likes}, 댓글 : {donation?.data?.data?.numOfComment} </div>
        </div>
      </div>
    </div>
  )
}
export default DetailDonation;