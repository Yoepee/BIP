import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getDonation } from "../../redux/modules/donation";

const Donation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const donationList = useSelector((state) => state.donation);
  const [type, setType] = useState("all");

  useEffect(() => {
    dispatch(__getDonation(type));
  }, [dispatch, type]);

  return (
    <div>
      <div style={{ display: "flex", cursor: "pointer" }}>
        <div style={{ border: "1px solid black" }}
          onClick={() => { setType("all") }}>전체</div>
        <div style={{ border: "1px solid black" }}
          onClick={() => { setType("donation") }}>기부</div>
        <div style={{ border: "1px solid black" }}
          onClick={() => { setType("request") }}>요청</div>
      </div>
      <div>
        {donationList?.data?.data?.map((post) => {
          return (
            <div style={{ border: "1px solid black" }} key={post.id}
              onClick={() => { navigate(`/detaildonation/${post.id}`) }}>
              <div>
                <div style={{ display: "flex" }}>
                  <div>
                    {post.board === "request" && <div style={{ border: "1px solid black" }}>재능요청</div>}
                    {post.board === "donation" && <div style={{ border: "1px solid black" }}>재능기부</div>}
                  </div>
                  <div>
                    {post.category === "volunteer" && <div style={{ border: "1px solid black" }}>봉사</div>}
                    {post.category === "care" && <div style={{ border: "1px solid black" }}>돌봄</div>}
                    {post.category === "edu" && <div style={{ border: "1px solid black" }}>교육</div>}
                    {post.category === "share" && <div style={{ border: "1px solid black" }}>나눔</div>}
                    {post.category === "cultureart" && <div style={{ border: "1px solid black" }}>문화/예술</div>}
                    {post.category === "people" && <div style={{ border: "1px solid black" }}>모임/구인</div>}
                    {post.category === "etc" && <div style={{ border: "1px solid black" }}>기타</div>}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>제목 : {post.title}</p>
                  <p>P {post.point}</p>
                </div>
                {post.imgUrl !== null ?
                  <div>{post.imgUrl}</div>
                  : null}
                <div>글쓴이 : {post.nickname}</div>
              </div>
              <div style={{ display: "flex" }}>
                <div>🗨{post.numOfComment}</div>
                <div>👍{post.likes}</div>
                <div style={{ marginLeft: "auto" }}>{post.createdAt}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Donation;