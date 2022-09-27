import ProEdit from "./ProEdit";

const ProEditText = ({set, onChangeHandler, setChk}) => {
    return (
        <div>
            <ProEdit set={set} onChangeHandler={onChangeHandler} setChk={setChk}/>
        </div>
    )
}

export default ProEditText;