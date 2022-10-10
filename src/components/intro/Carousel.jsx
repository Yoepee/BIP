import Carousel from 'react-material-ui-carousel'
import intro1 from '../../img/001.png'
import intro2 from '../../img/002.png'
import intro3 from '../../img/003.png'
import intro4 from '../../img/004.png'
import intro5 from '../../img/005.png'


// intro페이지 소개 출력 슬라이드
const ItrSwipe = () => {
    return (
        <Carousel>
            <div>
              <img src={intro1} width="380px"/>
            </div>
            <div>
              <img src={intro2} width="380px"/>
            </div>
            <div>
              <img src={intro3} width="380px"/>
            </div>
            <div>
              <img src={intro4} width="380px"/>
            </div>
            <div>
              <img src={intro5} width="380px"/>
            </div>
        </Carousel>
      )
}


export default ItrSwipe;
