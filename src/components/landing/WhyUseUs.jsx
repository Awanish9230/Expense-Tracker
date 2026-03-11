import { Zap, Globe, Lock, LineChart, ShieldCheck, Smartphone } from 'lucide-react';

const features = [
  {
    name: 'Lightning Fast',
    description: 'Built with React and Vite for incredibly fast load times and instant expense updates without page reloads.',
    icon: Zap,
    color: 'text-amber-500',
    bgColor: 'bg-amber-100',
  },
  {
    name: 'Live Currency Conversion',
    description: 'Instantly convert your total expenses into EUR, GBP, or INR using live rates from the reliable Frankfurter API.',
    icon: Globe,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'Privacy First',
    description: 'No accounts required. All your expense data is saved locally on your device using encrypted browser storage.',
    icon: Lock,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-100',
  },
  {
    name: 'Visual Analytics',
    description: 'Understand your spending habits instantly with interactive, beautiful category breakdowns and Chart.js pie graphs.',
    icon: LineChart,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100',
  },
  {
    name: 'Modern & Reliable',
    description: 'Clean, distraction-free interface built with Tailwind CSS. Includes smart error handling so you never lose data.',
    icon: ShieldCheck,
    color: 'text-rose-500',
    bgColor: 'bg-rose-100',
  },
  {
    name: 'Mobile Optimized',
    description: 'Fully responsive design ensures you can track expenses seamlessly whether you are on a desktop or a smartphone.',
    icon: Smartphone,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-100',
  },
];

export default function WhyUseUs() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-black transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Why Choose Mojito</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            A better way to track your money
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            Everything you need to manage your business and personal expenses, built with modern standards for a flawless experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="relative p-8 bg-gray-50 dark:bg-neutral-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors border border-gray-100 dark:border-neutral-800">
              <div className={`absolute top-8 left-8 w-12 h-12 rounded-xl flex items-center justify-center ${feature.bgColor} ${feature.color} dark:bg-opacity-20`}>
                <feature.icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="mt-16">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
