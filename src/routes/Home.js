import React, { useState } from "react";
import { connect } from "react-redux";
import ToDo from "../components/toDo";
import { actionCreators } from "../store";

function Home ({ toDos, addToDo }) {
    const [ text, setText ] = useState("");
    function onChange (e) {
        setText(e.target.value);
    };
    function onSubmit (e) {
        e.preventDefault();
        addToDo(text);
        setText("");
    };
    return (
        <>
            <h1>To Do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange}></input>
                <button>X</button>
            </form>
            <ul>
                {toDos.map(toDo => ( 
                    <ToDo {...toDo} key={toDo.id} />
                ))}
            </ul>
        </>
    );
};

// connet 는 mapStateToProps 를 통해 현재 state를 가져와서 컴포넌트에 prop 형태로 추가한다. (plain object)
// store.getState() 하듯이 react에서는 mapStateToProps 사용
function mapStateToProps (state) {
    return {
        toDos: state
    };
};
function mapDispatchToProps (dispatch) {
    return {
        addToDo: text => dispatch(actionCreators.addToDo(text))
    };
};

// connet 는 두가지 인자를 받는다.
// 첫번째 인자로 mapStateToProps, 두번째 인자로 mapDispatchToProps. # state, dispatch 순으로 기입
// 예시 => connet(mapStateToProps, mapDispatchToProps) (component);
// dispatch 만을 사용할 때는 => connet(null, mapDispatchToProps) (component);
export default connect(mapStateToProps, mapDispatchToProps) (Home);