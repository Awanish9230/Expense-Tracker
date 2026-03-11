import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomDropdown({ value, onChange, options, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleKeyDown = (e, option) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(option.label || option);
    }
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className="space-y-2 relative" ref={dropdownRef}>
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}

      <button
        type="button"
        onClick={toggleDropdown}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' && !isOpen) {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        className={`w-full px-4 py-2.5 rounded-md border flex items-center justify-between transition-all duration-200 outline-none
          ${isOpen
            ? 'border-primary ring-2 ring-primary/20 bg-white dark:bg-[#0f0f0f]'
            : 'border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-[#0f0f0f]'
          } text-gray-800 dark:text-white`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div key={value} className="flex items-center gap-2 truncate animate-pop-in">
          {options.find(opt => (opt.label || opt) === value)?.icon && (
            <span className="text-lg">{options.find(opt => (opt.label || opt) === value).icon}</span>
          )}
          <span className="truncate">{value}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
      </button>

      <div
        className={`absolute z-50 w-full mt-2 rounded-xl border border-gray-100 dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] shadow-xl overflow-hidden transition-all duration-200 origin-top
          ${isOpen ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'}
        `}
        role="listbox"
      >
        <ul className="max-h-60 overflow-auto custom-scrollbar p-1.5 focus:outline-none">
          {options.map((option, index) => {
            const optLabel = option.label || option;
            const optIcon = option.icon || null;
            const isSelected = value === optLabel;

            return (
              <li
                key={optLabel}
                role="option"
                aria-selected={isSelected}
                tabIndex={isOpen ? 0 : -1}
                onClick={() => handleSelect(optLabel)}
                onKeyDown={(e) => handleKeyDown(e, optLabel)}
                className={`
                  relative px-3 py-2.5 rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium transition-all duration-150 outline-none
                  ${isSelected
                    ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-[#6a5cff]'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800/80 focus:bg-gray-50 dark:focus:bg-neutral-800/80'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  {optIcon && <span className="text-lg">{optIcon}</span>}
                  <span>{optLabel}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-primary dark:text-[#6a5cff]" />}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
