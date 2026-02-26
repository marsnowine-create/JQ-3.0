import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Map, Headphones, BookOpen, Mic, Send, MoreHorizontal, Sun } from 'lucide-react';
import { Agent } from './types';

interface TourGuidePageProps {
  agent: Agent;
  onBack: () => void;
  onSendMessage: (text: string) => void;
}

const TourGuidePage: React.FC<TourGuidePageProps> = ({ agent, onBack, onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[200] bg-gradient-to-b from-emerald-50 via-[#F2FCF8] to-white flex flex-col overflow-hidden"
    >
      {/* Header */}
      <header className="px-6 pt-14 pb-4 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm text-slate-700 active:scale-90 transition-transform">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
           <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm text-slate-700">
             <MoreHorizontal size={20} />
           </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 hide-scrollbar">
        
        {/* Greeting */}
        <div className="mb-8 mt-2">
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-2 mb-3">
            Hi, 早上好 <Sun className="text-orange-400" fill="currentColor" size={28} />
          </h1>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            我是<span className="text-emerald-600 font-bold mx-1">{agent.name}</span>，你的随身金牌导游。点击导览卡片即可直达地图，走到哪讲到哪，让风景更有故事。
          </p>
        </div>

        {/* Avatar & Tags Visualization */}
        <div className="relative w-full h-64 mb-8 flex items-center justify-center">
          {/* Orbits */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-48 h-48 border border-emerald-100 rounded-full animate-spin-slow"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-64 h-64 border border-emerald-50 rounded-full animate-spin-reverse-slow"></div>
          </div>

          {/* Avatar */}
          <div className="relative z-10 w-32 h-32 rounded-full border-[6px] border-white shadow-[0_20px_50px_rgba(16,185,129,0.2)] bg-white overflow-hidden">
            <img src={agent.avatar} className="w-full h-full object-cover" alt={agent.name} />
          </div>

          {/* Floating Tags */}
          {agent.presets.map((preset, index) => {
            // Configuration for positions and animations
            const configs = [
              { 
                className: "absolute top-4 left-4", 
                animate: { y: [0, -10, 0] }, 
                transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } 
              },
              { 
                className: "absolute bottom-10 right-0", 
                animate: { y: [0, 10, 0] }, 
                transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 } 
              },
              { 
                className: "absolute top-1/2 -left-2", 
                animate: { x: [0, 5, 0] }, 
                transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 } 
              },
              { 
                className: "absolute top-1/2 -right-2", 
                animate: { x: [0, -5, 0] }, 
                transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 } 
              }
            ];
            
            const config = configs[index % configs.length];

            return (
              <motion.button
                key={preset}
                animate={config.animate}
                transition={config.transition}
                onClick={() => onSendMessage(preset)}
                className={`${config.className} bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm text-[10px] font-bold text-slate-600 cursor-pointer hover:bg-emerald-50 hover:text-emerald-600 transition-colors z-20 whitespace-nowrap`}
              >
                {preset}
              </motion.button>
            );
          })}

        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] p-5 rounded-[28px] relative overflow-hidden h-36 flex flex-col justify-between shadow-sm group active:scale-95 transition-transform">
             <div className="absolute top-0 right-0 p-4 opacity-20">
               <Map size={80} className="text-emerald-800" />
             </div>
             <div>
               <h3 className="text-lg font-black text-emerald-900 mb-1">智能导览</h3>
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-6 h-6 rounded-full bg-white border-2 border-[#D1FAE5] flex items-center justify-center text-[8px] font-bold text-emerald-600 overflow-hidden">
                     <img src={`https://picsum.photos/50/50?random=${i}`} className="w-full h-full object-cover" />
                   </div>
                 ))}
                 <div className="w-6 h-6 rounded-full bg-white border-2 border-[#D1FAE5] flex items-center justify-center text-[8px] font-bold text-emerald-600 pl-1">
                   1千+
                 </div>
               </div>
             </div>
             <button className="bg-white text-emerald-600 px-4 py-1.5 rounded-full text-xs font-black w-fit shadow-sm">去看看</button>
          </div>

          <div className="bg-white p-5 rounded-[28px] relative overflow-hidden h-36 flex flex-col justify-between shadow-sm border border-slate-100 active:scale-95 transition-transform">
             <div>
               <h3 className="text-lg font-black text-slate-800 mb-1">听景区讲解</h3>
               <p className="text-xs text-slate-400 font-medium">景区故事随身听</p>
             </div>
             <div className="flex items-end justify-between">
                <button className="bg-[#F0FDF4] text-emerald-600 px-4 py-1.5 rounded-full text-xs font-black shadow-sm">听讲解</button>
                <img src="https://img.lenyiin.com/app/hide.php?key=azhhUXJWTnB6QSsvV1pXUi9Mc1pNL2Y3T1FpMWczSXpvZktvSVVBPQ==" className="w-12 h-12 object-cover rounded-full border-2 border-white shadow-md mb-[-10px] mr-[-10px]" />
             </div>
          </div>
        </div>

      </div>

      {/* Bottom Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl px-6 pb-8 pt-4 border-t border-slate-100 rounded-t-[30px]">
         {/* Quick Actions */}
         <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
               <img src={agent.avatar} className="w-full h-full object-cover" />
            </div>
            {['看地图', '听讲解', '问历史', '游客服务'].map((action, i) => (
              <button key={i} className="flex items-center gap-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 px-3 py-1.5 rounded-full text-[11px] font-bold border border-slate-100 transition-colors shrink-0">
                {i === 0 && <Map size={12} />}
                {i === 1 && <Headphones size={12} />}
                {i === 2 && <BookOpen size={12} />}
                {action}
              </button>
            ))}
         </div>

         {/* Input */}
         <div className="flex items-center gap-3 bg-slate-100 rounded-full px-2 py-2">
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm">
               <Mic size={20} />
            </button>
            <input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="近期景区有什么活动？"
              className="flex-1 bg-transparent text-sm font-medium outline-none text-slate-700 placeholder:text-slate-400"
            />
            <button 
              onClick={() => {
                if(inputValue.trim()) {
                   onSendMessage(inputValue);
                   setInputValue('');
                }
              }}
              className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-md active:scale-90 transition-transform"
            >
               <Send size={18} />
            </button>
         </div>
      </div>
    </motion.div>
  );
};

export default TourGuidePage;
