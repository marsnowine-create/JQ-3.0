import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, MapPin, Star, Ticket } from 'lucide-react';

export type MessageType = 'gift' | 'recommendation' | 'loading' | 'text';

export interface ChatMessageData {
  id: string;
  type: MessageType;
  content?: string;
  avatar?: string;
  delay?: number;
}

interface ChatMessageCardProps {
  message: ChatMessageData;
  onLoadComplete?: () => void;
}

const ChatMessageCard: React.FC<ChatMessageCardProps> = ({ message, onLoadComplete }) => {
  const [typedText, setTypedText] = useState('');
  
  // Typewriter effect for loading/text messages
  useEffect(() => {
    if (message.type === 'loading' && message.content) {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(message.content!.substring(0, i + 1));
        i++;
        if (i >= message.content!.length) {
          clearInterval(interval);
          if (onLoadComplete) onLoadComplete();
        }
      }, 50); // Speed of typing
      return () => clearInterval(interval);
    }
  }, [message, onLoadComplete]);

  const renderContent = () => {
    switch (message.type) {
      case 'gift':
        return (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 max-w-[85%]">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="text-orange-500" size={18} />
              <span className="font-black text-slate-800 text-[14px]">游园大礼包</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">景区超热闹~专属福利等你来！</p>
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-[11px]">
                <span className="font-bold text-slate-700">旅拍：</span>
                <span className="text-sky-500 font-medium border-b border-sky-200 border-dashed">AI 修图免费1次</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="font-bold text-slate-700">餐饮：</span>
                <span className="text-sky-500 font-medium border-b border-sky-200 border-dashed">指定商户满 50 减 10 优惠券</span>
              </div>
            </div>
            <button className="w-full bg-orange-100 text-orange-600 py-2 rounded-lg text-xs font-black flex items-center justify-center gap-1 active:scale-95 transition-transform">
               <div className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center">
                 <span className="text-white text-[8px]">¥</span>
               </div>
               一键领取
            </button>
          </div>
        );

      case 'recommendation':
        return (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 w-full max-w-[95%]">
             <div className="flex items-center gap-2 mb-3">
               <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center">
                 <MapPin size={14} className="text-indigo-500" />
               </div>
               <span className="font-black text-slate-800 text-[14px]">最佳打卡点推荐</span>
             </div>
             
             <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                {/* Item 1 */}
                <div className="shrink-0 w-[120px] flex flex-col gap-2">
                   <div className="relative h-[80px] rounded-lg overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1599571343724-4b53e925c350?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover" />
                      <div className="absolute top-1 left-1 bg-orange-500 text-white text-[10px] font-bold px-1.5 rounded-md">01</div>
                   </div>
                   <div>
                      <h5 className="text-[12px] font-bold text-slate-800">鼓楼</h5>
                      <div className="flex items-center gap-2 mt-0.5">
                         <div className="flex items-center text-orange-400 text-[10px] gap-0.5">
                            <Star size={10} fill="currentColor" />
                            <span className="font-bold">5.0分</span>
                         </div>
                         <span className="text-[10px] text-slate-400">| 免费</span>
                      </div>
                   </div>
                </div>

                {/* Item 2 */}
                <div className="shrink-0 w-[120px] flex flex-col gap-2">
                   <div className="relative h-[80px] rounded-lg overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover" />
                      <div className="absolute top-1 left-1 bg-orange-400 text-white text-[10px] font-bold px-1.5 rounded-md">02</div>
                   </div>
                   <div>
                      <h5 className="text-[12px] font-bold text-slate-800">民族大巡游</h5>
                      <div className="flex items-center gap-2 mt-0.5">
                         <div className="flex items-center text-orange-400 text-[10px] gap-0.5">
                            <Star size={10} fill="currentColor" />
                            <span className="font-bold">5.0分</span>
                         </div>
                         <span className="text-[10px] text-slate-400">| 免费</span>
                      </div>
                   </div>
                </div>

                {/* Item 3 */}
                <div className="shrink-0 w-[120px] flex flex-col gap-2">
                   <div className="relative h-[80px] rounded-lg overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover" />
                      <div className="absolute top-1 left-1 bg-orange-400 text-white text-[10px] font-bold px-1.5 rounded-md">03</div>
                   </div>
                   <div>
                      <h5 className="text-[12px] font-bold text-slate-800">1958创意园</h5>
                      <div className="flex items-center gap-2 mt-0.5">
                         <div className="flex items-center text-orange-400 text-[10px] gap-0.5">
                            <Star size={10} fill="currentColor" />
                            <span className="font-bold">5.0分</span>
                         </div>
                         <span className="text-[10px] text-slate-400">| 收费</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        );

      case 'loading':
        return (
          <div className="bg-transparent p-2 max-w-[90%]">
             <p className="text-[13px] font-medium text-slate-600 leading-relaxed">
               {typedText}
               <span className="inline-block w-0.5 h-3 bg-slate-400 ml-0.5 animate-pulse"></span>
             </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="flex gap-3 mb-4 w-full px-4"
    >
      <div className="w-8 h-8 rounded-full border border-white shadow-sm overflow-hidden shrink-0 bg-white mt-1">
        <img src={message.avatar} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
    </motion.div>
  );
};

export default ChatMessageCard;
