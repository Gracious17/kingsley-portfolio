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
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-modal-title"
            aria-describedby="exit-modal-desc"
          >
            <h2 id="exit-modal-title" className="text-2xl font-bold mb-2">Quick feedback?</h2>
            <p id="exit-modal-desc" className="mb-4 text-gray-600">Have 30 seconds to share a thought? Your input helps improve the portfolio experience.</p>
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
                className="px-4 py-2 rounded-full border-2 border-gray-300 text-gray-700 bg-transparent hover:bg-gray-100 transition-colors"
                disabled={loading}
              >
                No thanks
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-full bg-[#a362ff] text-white hover:bg-[#9857d3] transition-colors"
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
