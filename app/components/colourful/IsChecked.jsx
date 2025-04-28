"use client"
import React, { useEffect, useState } from 'react'
import WeekendPoUP from './WeekendPopUp'
const IsChecked = () => {
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(()  => {
        const seen = sessionStorage.getItem("seenWelcome");
        if (!seen) {
            setShowWelcome(true);
            sessionStorage.setItem("seenWelcome", "true");
        }
    }, []);

    useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 120,
            // startVelocity: 35,
            origin: { y: 0.6 },
            zIndex: 99999,
            // ticks: 200,
        })
    },[])
  return (
    <div>

        {showWelcome && <WeekendPoUP />}
    </div>
  )
}

export default IsChecked