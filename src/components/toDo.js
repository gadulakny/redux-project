import React from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { Link } from "react-router-dom";

const ToDo = ({ text, onBtnClick, id}) => {
    return (
        <Link to={`/${id}`}>
            <li>
                {text} <button onClick={onBtnClick}>X</button>
            </li>
        </Link>
    );
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onBtnClick: () => dispatch(actionCreators.delToDo(ownProps.id))
    };
};

export default connect(null, mapDispatchToProps) (ToDo);