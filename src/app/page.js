"use client";
import React,{ useState,useOptimistic, useEffect,useTransition } from 'react';
import AddTask from '@/components/addTask';
import Navbar from '@/components/navbar';
import TodoItem from '@/components/todoItem';
import { IoAddOutline } from "react-icons/io5";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoMdAdd } from "react-icons/io";
import { IoMenu } from "react-icons/io5";

const Home = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [currentTodos, setCurrentTodos] = useState(undefined);
  const [add, setAdd] = useState(false);
  const [mode, setMode] = useState('all');
  const [isPending, startTransition] = useTransition();

    const [optimisticTodos, setOptimisticTodos] = useOptimistic(currentTodos,
      (state, { action, task }) => {
        switch (action) {
          case 'add':
            return [...state, task];
          case 'remove':
            return state.filter((t) => t.id !== task);
            default:
              return state;
        }
      }
    );
    const sortTodos =async (action) => {
      // Sort by date-time
      const todos = [...currentTodos];
      if(action)
       todos.sort((a, b) => new Date(a.date) - new Date(b.date));
      // Sort by priority
      else
       todos.sort((a, b) => b.priority - a.priority);
      //console.log(todos);
      setCurrentTodos(todos);
    };

   
const getCurTodos = async(action) => {
  console.log(action,mode);
  if(action == mode)return;
  setMode(action);
      switch (action) {
        case 'all':
        setCurrentTodos(allTodos.filter((todo) => !todo.completed));
      return;
      case 'today':
      setCurrentTodos(allTodos.filter((todo) => isDateToday(todo.date) && !todo.completed));
      return;
      case 'completed':
      setCurrentTodos(allTodos.filter((todo) => todo.completed));
      return;
    }
  }
useEffect(() => {
  if(typeof window !== 'undefined'){
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if(storedTodos){
      setAllTodos(storedTodos);
      setCurrentTodos(storedTodos.filter((todo) => !todo.completed));
    }
  }
},[typeof window]);
    const isDateToday = (date) => {
      const currentDate = new Date();
      const givenDate = new Date(date);
      return currentDate.toDateString() === givenDate.toDateString();
    };
    const handleAddTodo = async(todo) => {
      if(!todo.date)todo.date=new Date();
      const newTodo = { id: Date.now(),completed:false, ...todo };
      const currentDate = new Date();
    const targetDate = new Date(todo.date);
      if(mode == 'all'||(mode == 'today'&&currentDate.toDateString() === targetDate.toDateString())){
        startTransition(async()=>await setOptimisticTodos({action:"add", task:newTodo}));
      setCurrentTodos([ newTodo,...currentTodos]);
    }
      else getCurTodos('all');
      setAllTodos([ newTodo,...allTodos]);
      localStorage.setItem('todos', JSON.stringify([ newTodo,...allTodos]));
    };
const handleRemoveTodo = async(id) => {
  startTransition(async()=>await setOptimisticTodos({action:"remove", task:id}));
  setCurrentTodos(currentTodos.filter((todo) => todo.id !== id));
  setAllTodos(allTodos.filter((todo) => todo.id !== id));
  localStorage.setItem('todos', JSON.stringify(allTodos.filter((todo) => todo.id !== id)));
}
const handleCompletion = async(todo) => {
  const curtodos = [...currentTodos];
  const alltodos = [...allTodos];
  todo.completed = true;
  todo.date=new Date();
  startTransition(async()=>await setOptimisticTodos({action:"remove", task:todo.id}));
  setCurrentTodos(curtodos.filter((t) => t.id !== todo.id));
  const newtodos = [todo, ...alltodos.filter((t) => t.id !== todo.id)];
  setAllTodos(newtodos);
  localStorage.setItem('todos', JSON.stringify(newtodos));
}
    return (
      <main className={`flex flex-col text-gray-700 dark:text-slate-400 overflow-hidden h-screen bg-gradient-to-r from-gray-50 via-gray-300 to-gray-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 `}>       
        <Navbar/>
        <div className="mx-auto max-w-2xl w-10/12 rounded-lg sm:rounded-xl flex flex-col min-h-screen py-2">
          <div className='w-full group/card relative'>{!add? <>
            <div className='w-full sm:justify-around text-lg flex-end cursor-pointer flex items-center gap-3 '>
              <a className=' mx-auto sm:mx-0 flex items-center ' onClick={()=>setAdd(true)}><IoMdAdd size="25px"/>Add Task</a>
              <div className=' rounded-md border-gray-300 px-3  bg-slate-300 bg-opacity-60 hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] hover:backdrop-blur-sm dark:bg-gray-900 dark:bg-opacity-60 sm:!shadow-none  sm:!bg-transparent text-base sm:text-lg absolute group/menu sm:sticky flex-col flex sm:flex-row sm:items-center sm:gap-5 top-0 '>
                <IoMenu size="30px" className='sm:hidden bg-transparent' />
                <a className={`group-hover/menu:block hidden sm:block dark:hover:text-white hover:text-blue-700 ${
                  mode === "all"
                    ? " text-blue-700 dark:text-gray-50"
                    : ""
                }`} onClick={()=>startTransition(()=>getCurTodos("all"))}>All</a>
                <a className={`group-hover/menu:block hidden sm:block dark:hover:text-white hover:text-blue-700 ${
                  mode === "today"
                    ? " text-blue-700 dark:text-gray-50"
                    : ""
                }`} onClick={()=>startTransition(()=>getCurTodos("today"))}>Today</a>
                <a className={`group-hover/menu:block hidden sm:block dark:hover:text-white hover:text-blue-700 ${
                  mode === "completed"
                    ? " text-blue-700 dark:text-gray-50"
                    : ""
                }`}  onClick={()=>startTransition(()=>getCurTodos("completed"))}>completed</a>
              </div>
              <div className='relative group/menu2'>
                <a><GiSettingsKnobs size="25px" className=' rotate-90'/></a>
                <div className=' hidden rounded-md border-gray-300  bg-slate-300 bg-opacity-60 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] backdrop-blur-sm dark:bg-gray-900 dark:bg-opacity-60 text-base absolute flex-col group-hover/menu2:flex text-end top-[24px] right-0  w-fit'>
                  <a className='p-2 rounded-t-lg hover:bg-gray-100  dark:hover:bg-gray-700 dark:hover:text-white' onClick={()=>sortTodos(true)}>Date&time</a>
                  <a className='p-2 rounded-b-lg hover:bg-gray-100  dark:hover:bg-gray-700 dark:hover:text-white' onClick={()=>sortTodos(false)}>Priority</a>
                </div>
              </div>
            </div>
          </>:
          <AddTask add={add} setAdd={setAdd} handleAddTodo={handleAddTodo}/>}</div> 
          {optimisticTodos && optimisticTodos.length ?
          <ul className=' mt-5 w-full h-full overflow-y-scroll scrollbar-hide'>
             {optimisticTodos.map((todo, index) => (
              <TodoItem todo={todo} key={index} comleteTodo={handleCompletion} deleteTodo={handleRemoveTodo} />
            ))} 
          </ul>
          : (optimisticTodos !== undefined ? <span className='flex justify-center mt-[100px]'>No todos to display!</span> : <div className="loader mx-auto mt-[100px] w-3 h-3" />)}
        </div>
      </main>
    );
}

export default Home;