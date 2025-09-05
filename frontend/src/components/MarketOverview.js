import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { formatPrice, formatMarketCap, formatPercentage } from '../data/mockData';

const MarketOverview = ({ cryptoData, onCoinSelect, selectedCoin }) => {
  const [sortBy, setSortBy] = useState('market_cap_rank');
  const [sortOrder, setSortOrder] = useState('asc');

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
    <Card className="bg-[#112240] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Activity className="h-5 w-5 text-[#64ffda]" />
          <span>Market Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="space-y-2">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 py-3 px-4 bg-[#0a192f] rounded-lg text-sm font-medium text-gray-400">
              <button 
                className="col-span-1 text-left hover:text-[#64ffda] transition-colors"
                onClick={() => handleSort('market_cap_rank')}
              >
                Rank
              </button>
              <button 
                className="col-span-4 text-left hover:text-[#64ffda] transition-colors"
                onClick={() => handleSort('name')}
              >
                Name
              </button>
              <button 
                className="col-span-2 text-right hover:text-[#64ffda] transition-colors"
                onClick={() => handleSort('current_price')}
              >
                Price
              </button>
              <button 
                className="col-span-2 text-right hover:text-[#64ffda] transition-colors"
                onClick={() => handleSort('price_change_percentage_24h')}
              >
                24h Change
              </button>
              <button 
                className="col-span-3 text-right hover:text-[#64ffda] transition-colors"
                onClick={() => handleSort('market_cap')}
              >
                Market Cap
              </button>
            </div>

            {/* Table Rows */}
            {sortedData.map((coin) => (
              <div
                key={coin.id}
                className={`grid grid-cols-12 gap-4 py-4 px-4 rounded-lg cursor-pointer hover:bg-[#64ffda]/5 transition-all ${
                  selectedCoin === coin.id ? 'bg-[#64ffda]/10 border border-[#64ffda]/30' : 'hover:bg-[#0a192f]/50'
                }`}
                onClick={() => handleRowClick(coin.id)}
              >
                <div className="col-span-1 text-sm text-gray-300">
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
                    <div className="text-white font-medium">{coin.name}</div>
                    <div className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</div>
                  </div>
                </div>
                
                <div className="col-span-2 text-right text-white font-medium">
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
                
                <div className="col-span-3 text-right text-gray-300 font-medium">
                  {formatMarketCap(coin.market_cap)}
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