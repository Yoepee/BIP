import { Route, Routes } from "react-router-dom"

const Router = () =>{
    return (
        <Routes>
            <Route path="/" element={<div>헬로</div>}/>
        </Routes>
    )
}

export default Router