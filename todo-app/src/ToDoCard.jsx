import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { getAllTodos, createATodo } from "./utils/apiCalls";
import "./styles/styles.css";

const ToDoCard = () => {
  // let TODOS=[
  // {
  //     "taskId":101,
  //     "task":"Travel to Srikakulam",
  //     "status":true
  // },
  // {
  //     "taskId":102,
  //     "task":"Learn React",
  //     "status":false
  // }
  // ];
  const [todosData, setTodosData] = useState([]);
  const [todoInputText, setTodoInputText] = useState("");
  const [isLoading, setIsLoading] = useState(undefined);
  const [isCreating, setIsCreating] = useState(undefined);
  const [isDeleting, setIsDeleting] = useState(undefined);
  const handleFetchAllTodos = async () => {
    try {
      setIsLoading(true);
      setTimeout(async () => {
        const response = await getAllTodos();
        const data = await response.json();

        console.log(data);
        // TODOS=data;
        // console.log("TODOS:",TODOS)
        setTodosData(data);
        setIsLoading(false);
      }, 500);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };
  const handleCreateATodo = async () => {
    if (todoInputText.length > 0) {
      setIsCreating(true);
      setTimeout(async () => {
        const response = await createATodo({
          task: todoInputText,
          status: false,
        });
        console.log("response::", response);
        if (response.ok) {
          // setTodosData((prev)=>[...prev,{
          //     task: todoInputText,
          //     status: false,
          //   }])
          handleFetchAllTodos();
          setIsCreating(false);
        } else {
          setIsCreating(false);
        }
        // const data=await response.json()
      }, 500);
    } else {
      return alert("Todo cannot be empty");
    }
  };
  useEffect(() => {
    handleFetchAllTodos();
  }, []);

  //   useEffect(()=>{
  //     console.log("todoInputText::",todoInputText)
  //   },[todoInputText])
  if (isLoading) {
    return <h3 style={{ margin: "50vh", textAlign: "center" }}>Loading...</h3>;
  }
  if (isCreating) {
    return (
      <h3 style={{ margin: "50vh", textAlign: "center" }}>
        Creating a new Todo...
      </h3>
    );
  }
  if(isDeleting)
  {
    return (
        <h3 style={{ margin: "50vh", textAlign: "center" }}>
          Deleting a Todo...
        </h3>
      );
  }
//   const [checked,setChecked]=useState([]);
//   useEffect(()=>{
//     if(todosData?.length>0)
//     {
//         let arr=[]
//         todosData.forEach((item)=>{arr.push(item.status)})
//         setChecked(arr);
//     }
//   },[todosData])
  return (
    <div className="todo-card">
      <h1 className="todo-heading">TODO(s)</h1>
      <div className="todo-input-section">
        <input
          type="text"
          className="todo-input"
          onChange={(event) => {
            setTodoInputText(event.target.value);
          }}
        />
        <button
          type="button"
          className="todo-add-btn"
          onClick={handleCreateATodo}
        >
          Add
        </button>
      </div>
      <hr />
      <div className="todo-items-section">
        {todosData.length ? (
          todosData.map((item) => {
            return <TodoItem item={item} key={item.taskId} handleFetchAllTodos={handleFetchAllTodos} setIsDeleting={setIsDeleting} />;
          })
        ) : (
          <div>No Todo found! Add a Todo.</div>
        )}

        {/* WHY? ----  */}
        {/* {TODOS.length>0 && TODOS.map((item)=>{
                return(
                    <TodoItem item={item} key={item.taskId}/>
                )
            })} */}
      </div>
    </div>
  );
};

export default ToDoCard;
