import React from 'react'
import ToDoCard from './ToDoCard'

const App = () => {
  return (
    <div className='app'>
      <ToDoCard/>
    </div>
  )
}
/**
 * 2 types of export
 * (i) Default export -- Func -- export default Func;   ----- import Func from "..."   -- NOTE: One component/file only one default export possible
 * (ii) Named export -- Func -- export {Func};          ----- import {Func} from "...." --NOTE: Many named exports possible from a component/file
 */
export default App
