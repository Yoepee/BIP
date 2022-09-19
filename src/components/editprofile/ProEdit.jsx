const ProEdit = ({ type, name, setName }) => {
  return (
    <div>
      {type==="name"?
      <>
      <p>닉네임</p>
      <input placeholder="닉네임"
        name="name"
        type="text"
        value={name}
        onChange={(e) => { setName(e.target.value) }} />
      </>
      :type==="call"?
      <>
      <p>전화번호</p>
      <input placeholder="전화번호"
        name="name"
        type="text"
        value={name}
        onChange={(e) => { setName(e.target.value) }} />
      </>
      :<>
      <p>이메일</p>
      <input placeholder="이메일"
        name="name"
        type="text"
        value={name}
        onChange={(e) => { setName(e.target.value) }} />
      </>}
    </div>
  )
}

export default ProEdit;