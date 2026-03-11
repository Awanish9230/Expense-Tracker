import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart({ expenses }) {
  if (expenses.length === 0) return null;

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          '#f97316',
          '#3b82f6',
          '#a855f7',
          '#eab308',
          '#6b7280',
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1f2937',
        padding: 12,
        titleFont: { size: 14, family: "'Inter', sans-serif" },
        bodyFont: { size: 14, family: "'Inter', sans-serif" },
        displayColors: false,
        callbacks: {
          label: (context) => `$${context.raw.toFixed(2)}`
        }
      }
    },
    cutout: '75%',
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 p-6 flex flex-col items-center justify-center transition-colors duration-200">
      <div className="w-full h-48 relative">
        <Doughnut data={chartData} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Distribution</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">{labels.length}</span>
        </div>
      </div>
    </div>
  );
}
