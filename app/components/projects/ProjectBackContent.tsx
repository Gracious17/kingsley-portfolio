"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import TabNavigation from "../shared/TabNavigation";
import ProjectActions from "./ProjectActions";

interface ProjectBackContentProps {
  title: string;
  technologies?: string[];
  demoUrl?: string;
  codeUrl?: string;
  isFlipped: boolean;
  onFlipBack: () => void;
}

const ProjectBackContent = ({ 
  title, 
  technologies = [], 
  demoUrl, 
  codeUrl, 
  isFlipped,
  onFlipBack 
}: ProjectBackContentProps) => {
  const [activeTab, setActiveTab] = useState<'highlights' | 'stack' | 'insights'>('highlights');

  const tabs = [
    { id: 'highlights', label: 'Highlights' },
    { id: 'stack', label: 'Tech' },
    { id: 'insights', label: 'Insights' }
  ];

  const highlights = [
    { icon: "🎯", text: "Responsive Design", color: "bg-green-400" },
    { icon: "✨", text: "Modern UI/UX", color: "bg-blue-400" },
    { icon: "⚡", text: "Performance Optimized", color: "bg-purple-400" }
  ];

  const insights = [
    { icon: "💡", text: "Key challenge: animation performance tuning", color: "bg-yellow-400" },
    { icon: "🎓", text: "Lesson: use CSS transforms for GPU acceleration", color: "bg-pink-400" },
    { icon: "🚀", text: "Outcome: smoother interactions and lower layout thrash", color: "bg-teal-400" }
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/50 border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/40 to-purple-800/60 backdrop-blur-sm h-full">
      <div className="p-5 sm:p-6 md:p-8 h-full flex flex-col justify-start sm:justify-center space-y-5 md:space-y-6 overflow-y-auto md:overflow-visible">
        {/* Header with tabs and flip control */}
        <div className="flex items-center justify-between mb-4">
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(tabId) => setActiveTab(tabId as 'highlights' | 'stack' | 'insights')}
            variant="compact"
          />
          <motion.button
            onClick={onFlipBack}
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/15"
          >
            Flip Back
          </motion.button>
        </div>

        {/* Tab Content */}
        {activeTab === 'highlights' && (
          <>
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl font-['Poppins'] font-bold text-white"
            >
              Project Highlights
            </motion.h4>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isFlipped ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-4"
            >
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-2 h-2 ${highlight.color} rounded-full animate-pulse`} 
                       style={{ animationDelay: `${index * 0.5}s` }}></div>
                  <span className="text-white/90 font-['Poppins']">{highlight.text}</span>
                </div>
              ))}
            </motion.div>
          </>
        )}

        {activeTab === 'stack' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-3"
          >
            <h5 className="text-lg font-['Poppins'] font-semibold text-purple-300">Tech Stack</h5>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: isFlipped ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="px-2 py-1 text-xs font-medium bg-white/10 text-white rounded-md border border-white/20"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'insights' && (
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-3 text-white/90"
          >
            {insights.map((insight, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className={`w-2 h-2 ${insight.color} rounded-full animate-pulse`} 
                     style={{ animationDelay: `${index * 0.5}s` }}></div>
                <span className="font-['Poppins']">{insight.text}</span>
              </li>
            ))}
          </motion.ul>
        )}

        {/* Action Buttons */}
        <ProjectActions
          demoUrl={demoUrl}
          codeUrl={codeUrl}
          isFlipped={isFlipped}
          variant="back"
        />
      </div>
    </div>
  );
};

export default ProjectBackContent;