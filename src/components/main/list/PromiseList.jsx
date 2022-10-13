import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getPromise } from "../../../redux/modules/promise";
import PersonIcon from "@mui/icons-material/Person";
import 맑음 from "../../../img/weather/맑음.svg";
import 흐림 from "../../../img/weather/흐림.svg";
import 이슬비 from "../../../img/weather/이슬비.svg";
import 안개 from "../../../img/weather/안개.svg";
import 비 from "../../../img/weather/비.svg";
import 천둥번개 from "../../../img/weather/천둥번개.svg";
import 돌풍 from "../../../img/weather/돌풍.svg";
import 눈 from "../../../img/weather/눈.svg";
import axios from "axios";

// 약속목록 컴포넌트
// day = 약속 날짜 선택값
const PromiseList = ({ day }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  }
  // 약속 목록
  const promiseList = useSelector((state) => state.promise);

  // 약속값 받아오기
  useEffect(() => {
    __isToken().then(() => {
      dispatch(__getPromise(day));
    })
  }, [day]);

  return (
    <>
      <Wrap>
        <div>
          <p style={{ fontWeight: "bold" }}>오늘 해야할 일</p>
        </div>
        <Cards>
          {/* 약속시간까지 시간이 아직 남은 약속들 */}
          {promiseList?.data?.data?.map((promise, i) => {
            if (promise.lastTime === "이미 지난 약속입니다.") {
              return;
            }
            // 날씨 아이콘 받아오기

            return (
              // 카드 선택시 상세 페이지
              <PromiseCard
                key={promise.id}
                onClick={() => {
                  navigate(`/detailpromise/${promise.id}`);
                }}>
                <div style={{ display: "flex" }}>
                  {/* <p> 현재날씨</p> */}
                  {promise.weatherResponseDto.sky === "맑음" && <img src={맑음} width={"70px"} height={"70px"} />}
                  {promise.weatherResponseDto.sky === "흐림" && <img src={흐림} width={"70px"} height={"70px"} />}
                  {promise.weatherResponseDto.sky === "비" && <img src={비} width={"70px"} height={"70px"} />}
                  {promise.weatherResponseDto.sky === "눈" && <img src={눈} width={"70px"} height={"70px"} />}
                  {promise.weatherResponseDto.sky === "이슬비" && <img src={이슬비} width={"70px"} height={"70px"} />}
                  {promise.weatherResponseDto.sky === "천둥번개" && <img src={천둥번개} width={"70px"} height={"70px"} />}
                  {promise.weatherResponseDto.sky === "약한 안개" && <img src={안개} width={"70px"} height={"70px"} />}
                  {promise.weatherResponseDto.sky === "옅은 안개" && <img src={안개} width={"70px"} height={"70px"} />}
                  {promise.weatherResponseDto.sky === "안개" && <img src={안개} width={"70px"} height={"70px"} />}
                  {promise.weatherResponseDto.sky === "짙은 안개" && <img src={안개} width={"70px"} height={"70px"} />}
                  {promise.weatherResponseDto.sky === "약한 황사" && <img src={안개} width={"70px"} height={"70px"} />}
                  {promise.weatherResponseDto.sky === "짙은 황사" && <img src={안개} width={"70px"} height={"70px"} />}
                  {promise.weatherResponseDto.sky === "재 주의" && <img src={안개} width={"70px"} height={"70px"} />}
                  {promise.weatherResponseDto.sky === "돌풍" && <img src={돌풍} width={"70px"} height={"70px"} />}
                  {promise.weatherResponseDto.sky === "폭풍" && <img src={돌풍} width={"70px"} height={"70px"} />}
                  <div style={{ display: "flex", marginTop: "10px" }}>
                    {/* <p>날씨 : {promise.weatherResponseDto.sky}</p> */}
                    <p> {promise.weatherResponseDto.temperature}　</p>
                    {/* <p>
                      최고/최저 : {promise.weatherResponseDto.minTemp} /{" "}
                      {promise.weatherResponseDto.maxTemp}{" "}
                    </p> */}
                    <p>💧{promise.weatherResponseDto.probability}</p>
                  </div>
                </div>
                <Contents>
                  <div style={{ display: "flex" }}>
                    <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                      {promise.title}
                    </p>
                    {/* 포인트 받아야할듯 */}
                    <People>
                      <PersonIcon />
                    </People>
                    <p style={{ fontWeight: "500" }}>{promise.memberCount}</p>
                  </div>
                  <div>
                    <p
                      className="place"
                      style={{ marginTop: "0", marginBottom: "0" }}>
                      {promise.place}
                    </p>
                  </div>
                  <div>
                  <div style={{ display: "flex" }}>
                    {/* 시간값 split으로 잘라서 사용 */}
                    {Number(promise.eventDateTime.split("-")[3]) < 12 ? (
                      <>
                        <p>오전</p>
                        <p>{promise.eventDateTime.split("-")[3]}시</p>
                      </>
                    ) : Number(promise.eventDateTime.split("-")[3]) === 12 ? (
                      <>
                        <p>오후</p>
                        <p>{promise.eventDateTime.split("-")[3]}시</p>
                      </>
                    ) : (
                      <>
                        <p>오후</p>
                        <p>
                          {Number(promise.eventDateTime.split("-")[3]) - 12}시
                        </p>
                      </>
                    )}
                    <p style={{ marginRight: "10px" }}>
                      {promise.eventDateTime.split("-")[4]}분
                    </p>
                    <p className="lastTime" style={{marginRight:"10px"}}>{promise.lastTime}</p>
                  </div>
                </div>
                </Contents>                
              </PromiseCard>
            );
          })}
        </Cards>
      </Wrap>
      <Wrap>
        <div>
          <p style={{ fontWeight: "bold" }}>오늘 했어야 할 일</p>
        </div>
        <Cards>
          {/* 약속시간이 지난 약속들 */}
          {promiseList?.data?.data?.map((promise) => {
            if (promise.lastTime !== "이미 지난 약속입니다.") {
              return;
            }
            return (
              <PromiseCard
                key={promise.id}
                onClick={() => {
                  navigate(`/detailpromise/${promise.id}`);
                }}>
                <Contents>
                <div style={{ display: "flex" }}>
                  <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                    {promise.title}
                  </p>
                  {/* 포인트 받아야할듯 */}
                  <People>
                    <PersonIcon />
                  </People>
                  <p style={{ fontWeight: "500" }}>{promise.memberCount}</p>
                </div>
                <div>
                  <p
                    className="place"
                    style={{ marginTop: "0", marginBottom: "0" }}>
                    {promise.place}
                  </p>
                </div>
                <div>
                  <div style={{ display: "flex" }}>
                    {/* 시간값 split으로 잘라서 사용 */}
                    {Number(promise.eventDateTime.split("-")[3]) < 12 ? (
                      <>
                        <p>오전</p>
                        <p>{promise.eventDateTime.split("-")[3]}시</p>
                      </>
                    ) : Number(promise.eventDateTime.split("-")[3]) === 12 ? (
                      <>
                        <p>오후</p>
                        <p>{promise.eventDateTime.split("-")[3]}시</p>
                      </>
                    ) : (
                      <>
                        <p>오후</p>
                        <p>
                          {Number(promise.eventDateTime.split("-")[3]) - 12}시
                        </p>
                      </>
                    )}
                    <p style={{ marginRight: "10px" }}>
                      {promise.eventDateTime.split("-")[4]}분
                    </p>
                    <p className="lastTime" style={{marginRight:"10px"}}>종료</p>
                  </div>
                </div>
                </Contents>
              </PromiseCard>
            );
          })}
        </Cards>
      </Wrap>
    </>
  );
};

export default PromiseList;

const Wrap = styled.div`
  /* background-color: skyblue; */
  width: 80%;
  min-width: 360px;
  margin: 0 auto;
`;
const Cards = styled.div`
  @media screen and (min-width: 769px) {
    /* background-color: pink; */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 13px;
  }
`;

const PromiseCard = styled.div`
  /* min-width: 350px; */
  height: 100%;
  background-color: #FAFAFA;
  /* border: 1px solid #F0F0F0; */
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  padding: 0 10px;
  border-radius: 4px;
  font-size: 13px;
  position: relative;
  div {
    /* background-color: yellow; */
    /* height: 30px; */
  }
  .lastTime {
    position: absolute;
    right: 10px;
  }
  @media screen and (min-width: 769px) {
    width: 280px;
    /* height: 120px; */
    font-size: 12px;
    margin: 0 auto;
  }
`;
const Contents = styled.div`
  /* background-color: pink; */
  margin: 0 10px;
`

const People = styled.p`
  color: #3E09D1;
  border-radius: 50%;
  width: 20px;
  text-align: center;
  margin-left: auto;
  margin-right: 2px;
`;
