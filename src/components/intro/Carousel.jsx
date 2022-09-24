import Carousel from 'react-material-ui-carousel'
import styled from "styled-components"
import logo from '../../img/logo.jpg'
import logo2 from '../../img/logo2.jpeg'
import logo3 from '../../img/logo3.png'



const ItrSwipe = () => {
    return (
        <Carousel>
            <div>
              <img src={logo} width="200px"/>
              <p style={{fontSize:"13px", fontWeight:"bold"}}>더 이상 약속을 깨지 않게 도와드릴게요</p>
            </div>
            <div>
              <img src={logo2} width="200px"/>
              <p style={{fontSize:"13px", fontWeight:"bold"}}>더 이상 약속을 깨지 않게 도와드릴게요</p>
            </div>
            <div>
              <img src={logo3} width="200px"/>
              <p style={{fontSize:"13px", fontWeight:"bold"}}>더 이상 약속을 깨지 않게 도와드릴게요</p>
            </div>
        </Carousel>
      )
}


export default ItrSwipe;
