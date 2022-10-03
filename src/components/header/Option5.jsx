import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __searchName, __searchPhone } from "../../redux/modules/searchMember";

const Option5 = ({ head, payload }) => {
  const dispatch = useDispatch();
  const initialState = { value: "" };
  const [input, setInput] = useState(initialState);
  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const searchMemberName = () => {
    dispatch(__searchName(input));
  };
  const searchMemberPhone = () => {
    dispatch(__searchPhone(input));
  };

  return (
    <>
      <div style={{ marginLeft: "1%" }}>
        <input
          type="text"
          style={{
            outline: "none",
            border: "none",
            borderBottom: "1px solid #F5EAFB",
            marginTop: "20px",
            width: "250px",
          }}
          name="value"
          value={input.value}
          onChange={onChangeHandle}
        />
      </div>
      <div
        onClick={() => {
          if (head === "닉네임으로 친구 추가") {
            searchMemberName();
          } else {
            searchMemberPhone();
          }
        }}
        style={{ marginLeft: "auto", marginRight: "2%" }}>
        <p>찾기</p>
      </div>
    </>
  );
};

export default Option5;
