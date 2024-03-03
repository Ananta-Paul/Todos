import React,{useState,useEffect} from 'react'
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

const Navbar = () => {
    const [theme, setTheme] = useState("light");
    const toggleTheme = () => {
      let thm = "dark";
      if (theme == "dark") thm = "light";
      localStorage.setItem("theme", thm);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(thm);
      setTheme(thm);
    };
    useEffect(() => {
      if(typeof window !== 'undefined'){
        const storedTheme = localStorage.getItem('theme');
        if(storedTheme){
          setTheme(storedTheme);
          document.documentElement.classList.remove("light", "dark");
          document.documentElement.classList.add(storedTheme);
        }
      }
    },[typeof window]);
  return (
    <div className=     " flex justify-between p-4" >
  <h2 className=' text-3xl'>Todos</h2>
        {theme !== "dark" ? (   
            <BsFillMoonStarsFill
              onClick={toggleTheme}
              className="mr-[2px] h-10 w-10 rounded-lg p-2.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-900 dark:focus:ring-gray-700 sm:mr-3"
            />
          ) : (
            <BsFillSunFill
              onClick={toggleTheme}
              className="mr-[2px] h-10 w-10 rounded-lg p-2.5 text-gray-300 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:focus:ring-gray-700 sm:mr-3"
            />
          )}
    </div>

  )
}

export default Navbar