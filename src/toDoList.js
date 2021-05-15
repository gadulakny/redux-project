import { createStore } from "redux";

const form = document.getElementById("toDoForm");
const input = document.querySelector("input");
const ul = document.getElementById("toDoUl");

const ADD_TODO = "ADD_TODO";
const DEL_TODO = "DEL_TODO";

// 3. 최종 action return 함수 생성 (add & del)
const addToDO = (text) => {
    return {
        type: ADD_TODO,
        text,
        id: Date.now()
    };
};
const delToDo = (id) => {
    return {
        type: DEL_TODO,
        id
    };
};

// 2. reducer 선언
const reducer = ( state = [], action ) => {
    switch (action.type) {
        case ADD_TODO :
            const addNewObj = { text : action.text, id : action.id };
            return [ addNewObj, ...state ];
        case DEL_TODO :
            return state.filter(toDo => toDo.id !== action.id);
        default :
            return state;
    };
};

// 5. dispatch
const dispatchAddToDo = (text) => {
    store.dispatch(addToDO(text));
};
const dispatchDelToDo = (e) => {
    const id = parseInt(e.target.parentNode.id);
    store.dispatch(delToDo(id));
};

// 4. form eventListener 추가
const handleSubmit = (event) => {
    event.preventDefault();
    const toDo = input.value;
    input.value = "";
    // dispatch
    dispatchAddToDo(toDo);
};
form.addEventListener("submit", handleSubmit);

// 6. html 수정
const paintToDos = () => {
    const toDos = store.getState();
    ul.innerHTML = "";
    toDos.forEach(toDo => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.innerText = "X";
        // 이벤트리스너 잊지말기
        btn.addEventListener("click", dispatchDelToDo);
        li.id = toDo.id;
        li.innerText = toDo.text;
        ul.appendChild(li);
        li.appendChild(btn);
    });
};

// 1. 스토어 생성
const store = createStore(reducer);

// subscribe 될때마다 
store.subscribe(() => console.log(store.getState()));
store.subscribe(paintToDos);