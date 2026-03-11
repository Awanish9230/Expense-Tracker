import { useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Calendar, Clock, BarChart3 } from 'lucide-react';

export default function AnalyticsOverview({ expenses }) {
  const stats = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const lastYear = new Date(today);
    lastYear.setFullYear(lastYear.getFullYear() - 1);

    let todayTotal = 0;
    let weekTotal = 0;
    let monthTotal = 0;
    let yearTotal = 0;

    let prevTodayTotal = 0;
    let prevWeekTotal = 0;
    let prevMonthTotal = 0;
    let prevYearTotal = 0;

    expenses.forEach(expense => {
      const expenseDateString = expense.date || new Date(Date.now() - 86400000 * 365).toISOString().split('T')[0];
      const expenseDateLocal = new Date(expenseDateString + 'T00:00:00');
      
      const localTodayString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const isToday = expenseDateString === localTodayString;
      
      const yesterdayStr = new Date(now.getTime() - 86400000);
      const localYesterdayString = `${yesterdayStr.getFullYear()}-${String(yesterdayStr.getMonth() + 1).padStart(2, '0')}-${String(yesterdayStr.getDate()).padStart(2, '0')}`;
      const isYesterday = expenseDateString === localYesterdayString;

      const prevWeekLimit = new Date(lastWeek); prevWeekLimit.setDate(prevWeekLimit.getDate() - 7);
      const prevMonthLimit = new Date(lastMonth); prevMonthLimit.setMonth(prevMonthLimit.getMonth() - 1);
      const prevYearLimit = new Date(lastYear); prevYearLimit.setFullYear(prevYearLimit.getFullYear() - 1);

      if (isToday) todayTotal += expense.amount;
      else if (isYesterday) prevTodayTotal += expense.amount;

      if (expenseDateLocal >= lastWeek) weekTotal += expense.amount;
      else if (expenseDateLocal >= prevWeekLimit && expenseDateLocal < lastWeek) prevWeekTotal += expense.amount;

      if (expenseDateLocal >= lastMonth) monthTotal += expense.amount;
      else if (expenseDateLocal >= prevMonthLimit && expenseDateLocal < lastMonth) prevMonthTotal += expense.amount;

      if (expenseDateLocal >= lastYear) yearTotal += expense.amount;
      else if (expenseDateLocal >= prevYearLimit && expenseDateLocal < lastYear) prevYearTotal += expense.amount;
    });

    const calcChange = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    return [
      {
        title: 'Today',
        amount: todayTotal,
        change: calcChange(todayTotal, prevTodayTotal),
        icon: <Clock className="w-5 h-5 text-blue-500" />,
        bgColor: 'bg-blue-50 dark:bg-blue-500/10'
      },
      {
        title: 'Past 7 Days',
        amount: weekTotal,
        change: calcChange(weekTotal, prevWeekTotal),
        icon: <Calendar className="w-5 h-5 text-orange-500" />,
        bgColor: 'bg-orange-50 dark:bg-orange-500/10'
      },
      {
        title: 'This Month',
        amount: monthTotal,
        change: calcChange(monthTotal, prevMonthTotal),
        icon: <BarChart3 className="w-5 h-5 text-purple-500" />,
        bgColor: 'bg-purple-50 dark:bg-purple-500/10'
      },
      {
        title: 'This Year',
        amount: yearTotal,
        change: calcChange(yearTotal, prevYearTotal),
        icon: <TrendingUp className="w-5 h-5 text-green-500" />,
        bgColor: 'bg-green-50 dark:bg-green-500/10'
      }
    ];
  }, [expenses]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white dark:bg-neutral-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-neutral-800 transition-colors duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm">{stat.title}</h3>
            <div className={`p-2 rounded-xl ${stat.bgColor}`}>
              {stat.icon}
            </div>
          </div>
          
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ${stat.amount.toFixed(2)}
          </div>
          
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full ${
              stat.change > 0 
                ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400' 
                : stat.change < 0 
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                  : 'bg-gray-50 text-gray-600 dark:bg-neutral-800 dark:text-gray-400'
            }`}>
              {stat.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : stat.change < 0 ? <ArrowDownRight className="w-3 h-3" /> : null}
              {Math.abs(stat.change).toFixed(1)}%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500">vs Prev. Period</span>
          </div>
        </div>
      ))}
    </div>
  );
}
