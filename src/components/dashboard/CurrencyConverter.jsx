import { useState, useEffect } from 'react';
import { RefreshCw, Globe, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import CustomDropdown from '../ui/CustomDropdown';

const CURRENCIES = ['EUR', 'GBP', 'INR'];

export default function CurrencyConverter({ totalUSD }) {
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (totalUSD === 0) {
      setConvertedAmount(0);
      setError(null);
      return;
    }

    const fetchConversion = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const API_URL = import.meta.env.VITE_FRANKFURTER_API_URL || 'https://api.frankfurter.app/latest';
        const response = await fetch(`${API_URL}?from=USD&to=${targetCurrency}`);
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        
        const rate = data.rates[targetCurrency];
        setConvertedAmount(totalUSD * rate);
      } catch (err) {
        setError('Failed to fetch currency data. Please try again.');
        toast.error('Failed to fetch currency data.', { id: 'currency-error' });
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchConversion();
    }, 500);

    return () => clearTimeout(timer);
  }, [totalUSD, targetCurrency]);

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-gray-400" />
          Live Currency
        </h3>
        <div className="w-[110px]">
          <CustomDropdown
            value={targetCurrency}
            onChange={setTargetCurrency}
            options={CURRENCIES}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isLoading ? (
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium">
            <RefreshCw className="w-5 h-5 animate-spin text-primary" />
            Loading rates...
          </div>
        ) : error ? (
           <div className="flex items-center gap-2 text-red-500 text-sm font-medium bg-red-50 px-3 py-2 rounded-lg w-full">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        ) : (
          <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-l-4 border-primary pl-4">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: targetCurrency }).format(convertedAmount || 0)}
          </div>
        )}
      </div>
    </div>
  );
}
