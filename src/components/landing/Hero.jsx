import { ArrowRight, PieChart, TrendingDown } from 'lucide-react';

export default function Hero() {
  const scrollToTracker = () => {
    document.getElementById('tracker')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl mx-auto pointer-events-none">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
        <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8 border border-primary/20">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          Mojito Expense Tracker 1.0 is live
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">
          Take control of your <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
            financial future.
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
          The most beautiful, intuitive, and lightning-fast way to track your daily expenses, convert currencies globally, and analyze your spending habits.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={scrollToTracker}
            className="w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium text-lg transition-all shadow-lg flex items-center justify-center gap-2 group"
          >
            Start Tracking Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <a href="#about"
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white rounded-xl font-medium text-lg transition-all shadow-sm flex items-center justify-center gap-2"
          >
            Learn More
          </a>
        </div>

      </div>
    </section>
  );
}
