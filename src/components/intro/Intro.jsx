import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import logo from '../../img/logo.jpg'
import logo2 from '../../img/logo2.jpeg'
import logo3 from '../../img/logo3.png'


const ItrSwipe = () => {
    return (
        <Carousel>
            <div>
              <img src={logo} width="80%"/>
            </div>
            <div>
              <img src={logo2} width="80%"/>
            </div>
            <div>
              <img src={logo3} width="80%"/>
            </div>
        </Carousel>
      )
}


export default ItrSwipe;