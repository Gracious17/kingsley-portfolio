// // components/SuccessMessage.tsx
// 'use client';

// import { motion } from 'framer-motion';

// export default function SuccessMessage({ onClose }: { onClose: () => void }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 30 }}
//       className="bg-green-100 border border-green-300 p-4 rounded-lg text-green-800 shadow-lg"
//     >
//       <h2 className="text-lg font-bold">Message Sent!</h2>
//       <p>Thanks for reaching out. I&pos;ll get back to you soon.</p>
//       <button
//         onClick={onClose}
//         className="mt-2 text-sm text-green-700 underline"
//       >
//         Send another message
//       </button>
//     </motion.div>
//   );
// }
'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function SuccessMessage({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4 }}
      className="bg-zinc-900/50 border border-[#a362ff]/30 backdrop-blur-xl shadow-2xl rounded-2xl p-6 md:p-10 w-full mx-auto text-center space-y-4"
    >
      <div className="flex justify-center">
        <CheckCircle className="text-[#5651e5]" size={48} />
      </div>
      <h2 className="text-xl font-semibold text-black">Message Sent Successfully!</h2>
      <p className="text-gray-600">
        Thanks for reaching out. I&apos;ll respond shortly. Your message means a lot!
      </p>
      <button
        onClick={onClose}
        className="inline-block mt-2 text-sm text-white bg-[#5651e5] hover:bg-[#433df2] px-4 py-2 rounded-full transition"
      >
        Send another message
      </button>
    </motion.div>
  );
}
