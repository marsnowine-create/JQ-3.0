import React from 'react';
import { motion } from 'framer-motion';
import { Agent } from './types';

interface TopAgentListProps {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
  activeAgentId?: string;
}

const TopAgentList: React.FC<TopAgentListProps> = ({ agents, onSelectAgent, activeAgentId }) => {
  return (
    <div className="w-full overflow-x-auto hide-scrollbar px-6 pb-2">
      <div className="flex gap-3 justify-between">
        {agents.map((agent) => (
          <motion.div 
            key={agent.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectAgent(agent)}
            className="flex flex-col items-center gap-2 shrink-0 group relative pt-4 flex-1"
          >
            {/* Background Shape (Pentagon/Badge like in image) */}
            <div className={`relative w-full min-w-[70px] h-22 ${activeAgentId === agent.id ? 'bg-emerald-50' : 'bg-white'} rounded-t-full rounded-b-2xl shadow-sm border border-emerald-50/50 flex flex-col items-center justify-end pb-4 overflow-visible transition-colors`}>
              {/* Avatar popping out */}
              <div className="absolute -top-3 w-12 h-12 rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-100 z-10">
                <img src={agent.avatar} className="w-full h-full object-cover" alt={agent.name} />
              </div>
              
              {/* Name Tag */}
              <div className="text-[9px] font-bold text-slate-600 text-center leading-tight px-1 z-0 mt-8">
                {agent.tag}
                <div className="h-[2px] w-3 bg-emerald-300 rounded-full mx-auto mt-1"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopAgentList;
