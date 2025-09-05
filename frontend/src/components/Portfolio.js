import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { 
  Edit, 
  Save, 
  X, 
  TrendingUp, 
  TrendingDown, 
  Wallet,
  Plus,
  Trash2
} from 'lucide-react';
import { formatPrice, formatPercentage } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

const Portfolio = ({ portfolioData, onUpdatePortfolio }) => {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const { isDark } = useTheme();

  const handleStartEdit = (id, currentValue) => {
    setEditingId(id);
    setEditValue(currentValue.toString());
  };

  const handleSaveEdit = (id) => {
    const newValue = parseFloat(editValue);
    if (isNaN(newValue) || newValue < 0) {
      setEditingId(null);
      return;
    }

    const updatedPortfolio = portfolioData.map(asset => 
      asset.id === id ? { ...asset, holdings: newValue } : asset
    );
    
    // Remove assets with 0 holdings
    const filteredPortfolio = updatedPortfolio.filter(asset => asset.holdings > 0);
    
    onUpdatePortfolio(filteredPortfolio);
    setEditingId(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleRemoveAsset = (id) => {
    const updatedPortfolio = portfolioData.filter(asset => asset.id !== id);
    onUpdatePortfolio(updatedPortfolio);
  };

  const calculateAssetValue = (holdings, price) => {
    return holdings * price;
  };

  const calculateAssetChange = (holdings, price, changePercentage) => {
    const currentValue = calculateAssetValue(holdings, price);
    const previousPrice = price / (1 + changePercentage / 100);
    const previousValue = calculateAssetValue(holdings, previousPrice);
    return currentValue - previousValue;
  };

  return (
    <Card className={`${
      isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <CardHeader>
        <CardTitle className={`${
          isDark ? 'text-white' : 'text-gray-900'
        } flex items-center justify-between`}>
          <div className="flex items-center space-x-2">
            <Wallet className={`h-5 w-5 ${
              isDark ? 'text-[#64ffda]' : 'text-blue-600'
            }`} />
            <span>Your Portfolio</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            className={`${
              isDark 
                ? 'border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda] hover:text-[#0a192f]' 
                : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
            }`}
          >
            <Plus className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Add Asset</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {portfolioData.length === 0 ? (
            <div className="text-center py-8">
              <Wallet className={`h-12 w-12 mx-auto mb-4 ${
                isDark ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Your portfolio is empty
              </p>
              <p className={`text-sm ${
                isDark ? 'text-gray-500' : 'text-gray-500'
              }`}>
                Add some assets to get started
              </p>
            </div>
          ) : (
            <ScrollArea className="max-h-[400px] sm:max-h-[500px]">
              <div className="space-y-3">
                {portfolioData.map((asset) => {
                  const assetValue = calculateAssetValue(asset.holdings, asset.current_price);
                  const assetChange = calculateAssetChange(
                    asset.holdings, 
                    asset.current_price, 
                    asset.price_change_percentage_24h
                  );
                  
                  return (
                    <div key={asset.id} className={`rounded-lg p-4 ${
                      isDark ? 'bg-[#0a192f]' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={asset.image} 
                            alt={asset.name}
                            className="w-8 h-8 rounded-full"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <div>
                            <div className={`font-medium ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {asset.name}
                            </div>
                            <div className={`text-sm ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {asset.symbol.toUpperCase()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {editingId === asset.id ? (
                            <div className="flex items-center space-x-2">
                              <Input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className={`w-16 sm:w-20 h-8 text-sm ${
                                  isDark 
                                    ? 'bg-[#112240] border-gray-600 text-white' 
                                    : 'bg-white border-gray-300 text-gray-900'
                                }`}
                                type="number"
                                step="0.001"
                                min="0"
                              />
                              <Button
                                size="sm"
                                onClick={() => handleSaveEdit(asset.id)}
                                className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700"
                              >
                                <Save className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelEdit}
                                className={`h-8 w-8 p-0 ${
                                  isDark 
                                    ? 'border-gray-600 hover:bg-gray-700' 
                                    : 'border-gray-300 hover:bg-gray-100'
                                }`}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleStartEdit(asset.id, asset.holdings)}
                                className={`h-8 w-8 p-0 ${
                                  isDark 
                                    ? 'text-gray-400 hover:text-white hover:bg-[#64ffda]/10' 
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleRemoveAsset(asset.id)}
                                className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            Holdings
                          </div>
                          <div className={`font-medium ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {asset.holdings.toFixed(4)} {asset.symbol.toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            Current Price
                          </div>
                          <div className={`font-medium ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {formatPrice(asset.current_price)}
                          </div>
                        </div>
                        <div>
                          <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            Value
                          </div>
                          <div className={`font-medium ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {formatPrice(assetValue)}
                          </div>
                        </div>
                        <div>
                          <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            24h Change
                          </div>
                          <div className="flex items-center space-x-1">
                            {assetChange >= 0 ? (
                              <TrendingUp className="h-3 w-3 text-green-400" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-400" />
                            )}
                            <span className={`font-medium ${
                              assetChange >= 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {formatPrice(Math.abs(assetChange))}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Separator className={`my-3 ${
                        isDark ? 'bg-gray-700' : 'bg-gray-200'
                      }`} />
                      
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="outline" 
                          className={`${
                            asset.price_change_percentage_24h >= 0 
                              ? 'border-green-400 text-green-400' 
                              : 'border-red-400 text-red-400'
                          }`}
                        >
                          {formatPercentage(asset.price_change_percentage_24h)}
                        </Badge>
                        <div className="text-right">
                          <div className={`text-xs ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Allocation
                          </div>
                          <div className={`text-sm font-medium ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {((assetValue / portfolioData.reduce((total, a) => total + (a.holdings * a.current_price), 0)) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Portfolio;