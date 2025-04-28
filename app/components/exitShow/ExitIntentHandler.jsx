"use client";

import { useEffect, useState } from "react";
import ExitIntentModal from "./ExitIntentModal"; // your modal component

export default function ExitIntentHandler() {
  const [showModal, setShowModal] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check if the user has already commented before
    const alreadyCommented = localStorage.getItem("hasCommented");
    if (alreadyCommented === "true") {
      setHasInteracted(true);
      return; // Don't even set up event listeners
    }

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !hasInteracted) {
        setShowModal(true);
      }
    };

    const handleScroll = () => {
      if (window.scrollY < 10 && !hasInteracted) {
        setShowModal(true);
      }
    };

    const handleBeforeUnload = (e) => {
      if (!hasInteracted) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowModal(true);
      }
    }, 10000); // 10 seconds

    window.addEventListener("mouseout", handleMouseLeave);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasInteracted]);

  const handleUserInteraction = () => {
    setHasInteracted(true);
    localStorage.setItem("hasCommented", "true"); // Save to LocalStorage
  };

  return (
    <>
      {showModal && (
        <ExitIntentModal
          onClose={() => setShowModal(false)}
          setHasInteracted={handleUserInteraction} // Use the new function
        />
      )}
    </>
  );
}
