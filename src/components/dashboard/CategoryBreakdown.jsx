import { PieChart } from 'lucide-react';

export default function CategoryBreakdown({ expenses }) {
  if (expenses.length === 0) return null;

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  const colors = {
    'Food': 'bg-orange-500',
    'Travel': 'bg-blue-500',
    'Marketing': 'bg-purple-500',
    'Utilities': 'bg-yellow-500',
    'Other': 'bg-gray-500'
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 p-6 transition-colors duration-200">
      <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <PieChart className="w-5 h-5 text-gray-400" />
        Category Breakdown
      </h3>

      <div className="space-y-4">
        {Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]).map(([category, amount]) => {
          const percentage = ((amount / total) * 100).toFixed(0);
          const colorClass = colors[category] || colors['Other'];

          return (
            <div key={category}>
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">{category}</span>
                <span className="text-gray-900 dark:text-white font-semibold">${amount.toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-2 rounded-full ${colorClass}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
