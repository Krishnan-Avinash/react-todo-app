import React, { useEffect, useState } from "react";
import { deleteATodo, updateATodo } from "./utils/apiCalls";
const TodoItem = (props) => {
  // const {item}=props;
  const handleDeleteTodo = (id) => {
    try {
      props.setIsDeleting(true);
      setTimeout(async () => {
        const response = await deleteATodo(id);
        if (response.ok) {
          props.handleFetchAllTodos();
          const data = await response.json();
          console.log(data);
          props.setIsDeleting(false);
        } else {
          props.setIsDeleting(false);
        }
      }, 500);
    } catch (e) {
      console.log(e);
      props.setIsDeleting(false);
    }
  };

  const handleUpdateATodo=async()=>{
    try{
        const response=await updateATodo(props.item.id,{...props.item,status:!isChecked})
        if(response.ok)
        {
            setIsChecked((prev)=>!prev)
        }
    }
    catch(e){console.log(e)}
  }
  const [isChecked,setIsChecked]=useState(undefined)
  useEffect(()=>{
    if(props.item.id)
    {
        setIsChecked(props.item.status)
    }
  },[])

  return (
    <>
      <div className="todo-item" key={props.item.id}>
        <div>
          <input
            type="checkbox"
            defaultChecked={isChecked}
            className="checkbox-input"
            onClick={()=>{
                handleUpdateATodo()
            }}
          />
          {props.item.task}
        </div>
        <button type="button" className="todo-remove-btn">
          <span onClick={() => handleDeleteTodo(props.item.id)}>❌</span>
        </button>
      </div>
    </>
  );
};

export default TodoItem;
