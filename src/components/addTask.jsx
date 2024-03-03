"use client"
import React ,{useState} from 'react'
import { ImCross } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";

const AddTask = ({handleAddTodo,setAdd}) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState('');
    const AddTodo = () => {
      if (taskName) {
        handleAddTodo({title:taskName,description,priority,date});
        setTaskName('');
        setDescription(''); 
        setPriority('');
        setDate('');
      }
    };

  return (
    <><div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-25 blur transition duration-1000 group-hover/card:opacity-100 group-hover/card:duration-200"></div>
    <div className="relative z-10 flex flex-col items-center justify-around rounded-lg bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900 p-3 dark:bg-gradient-to-b dark:from-gray-600 dark:to-gray-900 sm:rounded-xl">
    <div className='w-full flex flex-col'>
    <div className='flex'>

    <input
        className="w-full p-2 pb-0 rounded-tl-lg outline-none bg-white text-slate-700 dark:text-slate-300 dark:bg-gray-900 "
            type="text"
            placeholder="Task name"
            value={      taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <select
          className='min-w-fit text-sm font-light outline-none p-2 pr-0  rounded-tr-lg bg-white text-slate-400 dark:bg-gray-900 ' 
          name="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value={0}>Priority</option>
                    <option value={1}>🔴 Low</option>
                    <option value={2}> 🟠Medium</option>
                    <option value={3}>🟢 High</option>
                </select>
          </div>
          <div className='sm:flex'>
          <input
            className="w-full p-2 pr-0 font-light sm:mb-4 rounded-br-lg sm:rounded-bl-lg sm:rounded-br-none outline-none bg-white text-slate-400 dark:bg-gray-900 "
            type="text"
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className=" p-2 text-sm min-w-fit font-light sm:mb-4 rounded-b-lg sm:rounded-bl-none sm:rounded-br-lg outline-none bg-white text-slate-400 dark:bg-gray-900 "
            type="datetime-local"
            
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          </div>
            </div>
            <div className='flex gap-2 justify-end w-full'>
          <button
            className="bg-amber-500 text-white p-2 sm:px-4 sm:py-2 rounded"
            onClick={() => setAdd(false)}
          >
            
            <span className='sm:block hidden'>Cancel</span>
            <ImCross className='sm:hidden text-lg font-bold'/>

          </button>
          <button
            className="bg-teal-500 text-white p-2 sm:px-4 sm:py-2 rounded"
            onClick={AddTodo}
          >
            <span className='sm:block hidden'>Add Task</span>
            <IoMdAdd className='sm:hidden font-bold' size="20px"/>
          </button>
          </div>
   </div>
   
   </>
  )
}

export default AddTask;