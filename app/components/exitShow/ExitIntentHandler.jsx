// "use client";

// import { useEffect, useState } from "react";
// import ExitIntentModal from "./ExitIntentModal"; // your modal component

// export default function ExitIntentHandler() {
//   const [showModal, setShowModal] = useState(false);
//   const [hasInteracted, setHasInteracted] = useState(false);

//   useEffect(() => {
//     // Check if the user has already commented before
//     const alreadyCommented = localStorage.getItem("hasCommented");
//      const showCount=parseInt(localStorage.getItem("exitIntentShown")||'0',10);
//     if (alreadyCommented === "true" || showCount >= 7){ 
//       setHasInteracted(true);
//       return; // Don't even set up event listeners
//     }
// // localStorage.setItem("exitIntentShown",showCount+1).toString(); // Increment the count


//     const handleMouseLeave = (e) => {
//         const already=localStorage.getItem("hasCommented");
//       if (e.clientY <= 0 && already!== "true") {
//         // User is moving the mouse out of the window
//         setShowModal(true);
//       }
//     };

//     const handleScroll = () => {
//         const already=localStorage.getItem('hasCommented');
//       if (window.scrollY < 10 && already!=='true') {
//         setShowModal(true);
//       }
//     };

//     const handleBeforeUnload = (e) => {
//         const already=localStorage.getItem('hasCommented');
//       if (already !== "true") {
//         // User is trying to leave the page
//         e.preventDefault();
//         e.returnValue = '';
//         return '';
//       }
//     };

//     const timer = setTimeout(() => {
//         const already=localStorage.getItem('hasCommented');
//         if (already !== "true") {
      
//         setShowModal(true);
//       }
//     }, 10000); // 10 seconds

//     window.addEventListener("mouseout", handleMouseLeave);
//     window.addEventListener("scroll", handleScroll);
//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener("mouseout", handleMouseLeave);
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [hasInteracted]);

//   const handleUserInteraction = () => {
//     setHasInteracted(true);
//     localStorage.setItem("exitIntentShown","7"); // Increment the count
//     localStorage.setItem("hasCommented", "true"); // Save to LocalStorage
//     setShowModal(false); // Close the modal
//   };

//   return (
//     <>
      
//         <ExitIntentModal
//         showModal={showModal}
//           onClose={() => setShowModal(false)}
//           setHasInteracted={handleUserInteraction} /> 
//           {/* Use the new function */}
    
    
//     </>
//   );
// }

'use client';

import { useEffect, useState } from "react";
import ExitIntentModal from "./ExitIntentModal";

export default function ExitIntentHandler() {
  const [showModal, setShowModal] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const alreadyCommented = localStorage.getItem("hasCommented");
    const showCount = parseInt(localStorage.getItem("exitIntentShown") || '0', 10);

    if (alreadyCommented === "true" || showCount >= 2) {
      setHasInteracted(true);
      return; // Don't even set up event listeners
    }

    const handleMouseLeave = (e) => {
      const already = localStorage.getItem("hasCommented");
      if (e.clientY <= 0 && already !== "true") {
        setShowModal(true);
      }
    };

    const handleScroll = () => {
      const already = localStorage.getItem('hasCommented');
      if (window.scrollY < 10 && already !== 'true') {
        setShowModal(true);
      }
    };

    const handleBeforeUnload = (e) => {
      const already = localStorage.getItem('hasCommented');
      if (already !== "true") {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    const timer = setTimeout(() => {
      const already = localStorage.getItem('hasCommented');
      if (already !== "true") {
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
    localStorage.setItem("exitIntentShown", '7'); // Increment the count
    localStorage.setItem("hasCommented", "true"); // Save to LocalStorage
    setShowModal(false); // Close the modal
  };

  return (
    <>
      <ExitIntentModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleUserInteraction} // Ensure correct function passed
      />
    </>
  );
}
