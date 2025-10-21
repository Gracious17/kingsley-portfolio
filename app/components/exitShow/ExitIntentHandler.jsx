'use client';

import { useEffect, useState } from "react";
import ExitIntentModal from "./ExitIntentModal";

export default function ExitIntentHandler() {
  const [showModal, setShowModal] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const alreadyCommented = localStorage.getItem("hasCommented") === "true";
    const skipComment = localStorage.getItem("skipComment") === "true";

    if (alreadyCommented || skipComment) {
      setHasInteracted(true);
      return; // Do not schedule timer
    }

    // Show once, 3 minutes after page load
    const timer = setTimeout(() => {
      setShowModal(true);
      setHasInteracted(true);
    }, 180000); // 3 minutes in ms

    return () => clearTimeout(timer);
  }, []);

  // Triggered on successful submit in modal
  const handleUserInteraction = () => {
    setHasInteracted(true);
    localStorage.setItem("hasCommented", "true");
    setShowModal(false);
  };

  // Triggered on "No Thanks" in modal
  const handleSkip = () => {
    setHasInteracted(true);
    localStorage.setItem("skipComment", "true");
    setShowModal(false);
  };

  return (
    <>
      {/* Only pass necessary handlers */}
      <ExitIntentModal
        showModal={showModal}
        onClose={handleSkip}
        onSubmit={handleUserInteraction}
      />
    </>
  );
}
