import PromiseFooter from "../../components/footer/PromiseFooter";
import Header from "../../components/header/Header";
import DetailPromise from "../../components/main/list/DetailPromise";

const DetailPromisePage = () =>{
  return (
    <>
      <Header option={3} />
      <DetailPromise/>
      <PromiseFooter/>
    </>
  )
}

export default DetailPromisePage;