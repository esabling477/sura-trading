import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatPrice, formatPercentage } from '../data/mockData';

const PriceTicker = ({ data }) => {
  return (
    <div className="bg-[#112240] border-b border-gray-700 overflow-hidden">
      <div className="flex animate-scroll whitespace-nowrap py-3">
        {/* Duplicate the data for seamless scrolling */}
        {[...data, ...data].map((item, index) => (
          <div key={`${item.symbol}-${index}`} className="inline-flex items-center space-x-4 mx-8">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-white">{item.symbol}</span>
              <span className="text-gray-400">|</span>
              <span className="text-white">{formatPrice(item.price)}</span>
              <div className="flex items-center space-x-1">
                {item.change >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-400" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-400" />
                )}
                <span className={`text-sm ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
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