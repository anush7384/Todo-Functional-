import React, { useState } from "react";
import "./Task.css";
import Tasks from "./Tasks";
import { v4 as uuidv4 } from "uuid";
import {MdArrowDropDown} from "react-icons/md";

const Task = () => {
  const [data, setData] = useState("");
  const [todos, setTodos] = useState([]);
  const [activeIds,setActiveIds]=useState([]);
  const [visibleTasks,setVisibleTasks]=useState([]);
  const [view,setView] = useState(true);

  function ViewHandler(){
    setView((prev)=> !prev);
  }

  function InputChangeHandler(e) {
    setData(e.target.value);
  }

  function InputHandler(e) {
    if (e.key === "Enter") {
      let taskId=uuidv4();
      setTodos([...todos, { id: taskId, text: data }]);
      setActiveIds([...activeIds,taskId]);
      setVisibleTasks([...visibleTasks,{id:taskId, text:data}]);
      setData("");
    }
  }

  function EditTaskHandler(newtext,id){
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((obj) => {
        if (obj.id === id) return { ...obj, text: newtext };
        else return obj;
      });
      return newTodos;
    });
    setVisibleTasks((prevTodos) => {
      const newTodos = prevTodos.map((obj) => {
        if (obj.id === id) return { ...obj, text: newtext };
        else return obj;
      });
      return newTodos;
    });
  }

  function DeleteTaskHandler(id) {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.filter((todo) => todo.id !== id);
      setActiveIds(activeIds.filter((curr)=>curr!==id))
      setVisibleTasks(visibleTasks.filter((curr)=>curr.id!==id));
      return newTodos;
    });
  }

  function showActiveTask(){
    setVisibleTasks(todos.filter((curr)=>activeIds.includes(curr.id)));
  }

  function showCompletedTask(){
    setVisibleTasks(todos.filter((curr)=>!activeIds.includes(curr.id)));
  }

  function showAllTask(){
    setVisibleTasks(todos);
  }
  return (
    <div id="container">
      <h1>TODO LIST</h1>
      <div>
        <div id="drop">
          <MdArrowDropDown id="dropdown" onClick={ViewHandler} />
        </div>
        <div id="inp">
          <input
            id="input"
            value={data}
            placeholder={"Enter Your Task..."}
            onChange={InputChangeHandler}
            onKeyPress={InputHandler}
          />
        </div>
      </div>
      {view ? (
        <div id="list_div" style={{ display: "flex", flexDirection: "column" }}>
          {visibleTasks.map((todoDetail) => (
            <Tasks
              key={todoDetail.id}
              id={todoDetail.id}
              onDelete={DeleteTaskHandler}
              activeIds={activeIds}
              setActiveIds={setActiveIds}
              completeState={!activeIds.includes(todoDetail.id)}
              onEdit={EditTaskHandler}
            >
              {todoDetail.text}
            </Tasks>
          ))}
          {todos.length == 0 ? (
            ""
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <p>{activeIds.length} Items left</p>
              <button id="all"onClick={showAllTask}>All</button>
              <button id="active" onClick={showActiveTask}>Active</button>
              <button id="complete" onClick={showCompletedTask}>Completed</button>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
      {/* <div id="list_div" style={{ display: "flex", flexDirection: "column" }}>
        {visibleTasks.map((todoDetail) => (
          <Tasks
            key={todoDetail.id}
            id={todoDetail.id}
            onDelete={DeleteTaskHandler}
            activeIds={activeIds}
            setActiveIds={setActiveIds}
            completeState={!activeIds.includes(todoDetail.id)}
            onEdit={EditHandler}
          >
            {todoDetail.text}
          </Tasks>
        ))}
        {todos.length == 0 ? (
          ""
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <p>{activeIds.length} Items left</p>
            <button onClick={showAllTask}>All</button>
            <button onClick={showActiveTask}>Active</button>
            <button onClick={showCompletedTask}>Completed</button>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Task;
