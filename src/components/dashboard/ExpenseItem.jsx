import { Trash2, Utensils, Plane, Megaphone, Zap, Tag } from 'lucide-react';
import { toast } from 'react-hot-toast';

const categoryIcons = {
  'Food': <Utensils className="w-4 h-4" />,
  'Travel': <Plane className="w-4 h-4" />,
  'Marketing': <Megaphone className="w-4 h-4" />,
  'Utilities': <Zap className="w-4 h-4" />,
  'Other': <Tag className="w-4 h-4" />
};

const categoryColors = {
  'Food': 'bg-orange-100 text-orange-600',
  'Travel': 'bg-blue-100 text-blue-600',
  'Marketing': 'bg-purple-100 text-purple-600',
  'Utilities': 'bg-yellow-100 text-yellow-600',
  'Other': 'bg-gray-100 text-gray-600'
};

export default function ExpenseItem({ expense, onDelete }) {
  const handleDelete = () => {
    onDelete();
    toast('Expense removed.', { icon: '🗑️' });
  };

  const icon = categoryIcons[expense.category] || categoryIcons['Other'];
  const colorClass = categoryColors[expense.category] || categoryColors['Other'];

  const formattedDate = expense.date 
    ? new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'No date';

  return (
    <div className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass} dark:bg-opacity-20 flex-shrink-0`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white text-base">{expense.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-2">
            <span className="inline-flex items-center gap-1">
              {expense.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
            <span>{formattedDate}</span>
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="font-semibold text-gray-900 dark:text-white">
          ${expense.amount.toFixed(2)}
        </span>
        <button
          onClick={handleDelete}
          className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 p-2 rounded-lg transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          aria-label="Delete expense"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
