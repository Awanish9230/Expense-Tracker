import { Github, Linkedin, Heart, Wallet, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-neutral-800 pt-16 pb-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-gray-900 dark:text-white">Mojito</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-sm leading-relaxed">
              A modern, privacy-focused expense tracker built with React, Vite, and Tailwind CSS. Take control of your financial future today.
            </p>
            <div className="flex space-x-5 mt-6">
              <a href="https://github.com/Awanish9230" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/awanish-kumar-verma-33740b295" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0a66c2] transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1">
                  <ChevronRight className="w-4 h-4" /> Features
                </a>
              </li>
              <li>
                <a href="#tracker" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1">
                  <ChevronRight className="w-4 h-4" /> Open Tracker
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Developer</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://github.com/Awanish9230" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1">
                  <ChevronRight className="w-4 h-4" /> GitHub Profile
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/awanish-kumar-verma-33740b295" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1">
                  <ChevronRight className="w-4 h-4" /> LinkedIn Network
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Mojito Expense Tracker. All rights reserved.
          </p>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1.5">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by <span className="font-medium text-gray-900 dark:text-gray-300">Awanish Kumar Verma</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
