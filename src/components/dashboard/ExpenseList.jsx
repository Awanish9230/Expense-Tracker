import { ClipboardList, Download } from 'lucide-react';
import { useState, useMemo } from 'react';
import ExpenseItem from './ExpenseItem';
import CustomFilterDropdown from '../ui/CustomFilterDropdown';

const FILTER_OPTIONS = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Past 7 Days' },
  { value: 'month', label: 'Past 30 Days' },
  { value: 'year', label: 'Past Year' },
];

export default function ExpenseList({ expenses, onDeleteExpense }) {
  const [filterPeriod, setFilterPeriod] = useState('all');

  const filteredExpenses = useMemo(() => {
    if (filterPeriod === 'all') return expenses;
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return expenses.filter(expense => {
      const expenseDateString = expense.date || new Date(Date.now() - 86400000 * 365).toISOString().split('T')[0];
      const expenseDate = new Date(expenseDateString + 'T00:00:00');
      
      switch (filterPeriod) {
        case 'today': {
          const todayString = now.toISOString().split('T')[0];
          const localTodayString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
          return expenseDateString === localTodayString || expenseDateString === todayString;
        }
        case 'week': {
          const lastWeek = new Date(today);
          lastWeek.setDate(lastWeek.getDate() - 7);
          return expenseDate >= lastWeek;
        }
        case 'month': {
          const lastMonth = new Date(today);
          lastMonth.setMonth(lastMonth.getMonth() - 1);
          return expenseDate >= lastMonth;
        }
        case 'year': {
          const lastYear = new Date(today);
          lastYear.setFullYear(lastYear.getFullYear() - 1);
          return expenseDate >= lastYear;
        }
        default:
          return true;
      }
    });
  }, [expenses, filterPeriod]);

  const handleDownloadCSV = () => {
    if (filteredExpenses.length === 0) return;
    
    // Create CSV content based on current filtered view
    const headers = ['Name', 'Amount', 'Category', 'Date'];
    const csvContent = [
      headers.join(','),
      ...filteredExpenses.map(expense => {
        const name = `"${(expense.name || '').replace(/"/g, '""')}"`;
        const amount = expense.amount;
        const category = `"${(expense.category || '').replace(/"/g, '""')}"`;
        const date = `"${expense.date || ''}"`;
        return [name, amount, category, date].join(',');
      })
    ].join('\n');

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `expenses_${filterPeriod}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 p-12 text-center flex flex-col items-center justify-center transition-colors duration-200">
        <div className="w-16 h-16 bg-gray-50 dark:bg-neutral-800/50 rounded-full flex items-center justify-center mb-4">
          <ClipboardList className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No expenses yet</h3>
        <p className="text-gray-500 dark:text-gray-400">Add your first expense above to start tracking.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 overflow-hidden transition-colors duration-200">
      <div className="p-6 border-b border-gray-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-primary" />
          Recent Expenses
        </h2>
        
        <div className="flex items-center gap-3">
          <CustomFilterDropdown 
            value={filterPeriod}
            onChange={setFilterPeriod}
            options={FILTER_OPTIONS}
          />
          
          <span className="hidden sm:inline-block bg-primary/10 dark:bg-primary/20 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
            {filteredExpenses.length} item{filteredExpenses.length !== 1 ? 's' : ''}
          </span>

          <button
            onClick={handleDownloadCSV}
            disabled={filteredExpenses.length === 0}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 dark:border-[#2a2a2a] bg-gray-50 dark:bg-black hover:bg-white dark:hover:bg-[#0f0f0f] text-gray-700 dark:text-gray-300 text-sm font-medium transition-all duration-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-primary/20"
            title="Export CSV"
          >
            <Download className="w-4 h-4 text-gray-400" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>
      
      {filteredExpenses.length === 0 ? (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          No expenses found for the selected period.
        </div>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-[500px] overflow-y-auto custom-scrollbar">
          {filteredExpenses.map((expense) => (
            <ExpenseItem 
              key={expense.id} 
              expense={expense} 
              onDelete={() => onDeleteExpense(expense.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
