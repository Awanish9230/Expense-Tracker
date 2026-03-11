import CategoryBreakdown from './CategoryBreakdown';
import CurrencyConverter from './CurrencyConverter';
import ExpenseChart from './ExpenseChart';
import { TrendingUp } from 'lucide-react';

export default function SummaryPanel({ expenses }) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-primary dark:to-blue-600 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative transition-colors duration-200">
        <div className="absolute -right-6 -top-6 rounded-full w-32 h-32 bg-white/5 blur-2xl pointer-events-none"></div>
        <h2 className="text-gray-400 font-medium mb-2 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Total Expenses
        </h2>
        <div className="text-4xl font-bold tracking-tight">
          ${totalExpenses.toFixed(2)}
        </div>
      </div>

      <CurrencyConverter totalUSD={totalExpenses} />
      <ExpenseChart expenses={expenses} />
      <CategoryBreakdown expenses={expenses} />

    </div>
  );
}
