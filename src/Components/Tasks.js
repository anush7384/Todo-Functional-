import React, { useState } from "react";
import "./Tasks.css";
import {AiOutlineDelete} from "react-icons/ai";

const Tasks = (props) => {
  const [isComplete, setIsComplete] = useState(props.completeState);

  const [edit, setEdit] = useState(false);
  const [data, setData] = useState("");

  const input = (
    // <div id="input_div">
      <input
        id="edit_input"
        type="text"
        value={data}
        onChange={inputChange}
        onKeyPress={inputHandler}
      />
    // </div>
  );
  function inputChange(e) {
    setData(e.target.value);
  }

  function inputHandler(e) {
    if (e.key === "Enter") {
      props.onEdit(e.target.value, props.id);
      setData("");
      setEdit(false);
    }
  }
  function DeleteHandler() {
    props.onDelete(props.id);
  }

  function CompleteTaskHandler() {
    setIsComplete(!isComplete);
    if (isComplete) {
      props.setActiveIds([...props.activeIds, props.id]);
    } else {
      props.setActiveIds(props.activeIds.filter((curr) => curr !== props.id));
    }
  }

  function EditTaskHandler() {
    setEdit(true);
    setData(props.children);
  }
  return (
    // <div>
    <div id="item_div">
      <input
        id="complete_checkbox"
        type="checkbox"
        onChange={CompleteTaskHandler}
        checked={isComplete}
      />
      <div
        id="task_div"
        onDoubleClick={EditTaskHandler}
        className={`${isComplete ? "complete" : ""}`}
      >
        {edit ? input : props.children}
      </div>
      <div id="delete_div" onClick={DeleteHandler}>
        {/* <i className="fa-solid fa-xmark"></i> */}
        {/* <GiCancel/> */}
        <AiOutlineDelete/>
      </div>
    </div>
  );
};

export default Tasks;
