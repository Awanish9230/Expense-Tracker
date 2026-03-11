import { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';

export default function Loader({ onFinish }) {
  const [loadingText, setLoadingText] = useState('Preparing your dashboard...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const texts = [
      'Preparing your dashboard...',
      'Analyzing your expenses...',
      'Loading financial insights...'
    ];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      setLoadingText(texts[currentIndex]);
    }, 800);

    // Total loading time is 2.5 seconds (2500ms)
    // Start fade out at 2000ms
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);

    // Call onFinish at 2500ms to unmount
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeOutTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-gray-50 dark:bg-[#0b0b0b] transition-opacity duration-500 ease-in-out ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] opacity-60 animate-pulse-slow"></div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 flex flex-col items-center p-10 rounded-2xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-xl shadow-xl dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] min-w-[320px]">
        
        {/* Animated Logo Container */}
        <div className="relative flex items-center justify-center w-20 h-20 mb-6">
          {/* Rotating Gradient Spinner */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#6a5cff] to-[#00d4ff] animate-spin-slow opacity-80 blur-sm"></div>
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#00d4ff] border-r-[#6a5cff] animate-spin p-1"></div>
          
          {/* Inner Logo */}
          <div className="relative flex items-center justify-center w-14 h-14 bg-white dark:bg-[#0b0b0b] rounded-full shadow-inner z-10">
            <Wallet className="w-7 h-7 text-gray-900 dark:text-white" />
          </div>
        </div>

        {/* Brand Text */}
        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 text-center">
          Mojito Expense Tracker
        </h1>

        {/* Progress Bar Container */}
        <div className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden mb-4 relative">
          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#6a5cff] to-[#00d4ff] animate-progress-bar rounded-full"></div>
        </div>

        {/* Dynamic Loading Text */}
        <div className="h-5 flex items-center justify-center">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse transition-all duration-300">
            {loadingText}
          </p>
        </div>

      </div>
    </div>
  );
}
