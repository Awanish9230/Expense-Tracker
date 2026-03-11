import { useState, useEffect } from 'react';
import Loader from '../components/ui/Loader';
import ExpenseForm from '../components/dashboard/ExpenseForm';
import ExpenseList from '../components/dashboard/ExpenseList';
import SummaryPanel from '../components/dashboard/SummaryPanel';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/landing/Hero';
import WhyUseUs from '../components/landing/WhyUseUs';
import Footer from '../components/layout/Footer';
import AnalyticsOverview from '../components/dashboard/AnalyticsOverview';

export default function Home() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses(prev => [{ ...expense, id: crypto.randomUUID() }, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  return (
    <>
      {isAppLoading && <Loader onFinish={() => setIsAppLoading(false)} />}
      
      <div className={`min-h-screen bg-gray-50 dark:bg-black selection:bg-primary/20 flex flex-col transition-colors duration-200 ${isAppLoading ? 'hidden' : 'block'}`}>
        <Navbar />
      
        <main className="flex-grow">
          <div id="home"><Hero /></div>
          <div id="features"><WhyUseUs /></div>
          
          <section id="tracker" className="py-24 bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-neutral-800 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl mb-4">
                  Your Dashboard
                </h2>
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  Add, manage, and analyze your expenses below. All data is saved automatically.
                </p>
              </div>

              <AnalyticsOverview expenses={expenses} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <ExpenseForm onAddExpense={addExpense} />
                  <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
                </div>

                <div className="space-y-8 lg:col-span-1">
                  <SummaryPanel expenses={expenses} />
                </div>
              </div>
              
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
