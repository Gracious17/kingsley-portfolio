"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaDesktop } from "react-icons/fa";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [openModeTab,setOpenModeTab]=useState(null)
  
  useEffect(() => setMounted(true), []);

  const handleOpenTab=()=>{
    setOpenModeTab(!openModeTab)
  }

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <div onClick={handleOpenTab} className={`${theme==='dark'?'text-white bg-transparent border-2 border-[#5651e5] rounded-full text-xs font-bold p-2':' bg-transparent border-2 border-gray-500 rounded-full text-xs font-bold p-2'}`}>
        {openModeTab &&
        
        
        
    <div className="flex gap-4 items-center flex-col mt-20 ">
      {/* light mode button */}
      <button onClick={() => setTheme("light")} >
        <Sun className={`text-xl ${currentTheme==='light'?'text-yellow-500':''}`}
        />
      </button>
      {/* Dark Mode Button */}
      <button  onClick={()=>setTheme('dark')}>
<Moon   className={`text-xl ${currentTheme==='dark'?'text-gray-400':''}`}/>
      </button>

      {/* System mode button */}
      <button onClick={()=>setTheme('system')} >
<FaDesktop className={`text-xl ${theme==='system'?'text-green-400':''}`}
/>
      </button>
    </div>
        }
        </div>
  );
};

export default ThemeToggle;
