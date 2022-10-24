import Header from "../../components/header/Header";
import WebHeader from "../../components/header/WebHeader";
import Guide from "../../components/profile/Guide"

const GuidePage = () => {
  return(
    <>
      <WebHeader />
      <Header head={"이용방법"} option={0}/>
      <Guide/>
    </>
  )
}

export default GuidePage;