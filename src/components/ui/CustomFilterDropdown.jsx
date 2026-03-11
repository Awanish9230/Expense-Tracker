import { useState, useRef, useEffect } from 'react';
import { Filter, ChevronDown, Check } from 'lucide-react';

export default function CustomFilterDropdown({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
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

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e, optionValue) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(optionValue);
    }
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  // Find the label for the currently selected value
  const selectedLabel = options.find(opt => opt.value === value)?.label || value;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' && !isOpen) {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        className={`inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-md border text-sm font-medium transition-all duration-200 outline-none min-w-[140px]
          ${isOpen 
            ? 'border-primary ring-2 ring-primary/20 bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-white' 
            : 'border-gray-200 dark:border-[#2a2a2a] bg-gray-50 dark:bg-black hover:bg-white dark:hover:bg-[#0f0f0f] text-gray-700 dark:text-gray-300'
          }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 truncate">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="truncate">{selectedLabel}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
      </button>

      {/* Styled dropdown menu */}
      <div 
        className={`absolute right-0 z-50 w-48 mt-2 rounded-xl border border-gray-100 dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] shadow-xl overflow-hidden transition-all duration-200 origin-top-right
          ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
        `}
        role="listbox"
      >
        <ul className="py-1.5 outline-none">
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                tabIndex={isOpen ? 0 : -1}
                onClick={() => handleSelect(option.value)}
                onKeyDown={(e) => handleKeyDown(e, option.value)}
                className={`
                  relative px-3 py-2 mx-1.5 rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium transition-all duration-150 outline-none
                  ${isSelected 
                    ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-[#6a5cff]' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800/80 focus:bg-gray-50 dark:focus:bg-neutral-800/80'
                  }
                `}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="w-4 h-4 text-primary dark:text-[#6a5cff]" />}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
