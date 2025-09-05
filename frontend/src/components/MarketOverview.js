import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { formatPrice, formatMarketCap, formatPercentage } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

const MarketOverview = ({ cryptoData, onCoinSelect, selectedCoin }) => {
  const [sortBy, setSortBy] = useState('market_cap_rank');
  const [sortOrder, setSortOrder] = useState('asc');
  const { isDark } = useTheme();

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const sortedData = [...cryptoData].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'market_cap_rank':
        aValue = a.market_cap_rank;
        bValue = b.market_cap_rank;
        break;
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'current_price':
        aValue = a.current_price;
        bValue = b.current_price;
        break;
      case 'price_change_percentage_24h':
        aValue = a.price_change_percentage_24h;
        bValue = b.price_change_percentage_24h;
        break;
      case 'market_cap':
        aValue = a.market_cap;
        bValue = b.market_cap;
        break;
      default:
        aValue = a.market_cap_rank;
        bValue = b.market_cap_rank;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleRowClick = (coinId) => {
    onCoinSelect(coinId);
  };

  return (
    <Card className={`${
      isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <CardHeader>
        <CardTitle className={`${
          isDark ? 'text-white' : 'text-gray-900'
        } flex items-center space-x-2`}>
          <Activity className={`h-5 w-5 ${
            isDark ? 'text-[#64ffda]' : 'text-blue-600'
          }`} />
          <span>Market Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] sm:h-[600px]">
          <div className="space-y-2">
            {/* Desktop Table Header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 py-3 px-4 bg-opacity-50 rounded-lg text-sm font-medium">
              <button 
                className={`col-span-1 text-left transition-colors ${
                  isDark 
                    ? 'text-gray-400 hover:text-[#64ffda]' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => handleSort('market_cap_rank')}
              >
                Rank
              </button>
              <button 
                className={`col-span-4 text-left transition-colors ${
                  isDark 
                    ? 'text-gray-400 hover:text-[#64ffda]' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => handleSort('name')}
              >
                Name
              </button>
              <button 
                className={`col-span-2 text-right transition-colors ${
                  isDark 
                    ? 'text-gray-400 hover:text-[#64ffda]' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => handleSort('current_price')}
              >
                Price
              </button>
              <button 
                className={`col-span-2 text-right transition-colors ${
                  isDark 
                    ? 'text-gray-400 hover:text-[#64ffda]' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => handleSort('price_change_percentage_24h')}
              >
                24h Change
              </button>
              <button 
                className={`col-span-3 text-right transition-colors ${
                  isDark 
                    ? 'text-gray-400 hover:text-[#64ffda]' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => handleSort('market_cap')}
              >
                Market Cap
              </button>
            </div>

            {/* Table Rows */}
            {sortedData.map((coin) => (
              <div
                key={coin.id}
                className={`rounded-lg cursor-pointer transition-all p-4 ${
                  selectedCoin === coin.id 
                    ? (isDark 
                        ? 'bg-[#64ffda]/10 border border-[#64ffda]/30' 
                        : 'bg-blue-50 border border-blue-200'
                      )
                    : (isDark 
                        ? 'hover:bg-[#0a192f]/50' 
                        : 'hover:bg-gray-50'
                      )
                }`}
                onClick={() => handleRowClick(coin.id)}
              >
                {/* Mobile Layout */}
                <div className="sm:hidden space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`text-sm font-medium ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        #{coin.market_cap_rank}
                      </span>
                      <img 
                        src={coin.image} 
                        alt={coin.name}
                        className="w-6 h-6 rounded-full"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div>
                        <div className={`font-medium ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {coin.name}
                        </div>
                        <div className={`text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {coin.symbol.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {formatPrice(coin.current_price)}
                      </div>
                      <div className="flex items-center justify-end space-x-1">
                        {coin.price_change_percentage_24h >= 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-400" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-400" />
                        )}
                        <span className={`text-sm font-medium ${
                          coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {formatPercentage(coin.price_change_percentage_24h)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Market Cap: {formatMarketCap(coin.market_cap)}
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
                  <div className={`col-span-1 text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {coin.market_cap_rank}
                  </div>
                  
                  <div className="col-span-4 flex items-center space-x-3">
                    <img 
                      src={coin.image} 
                      alt={coin.name}
                      className="w-6 h-6 rounded-full"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div>
                      <div className={`font-medium ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {coin.name}
                      </div>
                      <div className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {coin.symbol.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`col-span-2 text-right font-medium ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {formatPrice(coin.current_price)}
                  </div>
                  
                  <div className="col-span-2 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      {coin.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-400" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-400" />
                      )}
                      <span className={`text-sm font-medium ${
                        coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {formatPercentage(coin.price_change_percentage_24h)}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`col-span-3 text-right font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {formatMarketCap(coin.market_cap)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MarketOverview;