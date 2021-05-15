// import "./count.js";
// import "./toDoList.js";
// import "./toDo.js";

import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App.js";
import store from "./store.js";


ReactDom.render(
    // provider 로 store 연결
    <Provider store={store}> 
        <App></App>
    </Provider>,
    document.getElementById("root")
);


