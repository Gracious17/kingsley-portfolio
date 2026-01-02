"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
// import ThemeToggle from '../darkModeToggle/ThemeToggle'

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  anchor?: boolean
}

interface EnhancedNavBarProps {
  items: NavItem[]
  className?: string
}

export function EnhancedNavBar({ items, className }: EnhancedNavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)
  const [shadow, setShadow] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Shadow on scroll
  useEffect(() => {
    const handleShadow = () => {
      setShadow(window.scrollY >= 90)
    }
    window.addEventListener("scroll", handleShadow)
    return () => window.removeEventListener("scroll", handleShadow)
  }, [])

  // Smooth scroll for anchor links
  const handleSmoothScroll = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault()
      const id = href.split("#")[1]
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  // Update active tab based on current route
  useEffect(() => {
    const currentItem = items.find(item => {
      if (item.url === pathname) return true
      if (item.url.startsWith("/#") && pathname === "/") {
        return typeof window !== 'undefined' && window.location.hash === item.url.replace('/', '')
      }
      return false
    })
    if (currentItem) {
      setActiveTab(currentItem.name)
    }
  }, [pathname, items])

  return (
    <>
      {/* Desktop Navigation - Top */}
      <div
        className={cn(
          "hidden md:flex fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6 w-full max-w-7xl px-4",
          className,
        )}
      >
        <div className="flex justify-between items-center w-full">
          {/* Logo - Commented out for now */}
          {/* 
          <Link 
            href="/" 
            aria-label="Home" 
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
          >
            <div className="flex items-center">
              <Image
                src="/assets/logo.svg"
                alt="Logo"
                width={40}
                height={44}
                className="w-10 h-auto hover:scale-110 transition-transform duration-300"
              />
            </div>
          </Link>
          */}

          {/* Navigation - Centered on desktop when no logo */}
          <div className={cn(
            "flex items-center gap-3 backdrop-blur-lg py-1 px-1 rounded-full transition-all duration-300 mx-auto",
            shadow 
              ? "bg-background/80 border border-border shadow-lg" 
              : "bg-background/20 border border-border/50"
          )}>
            {items.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.name
              return (
                <Link
                  key={item.name}
                  href={item.url}
                  onClick={(e) => {
                    setActiveTab(item.name)
                    handleSmoothScroll(e, item.url)
                  }}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200",
                    "text-foreground/80 hover:text-primary",
                    isActive && "text-primary",
                  )}
                >
                  <span className="inline">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="lamp-desktop"
                      className="absolute inset-0 w-full bg-primary/10 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                        <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                        <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Theme Toggle - Positioned on the right - Commented out for now */}
          {/* 
          <div className="flex items-center absolute right-0">
            <ThemeToggle />
          </div>
          */}
        </div>
      </div>

      {/* Mobile Navigation - Bottom */}
      <div
        className={cn(
          "md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-50 pb-6 w-full max-w-md px-4",
          className,
        )}
      >
        <div className="flex justify-center">
          {/* Mobile Navigation */}
          <div className="flex items-center gap-1 bg-background/90 border border-border backdrop-blur-lg py-2 px-2 rounded-full shadow-lg">
            {items.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.name
              return (
                <Link
                  key={item.name}
                  href={item.url}
                  onClick={(e) => {
                    setActiveTab(item.name)
                    handleSmoothScroll(e, item.url)
                  }}
                  className={cn(
                    "relative cursor-pointer p-3 rounded-full transition-all duration-200",
                    "text-foreground/80 hover:text-primary",
                    isActive && "text-primary",
                  )}
                >
                  <Icon size={20} strokeWidth={2.5} />
                  {isActive && (
                    <motion.div
                      layoutId="lamp-mobile"
                      className="absolute inset-0 w-full bg-primary/10 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full">
                        <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -bottom-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -bottom-1" />
                        <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm bottom-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile Logo and Theme Toggle - Top - Commented out for now */}
      {/* 
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 pt-6 px-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            aria-label="Home" 
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
          >
            <div className="flex items-center">
              <Image
                src="/assets/logo.svg"
                alt="Logo"
                width={40}
                height={44}
                className="w-10 h-auto hover:scale-110 transition-transform duration-300"
              />
            </div>
          </Link>

          <ThemeToggle />
        </div>
      </div>
      */}

      {/* Mobile Theme Toggle - Top Right Only - Commented out for now */}
      {/* 
      <div className="md:hidden fixed top-0 right-0 z-40 pt-6 pr-4">
        <ThemeToggle />
      </div>
      */}
    </>
  )
}