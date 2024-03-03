import React,{useTransition} from 'react'
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const TodoItem = ({todo,deleteTodo,comleteTodo}) => {
  const pr=["","🔴","🟠","🟢"];
  const [isPending, startTransition] = useTransition();
  const getShortenDateTime = (dateTime) => {
    const currentDate = new Date();
    const targetDate = new Date(dateTime);

    const currentYear = currentDate.getFullYear();
    const targetYear = targetDate.getFullYear();

    const currentMonth = currentDate.getMonth();
    const targetMonth = targetDate.getMonth();

    const currentDay = currentDate.getDate();
    const targetDay = targetDate.getDate();

    const currentHour = currentDate.getHours();
    const targetHour = targetDate.getHours();

    const currentMinute = currentDate.getMinutes();
    const targetMinute = targetDate.getMinutes();

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (currentYear === targetYear) {
      if (currentMonth === targetMonth) {
        if (currentDay === targetDay) {
          return 'Today | ' + targetHour + ':' + targetMinute;
        } else if (currentDay + 1 === targetDay) {
          return 'Tomorrow | ' + targetHour + ':' + targetMinute;
        } else if (currentDay + 7 >= targetDay) {
          const dayOfWeek = targetDate.getDay();
          return daysOfWeek[dayOfWeek] + ' | ' + targetHour + ':' + targetMinute;
        }
      }
      return `${monthsOfYear[targetMonth]} ${targetDay} | ${targetHour}:${targetMinute}`;
    }
    return `${monthsOfYear[targetMonth]} ${targetDay}, ${targetYear} | ${targetHour}:${targetMinute}`;
  };
  return (
    <li key={todo.id} className="flex items-center  p-2 mb-2 rounded shadow-md ">
      {!todo.completed&&<span onClick={()=>comleteTodo(todo)} className=' rounded-full m-2 p-1 border-[3px] border-slate-500 hover:text-emerald-500 hover:dark:text-emerald-300'><IoCheckmarkDoneOutline /></span>}
      <div className='w-full'>
        <div className='flex items-center'>
        <h4 className=' text-lg'>{todo.title}</h4>
        <p className=' text-[10px] p-1 pb-[1px]'>{pr[todo.priority]}</p>  
                <p className='ml-auto'>{getShortenDateTime(todo.date)}</p>
        </div>
        <div className='flex items-center justify-between'>
        <p>{todo.description}</p>

      <div className="flex justify-end">
        <button
          onClick={()=> deleteTodo(todo.id)}
          className="md:bg-red-500 md:hover:bg-blue-700 text-white font-bold p-1 rounded"
        >
          <span className='hidden font-medium md:block'>Remove</span>
          <MdDelete className='md:hidden text-red-500 ' size="20px"/>
        </button>
      </div>
      </div>
      </div>
    </li>
  );
}

export default TodoItem