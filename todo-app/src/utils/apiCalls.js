
const getAllTodos=()=>{
    return fetch('http://localhost:3000/todos')
}

const createATodo=(args)=>{
    /**
     * args -- 
     * {
        "task": "Go to cafe",
        "status": false
        }
     */
    return fetch('http://localhost:3000/todos',{
        method:'POST',
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(args)
    })
}
const deleteATodo=(id)=>{
    return fetch(`http://localhost:3000/todos/${id}`,{
        method:'DELETE',
    })
}
const updateATodo=(id,args)=>{
    return fetch(`http://localhost:3000/todos/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(args)
    })
}
export {getAllTodos,createATodo,deleteATodo,updateATodo}