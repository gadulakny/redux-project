import { createStore } from "redux";

const form = document.getElementById("toDoForm");
const input = document.querySelector("input");
const ul = document.getElementById("toDoUl");

const ADD_TODO = "ADD_TODO";
const DEL_TODO = "DEL_TODO";

// 최종 action 박스는 보통 reduce 위에 배치.
// Date.now() 는 reducer안에서 사용 자제. action에서 넘기는것을 권장.

const addToDo = (text) => {
    return {
        type : ADD_TODO, 
        text, 
        id : Date.now()
    };
};

const delToDo = (id) => {
    return {
        type : DEL_TODO, 
        id
    };
};

// 절대 state를 직접 mutate 하지 마라.
// Array 를 새로 만들어라 -수정은 절대 하지마라

const reduce = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [ { text: action.text , id: action.id }, ...state ]; // 새로운 array, 직접 수정하지 말고
        case DEL_TODO:
            return state.filter(toDo => action.id !== toDo.id); // 새로운 array, 직접 수정하지 말고
        default:
            return state;
    };
};

const dispatchAddToDo = (text) => {
    toDoStore.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
    // HTML로부터 받아온 숫자는 보통 string 이기 때문에 파싱 해주어야 한다.
    const id = parseInt(e.target.parentNode.id);
    toDoStore.dispatch(delToDo(id));
};

const paintToDos = () => {
    const toDos = toDoStore.getState();
    ul.innerHTML = ""; // subscribe 발생시마다 ul 태그의 내용 전부 삭제후 새로 만듬 
    toDos.forEach(toDo => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        
        btn.addEventListener("click", dispatchDeleteToDo);
        li.id = toDo.id;
        btn.innerText = "X";
        li.innerText = toDo.text;
        li.appendChild(btn);
        ul.appendChild(li);
    });
};

const toDoStore = createStore(reduce);

const onsubmit = e => {
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    dispatchAddToDo (toDo);
};

// state 가 바뀌었을 때마다 실행되는 함수.
toDoStore.subscribe(() => console.log(toDoStore.getState()));
toDoStore.subscribe(paintToDos);

form.addEventListener("submit", onsubmit);