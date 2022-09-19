import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import logo from '../../img/logo.jpg';
import logo2 from '../../img/logo2.jpeg';
import logo3 from '../../img/logo3.png';

const ItrSwipe = () => {
    const items = [
        <img src="data:image/png;base64,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" />
        
        
    ]

    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
            )
}

function Item(props)
{
    return (
        <div>
        <Paper>
            <p>{props.item.description}</p>

            {/* <Button className="CheckButton">
                테스트
            </Button> */}
        </Paper>
    </div>
    )
}

export default ItrSwipe;