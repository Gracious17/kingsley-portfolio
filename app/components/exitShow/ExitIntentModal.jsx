"use client";

import {motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

// type ExitIntentModalProps = {
//     onClose: () => void;
//     onSubmit: () => void;
//   };
  
  export default function ExitIntentModal({ onClose, onSubmit }) {
    const [comment, setComment] = useState('');
  
    const handleSubmit = async () => {
      if (comment.trim() !== '') {
        const uniqueId=Math.random().toString(36).substring(2, 9);
         const currentDate=new Date().toISOString();
        try {
          await fetch('https://sheetdb.io/api/v1/487qo7rihf46h', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data:[
                {id:uniqueId,comment:comment,date:currentDate}
            ]
         }),
          });
          toast.success('Thank you for your feedback!');
          onSubmit(); // Tell the parent they submitted!
        } catch (error) {
          console.error('Error saving comment:', error);
          toast.error("Failed to save comment. Pls one more time")
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
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleSkip}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                No Thanks
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }
  