import React from 'react';
import { motion } from 'framer-motion';
import { AGENTS } from './constants';
import { AgentRole } from './types';

interface FloatingAgentsBackgroundProps {
  currentAgentId: AgentRole;
}

const FloatingAgentsBackground: React.FC<FloatingAgentsBackgroundProps> = ({ currentAgentId }) => {
  const otherAgents = AGENTS.filter(a => a.id !== currentAgentId);

  // Predefined positions relative to the container (the slide)
  // Designed to frame the central card without being hidden by it
  const positions = [
    { top: '5%', left: '10%', scale: 0.8, delay: 0 },
    { top: '8%', left: '80%', scale: 0.75, delay: 1.5 },
    { top: '35%', left: '5%', scale: 0.65, delay: 0.5 },
    { top: '30%', left: '85%', scale: 0.7, delay: 2 },
    { top: '2%', left: '45%', scale: 0.5, delay: 3 }, // Distant top
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Atmosphere / Glow */}
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[60%] bg-gradient-to-b from-emerald-50/50 via-transparent to-transparent opacity-60 blur-3xl" />

      {otherAgents.map((agent, index) => {
        const pos = positions[index % positions.length];
        
        return (
          <motion.div
            key={agent.id}
            className="absolute flex flex-col items-center"
            style={{ 
              top: pos.top, 
              left: pos.left, 
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: [0, -15, 0],
              x: [0, index % 2 === 0 ? 5 : -5, 0]
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: pos.delay
            }}
          >
            {/* Connection Line (faint orbit hint) */}
            <div className="absolute top-1/2 left-1/2 w-[100px] h-[100px] border border-slate-200/20 rounded-full -translate-x-1/2 -translate-y-1/2 -z-10" />

            {/* Planet Avatar */}
            <div className="relative group">
               {/* Glow effect */}
               <div className="absolute inset-0 bg-white/50 rounded-full blur-md group-hover:bg-emerald-200/50 transition-colors" />
               
               <div 
                 className="relative w-9 h-9 rounded-full bg-white/80 p-0.5 backdrop-blur-md shadow-sm border border-white/60 overflow-hidden"
                 style={{ transform: `scale(${pos.scale})` }}
               >
                  <img src={agent.avatar} className="w-full h-full rounded-full object-cover opacity-90" alt={agent.name} />
               </div>
            </div>
            
            {/* Tiny Label */}
            <motion.span 
              className="mt-1 text-[8px] text-slate-400 font-medium bg-white/60 px-1.5 rounded-full backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
            >
              {agent.tag}
            </motion.span>
          </motion.div>
        );
      })}

      {/* Floating Particles (Dust/Stars) */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-slate-400/20"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            top: `${Math.random() * 50}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

export default FloatingAgentsBackground;
