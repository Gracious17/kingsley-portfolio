"use client"

import { Home, User, Briefcase, Wrench, Mail } from 'lucide-react'
import { EnhancedNavBar } from "./ui/enhanced-tubelight-navbar"

const TubelightNavbar = () => {
  const navItems = [
    { name: 'Home', url: '/', icon: Home, anchor: false },
    { name: 'About', url: '/#about', icon: User, anchor: true },
    { name: 'Projects', url: '/#projects', icon: Briefcase, anchor: true },
    { name: 'Skills', url: '/#skills', icon: Wrench, anchor: true },
    { name: 'Contact', url: '/#contact', icon: Mail, anchor: true }
  ]

  return <EnhancedNavBar items={navItems} />
}

export default TubelightNavbar