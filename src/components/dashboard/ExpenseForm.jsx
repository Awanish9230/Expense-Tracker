import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import CustomDropdown from '../ui/CustomDropdown';

const CATEGORIES = [
  { icon: '🍔', label: 'Food' },
  { icon: '✈️', label: 'Travel' },
  { icon: '📢', label: 'Marketing' },
  { icon: '💡', label: 'Utilities' },
  { icon: '📦', label: 'Other' }
];

export default function ExpenseForm({ onAddExpense }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].label);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Expense name is required.');
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Amount must be greater than zero.');
      return;
    }

    if (!category) {
      toast.error('Please select a category.');
      return;
    }

    onAddExpense({
      name: name.trim(),
      amount: Number(amount),
      category,
      date
    });

    toast.success('Expense added successfully.');

    setName('');
    setAmount('');
    setCategory(CATEGORIES[0].label);
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 p-6 transition-colors duration-200">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-primary" />
        Add New Expense
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Expense Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-md border border-gray-200 dark:border-neutral-800 dark:bg-black focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="e.g. Office Supplies"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount ($)</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-md border border-gray-200 dark:border-neutral-800 dark:bg-black focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <CustomDropdown 
            label="Category"
            options={CATEGORIES}
            value={category}
            onChange={setCategory}
          />

          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-[9px] rounded-md border border-gray-200 dark:border-neutral-800 dark:bg-black focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none text-gray-800 dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-md transition-all duration-200 shadow-sm shadow-primary/20 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          Add Expense
        </button>
      </form>
    </div>
  );
}
