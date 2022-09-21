import ProEdit from "./ProEdit";

const ProEditText = ({value, onChangeHandler, setChk}) => {
    return (
        <div>
            <ProEdit value={value} onChangeHandler={onChangeHandler} setChk={setChk}/>
        </div>
    )
}

export default ProEditText;