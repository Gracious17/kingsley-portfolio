"use client" 
  
 import * as React from "react" 
  
 import { cn } from "@/lib/utils" 
  
 interface CardHoverRevealContextValue { 
   isHovered: boolean 
   setIsHovered: React.Dispatch<React.SetStateAction<boolean>> 
 } 
 const CardHoverRevealContext = React.createContext<CardHoverRevealContextValue>( 
   {} as CardHoverRevealContextValue 
 ) 
 const useCardHoverRevealContext = () => { 
   const context = React.useContext(CardHoverRevealContext) 
   if (!context) { 
     throw new Error( 
       "useCardHoverRevealContext must be used within a CardHoverRevealProvider" 
     ) 
   } 
   return context 
 } 
 const CardHoverReveal = React.forwardRef< 
   HTMLDivElement, 
   React.HTMLAttributes<HTMLDivElement> 
 >(({ className, ...props }, ref) => { 
   const [isHovered, setIsHovered] = React.useState<boolean>(false) 
  
   const handleMouseEnter = () => setIsHovered(true) 
   const handleMouseLeave = () => setIsHovered(false) 
  
   return ( 
     <CardHoverRevealContext.Provider 
       value={{ 
         isHovered, 
         setIsHovered, 
       }} 
     > 
       <div 
         ref={ref} 
         className={cn("relative overflow-hidden group", className)} 
         onMouseEnter={handleMouseEnter} 
         onMouseLeave={handleMouseLeave} 
         {...props} 
       /> 
     </CardHoverRevealContext.Provider> 
   ) 
 }) 
 CardHoverReveal.displayName = "CardHoverReveal" 
  
 interface CardHoverRevealMainProps { 
   initialScale?: number 
   hoverScale?: number 
 } 
 const CardHoverRevealMain = React.forwardRef< 
   HTMLDivElement, 
   React.HTMLAttributes<HTMLDivElement> & CardHoverRevealMainProps 
 >(({ className, initialScale = 1, hoverScale = 1.1, ...props }, ref) => { 
   const { isHovered } = useCardHoverRevealContext() 
   return ( 
     <div 
       ref={ref} 
       className={cn("size-full transition-transform duration-700 ease-out", className)} 
       style={ 
         isHovered 
           ? { transform: `scale(${hoverScale})`, ...props.style } 
           : { transform: `scale(${initialScale})`, ...props.style } 
       } 
       {...props} 
     /> 
   ) 
 }) 
 CardHoverRevealMain.displayName = "CardHoverRevealMain" 
  
 const CardHoverRevealContent = React.forwardRef< 
   HTMLDivElement, 
   React.HTMLAttributes<HTMLDivElement> 
 >(({ className, ...props }, ref) => { 
   const { isHovered } = useCardHoverRevealContext() 
   return ( 
     <div 
       ref={ref} 
       className={cn( 
         "absolute inset-x-0 bottom-0 p-6 md:p-8 backdrop-blur-3xl border-t border-white/10 transition-all duration-500 ease-in-out z-20 bg-black/60", 
         // Desktop-only hover logic
         "md:translate-y-full md:opacity-0",
         isHovered && "md:translate-y-0 md:opacity-100",
         // Mobile always visible
         "translate-y-0 opacity-100",
         className 
       )} 
       {...props} 
     /> 
   ) 
 }) 
 CardHoverRevealContent.displayName = "CardHoverRevealContent" 
  
 export { CardHoverReveal, CardHoverRevealMain, CardHoverRevealContent } 
