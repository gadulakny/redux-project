import { createStore } from "redux";

const addBtn = document.getElementById("add");
const minusBtn = document.getElementById("minus");
const number = document.getElementById("number");

const ADD = "ADD";
const MINUS = "MINUS";


const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(countModifier);  // Store 생성(state) 

const handleAdd = () => {
  countStore.dispatch({ type : ADD });
};

const handleMinus = () => {
  countStore.dispatch({ type : MINUS });
};

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);


addBtn.addEventListener("click", handleAdd);
minusBtn.addEventListener("click", handleMinus);