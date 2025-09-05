import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatPrice, formatPercentage } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

const PriceTicker = ({ data }) => {
  const { isDark } = useTheme();

  return (
    <div className={`${
      isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
    } border-b overflow-hidden ticker-container`} style={{ minHeight: '60px' }}>
      <div className="flex animate-scroll whitespace-nowrap py-3" style={{ minHeight: '54px', alignItems: 'center' }}>
        {/* Duplicate the data for seamless scrolling */}
        {[...data, ...data].map((item, index) => (
          <div key={`${item.symbol}-${index}`} className="inline-flex items-center space-x-4 mx-6 sm:mx-8">
            <div className="flex items-center space-x-2">
              <span className={`font-medium text-sm sm:text-base ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {item.symbol}
              </span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>|</span>
              <span className={`text-sm sm:text-base ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {formatPrice(item.price)}
              </span>
              <div className="flex items-center space-x-1">
                {item.change >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-400" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-400" />
                )}
                <span className={`text-xs sm:text-sm ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatPercentage(item.change)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceTicker;