
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CloudSun, 
  Mic, 
  Keyboard, 
  Send, 
  ChevronUp, 
  Volume2, 
  X,
  History,
  Sparkles,
  ArrowRight,
  Navigation,
  Car,
  Package,
  Ticket,
  Eye,
  Headphones,
  Camera,
  Search,
  MessageSquare,
  Gift,
  HelpCircle,
  Smartphone,
  Zap,
  MapPin,
  Map,
  Users,
  Smile,
  RefreshCw
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { AGENTS } from './constants';
import { ChatMessage, AgentRole } from './types';
import TourGuidePage from './TourGuidePage';
import FloatingHero from './FloatingHero';
import TopAgentList from './TopAgentList';
import FloatingAgentsBackground from './FloatingAgentsBackground';
import ChatMessageCard, { ChatMessageData } from './ChatMessageCard';

const App: React.FC = () => {
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [isInputText, setIsInputText] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState(0); // 0: 准备出发, 1: 园内探索, 2: 山海暂别
  const [showTourGuidePage, setShowTourGuidePage] = useState(false);
  const [showChatFlow, setShowChatFlow] = useState(false);
  const [chatFlowMessages, setChatFlowMessages] = useState<ChatMessageData[]>([]);

  const activeAgent = useMemo(() => AGENTS[currentAgentIndex], [currentAgentIndex]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 7s Auto Carousel
  // Removed auto-carousel for new layout as it's not card-based anymore
  /*
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isChatOpen && !showTourGuidePage && !isDrawerOpen) {
         setCurrentAgentIndex(prev => (prev + 1) % AGENTS.length);
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [isChatOpen, showTourGuidePage, isDrawerOpen]);
  */

  // Sync scroll position with currentAgentIndex
  /*
  useEffect(() => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: currentAgentIndex * width,
        behavior: 'smooth'
      });
    }
  }, [currentAgentIndex]);
  */

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // Disabled scroll sync logic
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsGenerating(true);
    setIsChatOpen(true);
    setIsDrawerOpen(false);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: text,
        config: {
          systemInstruction: `你是景区助手“${activeAgent.name}”。回答简洁、专业且有底蕴。`,
        }
      });
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: response.text || "正在处理中...", timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { id: 'err', role: 'assistant', content: "网络偶有波动，请重试。", timestamp: Date.now() }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const triggerChatFlow = () => {
    setShowChatFlow(true);
    setChatFlowMessages([]); // Clear previous if any

    // Sequence of messages
    const sequence: ChatMessageData[] = [
      { id: '1', type: 'gift', avatar: activeAgent.avatar, delay: 0 },
      { id: '2', type: 'recommendation', avatar: activeAgent.avatar, delay: 800 },
      { id: '3', type: 'loading', content: '我是指引者，为您导览路线·拥堵·停车·活动，正在侦探中......', avatar: activeAgent.avatar, delay: 1600 }
    ];

    // Add messages with delay
    sequence.forEach((msg) => {
      setTimeout(() => {
        setChatFlowMessages(prev => [...prev, msg]);
      }, msg.delay);
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#F8FAFC] select-none">
      {/* Header */}
      <header className="px-6 pt-12 pb-2 z-30 flex items-center justify-between">
        <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border border-white active:scale-95 transition-transform">
           <History size={20} className="text-slate-700" />
        </button>

        <div className="flex gap-2">
           <div className="flex items-center gap-1.5 bg-sky-50/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-sky-100 shadow-sm">
              <CloudSun size={14} className="text-sky-500" />
              <span className="text-xs font-bold text-sky-700">22°C</span>
           </div>
           
           <div className="flex items-center gap-1.5 bg-emerald-50/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm">
              <Users size={14} className="text-emerald-500" />
              <span className="text-xs font-bold text-emerald-700">客流较少</span>
           </div>
        </div>
        
        <div className="w-10 flex justify-end">
           <div className="flex gap-1 bg-white/50 p-1 rounded-full border border-white/50">
             <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-slate-800 ring-2 ring-white"></div>
           </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-20 overflow-hidden flex flex-col">
        {/* Top Agent List */}
        <div className="mt-4 mb-2">
          <TopAgentList 
            agents={AGENTS} 
            activeAgentId={activeAgent.id}
            onSelectAgent={(agent) => {
              const idx = AGENTS.findIndex(a => a.id === agent.id);
              setCurrentAgentIndex(idx);
            }} 
          />
        </div>

        {/* Hero Section */}
        <div className="flex-1 relative">
           {/* Only show Title and Hero when Chat Flow is NOT active */}
           {!showChatFlow && (
             <>
               <div className="px-8 mt-2 mb-4">
                 <h2 className="text-2xl font-black text-slate-900 italic">准备好，</h2>
                 <h2 className="text-2xl font-black text-slate-900 italic flex items-center gap-2">
                   即刻探索<span className="text-emerald-500">多彩贵州城</span> 
                   <RefreshCw size={16} className="text-emerald-500" />
                 </h2>
               </div>
               
               <FloatingHero onMainClick={triggerChatFlow} />
             </>
           )}

           {/* Chat Flow Area */}
           {showChatFlow && (
             <div className="absolute inset-0 px-2 pt-4 pb-20 overflow-y-auto hide-scrollbar z-30">
                <AnimatePresence>
                  {chatFlowMessages.map((msg) => (
                    <ChatMessageCard key={msg.id} message={msg} />
                  ))}
                </AnimatePresence>
             </div>
           )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative w-full z-[80] px-4 pb-6">
         {/* Top Service Bar */}
         <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
               <button 
                 onClick={() => setShowTourGuidePage(true)}
                 className="bg-white/90 backdrop-blur-md border border-white text-emerald-800 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 active:scale-95 transition-transform"
               >
                  <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500">
                    <Map size={14} />
                  </div>
                  <span className="text-xs font-bold">智能导览</span>
               </button>
               <button className="bg-white/90 backdrop-blur-md border border-white text-emerald-800 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 active:scale-95 transition-transform">
                  <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center text-purple-500">
                    <Ticket size={14} />
                  </div>
                  <span className="text-xs font-bold">智能订购</span>
               </button>
            </div>
            
            <button onClick={() => setIsDrawerOpen(true)} className="bg-slate-800/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 active:scale-95 transition-transform">
               <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                 <div className="bg-white/50 rounded-[1px]"></div>
                 <div className="bg-white/50 rounded-[1px]"></div>
                 <div className="bg-white/50 rounded-[1px]"></div>
                 <div className="bg-white/50 rounded-[1px]"></div>
               </div>
               <span className="text-xs font-bold">服务中心</span>
            </button>
         </div>

         {/* Input Area */}
         <div className="bg-white/95 backdrop-blur-3xl rounded-[32px] p-2 shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-white/50 relative z-20 flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 shrink-0 ml-1">
               <Sparkles size={20} />
            </div>
            <div className="flex-1 h-10 flex items-center">
               <span className="text-slate-400 text-xs font-bold mr-2 whitespace-nowrap">问问AI:</span>
               <input 
                 value={inputValue} 
                 onChange={(e) => setInputValue(e.target.value)} 
                 onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)} 
                 placeholder={`最美日落拍照点在哪`} 
                 className="w-full bg-transparent text-[13px] font-medium text-slate-600 outline-none placeholder:text-slate-300" 
               />
            </div>
            <button 
              onClick={() => handleSendMessage(inputValue)} 
              disabled={!inputValue.trim()} 
              className={`w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-colors ${inputValue.trim() ? 'bg-slate-900 text-white' : 'bg-slate-800 text-white'}`}
            >
              <Send size={16} />
            </button>
         </div>
      </footer>

      {/* Service Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-slate-900/30 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          >
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-[#F9FEFB] rounded-t-[40px] px-6 pt-2 pb-12 max-h-[85vh] overflow-y-auto hide-scrollbar shadow-2xl w-full max-w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-[#F9FEFB] z-10 pt-4 pb-6">
                <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
                <div className="flex items-center justify-around">
                  {[
                    { label: '准备出发', icon: <Car size={16} /> },
                    { label: '园内探索', icon: <Navigation size={16} /> },
                    { label: '山海暂别', icon: <Camera size={16} /> }
                  ].map((tab, idx) => (
                    <button 
                      key={tab.label} 
                      onClick={() => setActiveServiceTab(idx)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all text-[13px] font-bold ${
                        activeServiceTab === idx 
                        ? 'bg-emerald-500 text-white shadow-md' 
                        : 'bg-white text-emerald-600 border border-emerald-100'
                      }`}
                    >
                      {React.cloneElement(tab.icon, { size: 14 })}
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {activeServiceTab === 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="bg-white p-5 rounded-[24px] border border-slate-50 flex items-center justify-between shadow-sm">
                      <div className="space-y-1">
                        <h4 className="text-[14px] font-black text-slate-800 flex items-center gap-1.5">去景区导航 <span className="text-[10px] text-slate-400 font-medium">距离景区5.2km</span></h4>
                      </div>
                      <button className="bg-emerald-100/50 text-emerald-600 px-4 py-1.5 rounded-full text-[11px] font-bold">去导航</button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#F2F8FF] p-5 rounded-[24px] flex flex-col gap-2 relative overflow-hidden group">
                        <Car className="text-blue-200 absolute right-[-5px] bottom-[-5px]" size={60} />
                        <h5 className="text-[14px] font-black text-slate-800 z-10">车位查询</h5>
                        <div className="bg-blue-100/60 inline-block px-2.5 py-1 rounded-full w-fit z-10">
                           <span className="text-blue-600 text-[10px] font-bold">剩余 102</span>
                        </div>
                      </div>
                      <div className="bg-[#F4FDF6] p-5 rounded-[24px] flex flex-col gap-2 relative overflow-hidden">
                        <Package className="text-emerald-100 absolute right-[-5px] bottom-[-5px]" size={60} />
                        <h5 className="text-[14px] font-black text-slate-800 z-10">行李寄存</h5>
                        <div className="bg-emerald-100/60 inline-block px-2.5 py-1 rounded-full w-fit z-10">
                           <span className="text-emerald-600 text-[10px] font-bold">轻装出行</span>
                        </div>
                      </div>
                      <div className="bg-[#FFFAF0] p-5 rounded-[24px] flex flex-col gap-2 relative overflow-hidden">
                        <Ticket className="text-orange-100 absolute right-[-5px] bottom-[-5px]" size={60} />
                        <h5 className="text-[14px] font-black text-slate-800 z-10">领优惠券</h5>
                        <div className="bg-orange-100/60 inline-block px-2.5 py-1 rounded-full w-fit z-10">
                           <span className="text-orange-600 text-[10px] font-bold">立省 102</span>
                        </div>
                      </div>
                      <div className="bg-[#F8F5FF] p-5 rounded-[24px] flex flex-col gap-2 relative overflow-hidden">
                        <Car className="text-purple-100 absolute right-[-5px] bottom-[-5px]" size={60} />
                        <h5 className="text-[14px] font-black text-slate-800 z-10">高德飞街</h5>
                        <div className="bg-purple-100/60 inline-block px-2.5 py-1 rounded-full w-fit z-10">
                           <span className="text-purple-600 text-[10px] font-bold">VR 实景</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeServiceTab === 1 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="flex gap-4 h-60">
                      <div className="flex-1 bg-white rounded-[24px] overflow-hidden border border-slate-50 shadow-sm flex flex-col">
                        <img src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&w=400" className="w-full h-32 object-cover" />
                        <div className="p-4 flex-1 flex flex-col justify-between">
                           <h4 className="text-[13px] font-black text-slate-800 leading-tight">《多彩新光秀》即将开演</h4>
                           <p className="text-[10px] text-slate-400 font-medium">15分钟后开始距离场地200m</p>
                        </div>
                      </div>
                      <div className="w-[120px] flex flex-col gap-4">
                        <div className="flex-1 bg-white rounded-[24px] p-4 flex flex-col items-center justify-center text-center shadow-sm border border-slate-50 relative">
                           <h5 className="text-[12px] font-black text-slate-800 mb-1">听景区讲解</h5>
                           <p className="text-[9px] text-slate-400 mb-2">景区故事随身听</p>
                           <button className="bg-emerald-100 text-emerald-600 text-[9px] font-bold px-3 py-1 rounded-full">听讲解</button>
                           <Smile className="text-orange-300 absolute right-2 bottom-2" size={32} opacity={0.4} />
                        </div>
                        <div className="flex-1 bg-white rounded-[24px] p-4 flex flex-col items-center justify-center text-center shadow-sm border border-slate-50 relative">
                           <h5 className="text-[12px] font-black text-slate-800 mb-1">榜单推荐</h5>
                           <p className="text-[9px] text-slate-400 mb-2">拍照点位-览攻略</p>
                           <button className="bg-orange-100 text-orange-600 text-[9px] font-bold px-3 py-1 rounded-full">去打卡</button>
                           <Camera className="text-orange-300 absolute right-2 bottom-2" size={32} opacity={0.4} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-[#F4FDF6] p-5 rounded-[24px] flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm"><Users size={20} /></div>
                            <div>
                               <h6 className="text-[13px] font-black text-slate-800">找厕所</h6>
                               <p className="text-[10px] text-slate-400">看看附近的公共厕所在哪里</p>
                            </div>
                         </div>
                         <button className="bg-white text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-bold shadow-sm">去看看</button>
                      </div>
                      <div className="bg-[#F4FDF6] p-5 rounded-[24px] flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm"><Headphones size={20} /></div>
                            <div>
                               <h6 className="text-[13px] font-black text-slate-800">求助呼叫</h6>
                               <p className="text-[10px] text-slate-400">有任何问题都可以找客服求助</p>
                            </div>
                         </div>
                         <button className="bg-white text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-bold shadow-sm">问客服</button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeServiceTab === 2 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="bg-white p-6 rounded-[24px] border border-slate-50 shadow-sm flex flex-col relative overflow-hidden">
                       <div className="z-10">
                          <div className="flex gap-1 mb-2"><div className="w-1 h-1 bg-slate-200 rounded-full"></div><div className="w-1 h-1 bg-slate-200 rounded-full"></div><div className="w-1 h-1 bg-slate-200 rounded-full"></div></div>
                          <h4 className="text-[14px] font-black text-slate-800">行囊满载 回忆盈盈</h4>
                          <p className="text-[11px] text-slate-400 mt-1">快来晒晒您在景区的精彩瞬间吧！</p>
                       </div>
                       <button className="absolute right-6 top-1/2 -translate-y-1/2 bg-emerald-100 text-emerald-600 px-4 py-2 rounded-full text-[11px] font-bold">打卡留言</button>
                       <Map className="absolute -bottom-4 -left-4 text-emerald-50 opacity-10" size={120} />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                       <div className="bg-[#F4FDF6] p-4 rounded-[24px] flex flex-col items-center justify-center text-center border border-emerald-50">
                          <Gift className="text-emerald-500 mb-3" size={24} />
                          <h6 className="text-[12px] font-black text-slate-800">伴手礼品</h6>
                          <p className="text-[9px] text-slate-400 mt-1">把风景带走</p>
                       </div>
                       <div className="bg-[#F4FDF6] p-4 rounded-[24px] flex flex-col items-center justify-center text-center border border-emerald-50">
                          <Search className="text-emerald-500 mb-3" size={24} />
                          <h6 className="text-[12px] font-black text-slate-800">失物招领</h6>
                          <p className="text-[9px] text-slate-400 mt-1">丢东西了？</p>
                       </div>
                       <div className="bg-[#F4FDF6] p-4 rounded-[24px] flex flex-col items-center justify-center text-center border border-emerald-50">
                          <MessageSquare className="text-emerald-500 mb-3" size={24} />
                          <h6 className="text-[12px] font-black text-slate-800">评价/吐槽</h6>
                          <p className="text-[9px] text-slate-400 mt-1">悄悄告诉我</p>
                       </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Layer */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] bg-slate-900/30 backdrop-blur-sm"
              onClick={() => setIsChatOpen(false)}
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 h-[85vh] z-[120] bg-white rounded-t-[40px] flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="px-8 pt-6 pb-4 flex items-center justify-between border-b border-slate-50 bg-white z-10">
                <div className="flex items-center gap-4">
                  <img src={activeAgent.avatar} className="w-12 h-12 rounded-2xl object-cover shadow-md" alt="" />
                  <div>
                    <h3 className="font-black text-slate-900 text-sm tracking-tighter">{activeAgent.name}</h3>
                    <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div><span className="text-[9px] text-emerald-600 font-black uppercase">Online</span></div>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-400"><X size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 bg-slate-50/30 hide-scrollbar">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-6 py-4 rounded-[30px] shadow-sm ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'}`}>
                      <p className="text-[14px] leading-relaxed font-medium">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isGenerating && <div className="flex gap-1.5 p-4 bg-white w-20 rounded-full shadow-sm items-center justify-center ml-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></div></div>}
              </div>
              <div className="px-6 pb-8 pt-4 bg-white border-t border-slate-50">
                 <div className="bg-slate-50 rounded-full p-2 flex items-center gap-3 border border-slate-100 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
                    <input autoFocus value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)} placeholder="输入您的问题..." className="flex-1 bg-transparent px-4 py-2 text-sm font-bold outline-none text-slate-700" />
                    <button onClick={() => handleSendMessage(inputValue)} className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform"><Send size={16} /></button>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Tour Guide Page */}
      <AnimatePresence>
        {showTourGuidePage && (
          <TourGuidePage 
             agent={AGENTS.find(a => a.id === AgentRole.TOUR_GUIDE)!} 
             onBack={() => setShowTourGuidePage(false)}
             onSendMessage={(text) => {
               // When sending message from Tour Page, maybe open Chat?
               // For now, let's close tour page and open chat
               setShowTourGuidePage(false);
               handleSendMessage(text);
             }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
