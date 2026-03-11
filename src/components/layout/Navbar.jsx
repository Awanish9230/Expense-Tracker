import { Wallet, Menu, X, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const scrollToTracker = () => {
    document.getElementById('tracker')?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-neutral-800 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}>
            <div className="bg-primary p-2 rounded-lg">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">Mojito</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => { document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium text-sm">Features</button>
            <button onClick={() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium text-sm">Why Us</button>
            
            <button
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-900"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button 
              onClick={scrollToTracker}
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full font-medium text-sm transition-all shadow-sm shadow-primary/20"
            >
              Open Tracker
            </button>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 p-2"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-black border-b border-gray-100 dark:border-neutral-800 px-4 pt-2 pb-4 space-y-1 transition-colors duration-200">
          <button onClick={() => { setIsOpen(false); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-50 dark:hover:bg-neutral-900">Features</button>
          <button onClick={() => { setIsOpen(false); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-50 dark:hover:bg-neutral-900">Why Us</button>
          <button  
            onClick={scrollToTracker}
            className="w-full mt-2 bg-primary text-white px-3 py-2 text-center rounded-md font-medium"
          >
            Open Tracker
          </button>
        </div>
      )}
    </nav>
  );
}
