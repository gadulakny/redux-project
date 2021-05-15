import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = text => {
    return {
        type: ADD,
        text,
        id: Date.now()
    };
};
const delToDo = id => {
    return {
        type: DELETE,
        id: parseInt(id)
    };
};
const reduce = (state = [], action) => {
    switch(action.type) {
        case ADD:
            return [{ text: action.text, id: action.id }, ...state ];
        case DELETE:
            return state.filter(toDo => toDo.id !== action.id);
        default:
            return state;
    };
};

// 객체화
export const actionCreators = {
    addToDo,
    delToDo
};

const store = createStore(reduce);

export default store;