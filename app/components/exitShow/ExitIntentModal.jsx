// "use client";

// import {motion, AnimatePresence } from "framer-motion";
// import { s } from "framer-motion/client";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// // type ExitIntentModalProps = {
// //     onClose: () => void;
// //     onSubmit: () => void;
// //   };
  
//   export default function ExitIntentModal({ onClose, onSubmit ,showModal}) {
//     const [comment, setComment] = useState('');
//     const [loading, setLoading] = useState(false);
  
//     useEffect(()=>{
//         if(showModal){
//             document.body.style.overflow = 'hidden'; // Disable scrolling
//         }else{
//             document.body.style.overflow = ''; 
//         }
//         return () => {
//             document.body.style.overflow = ''; // Re-enable scrolling when modal is closed
//         };
//     },[showModal])
//     const handleSubmit = async () => {
//       if (comment.trim() !== '') {
//         setLoading(true);
//         const uniqueId=Math.random().toString(36).substring(2, 9);
//          const currentDate=new Date().toISOString();
//         try {
//           await fetch('https://sheetdb.io/api/v1/487qo7rihf46h', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ data:[
//                 {id:uniqueId,comment:comment,date:currentDate}
//             ]
//          }),
//           });
//             setLoading(false);
//           toast.success('Thank you for your feedback!');
//           onSubmit(); // Tell the parent they submitted!

//         } catch (error) {
//           console.error('Error saving comment:', error);
//           toast.error("Failed to save comment. Pls one more time")
//         }
//       } else {
//         toast.warning('Please enter a comment before submitting.');
//       }
//     };
  

//     const handleSkip = () => {
//       onClose(); // Close without submitting
//     };
  
//     return (
//       <AnimatePresence>
//         {
//             showModal &&(
//                 <motion.div 
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div 
//             className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md"
//             initial={{ scale: 0.8 }}
//             animate={{ scale: 1 }}
//             exit={{ scale: 0.8 }}
//           >
//             <h2 className="text-2xl font-bold mb-4">Wait! Before you leave...</h2>
//             <p className="mb-4 text-gray-600">Please leave a comment to help us improve:</p>
//             <textarea
//               className="w-full p-3 border rounded mb-4"
//               rows={4}
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               disabled={loading}
//               placeholder="Your comment here..."
//             />
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={handleSkip}
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//               disabled={loading}
//               >
//                 No Thanks
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 {loading ? (
//                   <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
//                   </svg>
//                 ) : (
//                   'Submit'
//                 )}
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//      )}
//       </AnimatePresence>
//     );
//   }
  
'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";



export default function ExitIntentModal({ onClose, onSubmit, showModal }) {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling
    }
    return () => {
      document.body.style.overflow = ''; // Re-enable scrolling when modal is closed
    };
  }, [showModal]);

  const handleSubmit = async () => {
    if (comment.trim() !== '') {
      setLoading(true);
      const uniqueId = Math.random().toString(36).substring(2, 9);
      const currentDate = new Date().toISOString();
      try {
        const response = await fetch('https://sheetdb.io/api/v1/487qo7rihf46h', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: [{ id: uniqueId, comment: comment, date: currentDate }]
          }),
        });
        if (response.ok) {
          toast.success('Thank you for your feedback!');
          onSubmit(); // Tell the parent they submitted!
        } else {
          throw new Error('Failed to save comment');
        }
      } catch (error) {
        console.error('Error saving comment:', error);
        toast.error("Failed to save comment. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning('Please enter a comment before submitting.');
    }
  };

  const handleSkip = () => {
    onClose(); // Close without submitting
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-4">Wait! Before you leave...</h2>
            <p className="mb-4 text-gray-600">Please leave a comment to help us improve:</p>
            <textarea
              className="w-full p-3 border rounded mb-4"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={loading}
              placeholder="Your comment here..."
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleSkip}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                disabled={loading}
              >
                No Thanks
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
