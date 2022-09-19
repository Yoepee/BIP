import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
const MainPage = () => {
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        },
        {
            name: "Random Name #3",
            description: "Hello World!"
        }
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
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                테스트
            </Button>
        </Paper>
    </div>
    )
}

export default MainPage;