import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CENTRAL_IMAGE = "https://img.lenyiin.com/app/hide.php?key=YlFGeGlPVlhSN3k3T05ic2haSmdpaFkrd0dscXVUbm5rNmxGb3NRPQ==";

const SURROUNDING_IMAGES = [
  "https://img.lenyiin.com/app/hide.php?key=M1M5cHpicVVSY0VzdHZBWWhlODc2eFkrd0dscXVUbm5rNmxGb3NRPQ==",
  "https://img.lenyiin.com/app/hide.php?key=eEtXN0FRTU1yMDlDbU82ZjJOTDVBQlkrd0dscXVUbm5rNmxGb3NSYU1nPT0=",
  "https://img.lenyiin.com/app/hide.php?key=QTRFM3B4N0hwTGhtOVdIcktxU0NEeFkrd0dscXVUbm5rNmxGb3NRPQ==",
  "https://img.lenyiin.com/app/hide.php?key=Z0VZZE9hSGh3TkhKMVN2YzZOSnZkUlkrd0dscXVUbm5rNmxGb3NRPQ==",
  "https://img.lenyiin.com/app/hide.php?key=S0x2NVlnditiOGRSK3ZZSm80ZFZtUlkrd0dscXVUbm5rNmxGb3NRPQ=="
];

// Map specific indices to their text alternates
const TEXT_ALTERNATES: Record<number, string> = {
  0: "#查攻略",
  1: "#看交通"
};

// Positions relative to center (approximate circular distribution)
// Adjusted to be closer to center to ensure visibility
const POSITIONS = [
  { top: '-35%', left: '-25%', size: 'w-24 h-24' },  // Top Left (Reduced spread)
  { top: '-45%', left: '35%', size: 'w-20 h-20' },   // Top Right (Reduced spread)
  { top: '10%', left: '-45%', size: 'w-28 h-28' },   // Middle Left (Reduced spread)
  { top: '20%', left: '45%', size: 'w-22 h-22' },    // Middle Right (Reduced spread)
  { top: '55%', left: '0%', size: 'w-16 h-16' },     // Bottom Center (Reduced spread)
];

const FloatingItem: React.FC<{ 
  img: string; 
  index: number; 
  pos: typeof POSITIONS[0];
}> = ({ img, index, pos }) => {
  const [showText, setShowText] = useState(false);
  const hasAlternate = TEXT_ALTERNATES[index] !== undefined;
  
  // Animation cycle duration in seconds
  const duration = 3 + index; 

  useEffect(() => {
    if (!hasAlternate) return;

    // Toggle every cycle (duration)
    const interval = setInterval(() => {
      setShowText(prev => !prev);
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [hasAlternate, duration]);

  return (
    <motion.div
      className={`absolute rounded-2xl overflow-hidden shadow-lg border-2 border-white/80 z-0 ${pos.size} bg-white flex items-center justify-center`}
      style={{ 
        top: '50%', 
        left: '50%', 
        marginTop: pos.top, 
        marginLeft: pos.left,
        transform: 'translate(-50%, -50%)'
      }}
      animate={{ 
        y: [0, -10, 0],
        opacity: [0.6, 1, 0.6], // Fade in/out cycle
        scale: [0.95, 1.05, 0.95]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.5
      }}
    >
      <AnimatePresence mode="wait">
        {showText ? (
          <motion.div
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex items-center justify-center bg-emerald-50"
          >
            <span className="text-[10px] font-black text-emerald-600 whitespace-nowrap px-1">
              {TEXT_ALTERNATES[index]}
            </span>
          </motion.div>
        ) : (
          <motion.img 
            key="image"
            src={img} 
            className="w-full h-full object-cover" 
            alt="" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface FloatingHeroProps {
  onMainClick?: () => void;
}

const FloatingHero: React.FC<FloatingHeroProps> = ({ onMainClick }) => {
  return (
    <div className="relative w-full h-[60vh] flex items-center justify-center mt-0 scale-90 origin-center">
      {/* Central Character */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-64 h-80 mt-[-20px] cursor-pointer"
        onClick={onMainClick}
      >
        <img 
          src={CENTRAL_IMAGE} 
          className="w-full h-full object-contain drop-shadow-2xl" 
          alt="Main Character" 
        />
        
        {/* Chat Bubble Hint */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute top-20 -right-24 bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-lg border border-slate-100 z-20 max-w-[140px]"
        >
          <h4 className="text-[12px] font-black text-slate-800 mb-0.5">hi,我是黄小西</h4>
          <p className="text-[10px] text-slate-500">点我开启旅程</p>
        </motion.div>
      </motion.div>

      {/* Surrounding Floating Images */}
      {SURROUNDING_IMAGES.map((img, index) => {
        const pos = POSITIONS[index % POSITIONS.length];
        return <FloatingItem key={index} img={img} index={index} pos={pos} />;
      })}
    </div>
  );
};

export default FloatingHero;
