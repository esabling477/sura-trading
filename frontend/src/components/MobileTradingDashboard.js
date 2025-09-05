import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { 
  Menu,
  BarChart3,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';
import { 
  mockAllAssets,
  formatPrice, 
  formatPercentage 
} from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import MobileNavigation from './MobileNavigation';
import TradingChart from './TradingChart';
import TradingPositionsFooter from './TradingPositionsFooter';

const MobileTradingDashboard = () => {
  const [assets] = useState(mockAllAssets);
  const [selectedAsset, setSelectedAsset] = useState(mockAllAssets[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [accountBalance] = useState(15215.13);
  const [showPositionsFooter, setShowPositionsFooter] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // all, crypto, forex

  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // Check if we're on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter assets based on search and filter type
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'crypto') return matchesSearch && !asset.symbol.includes('/');
    if (selectedFilter === 'forex') return matchesSearch && asset.symbol.includes('/');
    
    return matchesSearch;
  });

  // Separate crypto and forex for organized display
  const cryptoAssets = filteredAssets.filter(asset => !asset.symbol.includes('/'));
  const forexAssets = filteredAssets.filter(asset => asset.symbol.includes('/'));

  return (
    <div className={`min-h-screen ${
      isDark ? 'bg-[#0a192f] text-white' : 'bg-gray-50 text-gray-900'
    }`} style={{ paddingBottom: showPositionsFooter ? '320px' : '0' }}>
      {/* Mobile Header */}
      <header className={`${
        isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
      } border-b sticky top-0 z-40`}>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(true)}
              className={isDark ? 'text-gray-300' : 'text-gray-700'}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <BarChart3 className={`h-6 w-6 ${
                isDark ? 'text-[#64ffda]' : 'text-blue-600'
              }`} />
              <span className={`font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                GTC
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className={`${
                isDark ? 'bg-[#64ffda] text-[#0a192f]' : 'bg-blue-600 text-white'
              }`}>
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Sidebar */}
      <MobileNavigation 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Account Balance Card */}
        <Card className={`${
          isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <CardContent className="p-4">
            <div className="text-center">
              <div className={`text-sm mb-1 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Account Balance
              </div>
              <div className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                ${accountBalance.toLocaleString()}
              </div>
              <div className="flex items-center justify-center space-x-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-400" />
                <span className="text-sm text-green-400">+61.12 (0.40%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card className={`${
          isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <CardContent className="p-4 space-y-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <Input
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 ${
                  isDark 
                    ? 'bg-[#0a192f] border-gray-600 text-white placeholder:text-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex space-x-2">
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('all')}
                className={`flex-1 ${
                  selectedFilter === 'all'
                    ? (isDark ? 'bg-[#64ffda] text-[#0a192f]' : 'bg-blue-600 text-white')
                    : (isDark ? 'text-gray-300 border-gray-600' : 'text-gray-700 border-gray-300')
                }`}
              >
                All ({assets.length})
              </Button>
              <Button
                variant={selectedFilter === 'crypto' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('crypto')}
                className={`flex-1 ${
                  selectedFilter === 'crypto'
                    ? (isDark ? 'bg-[#64ffda] text-[#0a192f]' : 'bg-blue-600 text-white')
                    : (isDark ? 'text-gray-300 border-gray-600' : 'text-gray-700 border-gray-300')
                }`}
              >
                Crypto ({cryptoAssets.length})
              </Button>
              <Button
                variant={selectedFilter === 'forex' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('forex')}
                className={`flex-1 ${
                  selectedFilter === 'forex'
                    ? (isDark ? 'bg-[#64ffda] text-[#0a192f]' : 'bg-blue-600 text-white')
                    : (isDark ? 'text-gray-300 border-gray-600' : 'text-gray-700 border-gray-300')
                }`}
              >
                Forex ({forexAssets.length})
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* All Assets List */}
        <Card className={`${
          isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-medium ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {selectedFilter === 'all' ? 'All Assets' : 
                 selectedFilter === 'crypto' ? 'Cryptocurrencies' : 'Forex & Commodities'}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className={isDark ? 'text-gray-400' : 'text-gray-600'}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {/* Show Forex Assets First (including XAU/USD) */}
                {(selectedFilter === 'all' || selectedFilter === 'forex') && forexAssets.length > 0 && (
                  <>
                    <div className={`text-xs font-medium mb-2 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      FOREX & COMMODITIES
                    </div>
                    {forexAssets.map((asset) => (
                      <div
                        key={asset.id}
                        onClick={() => setSelectedAsset(asset)}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                          selectedAsset.id === asset.id
                            ? (isDark ? 'bg-[#64ffda]/10 border border-[#64ffda]/30' : 'bg-blue-50 border border-blue-200')
                            : (isDark ? 'bg-[#0a192f] hover:bg-[#0a192f]/80' : 'bg-gray-50 hover:bg-gray-100')
                        }`}
                      >
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
                            <div className={`font-medium text-sm ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {asset.symbol}
                            </div>
                            <div className={`text-xs ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {asset.name}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`font-medium text-sm ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {formatPrice(asset.current_price, asset.symbol)}
                          </div>
                          <div className={`text-xs font-medium flex items-center justify-end ${
                            asset.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {asset.price_change_percentage_24h >= 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {formatPercentage(asset.price_change_percentage_24h)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Show Crypto Assets */}
                {(selectedFilter === 'all' || selectedFilter === 'crypto') && cryptoAssets.length > 0 && (
                  <>
                    {selectedFilter === 'all' && (
                      <div className={`text-xs font-medium mb-2 mt-4 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        CRYPTOCURRENCIES
                      </div>
                    )}
                    {cryptoAssets.map((asset) => (
                      <div
                        key={asset.id}
                        onClick={() => setSelectedAsset(asset)}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                          selectedAsset.id === asset.id
                            ? (isDark ? 'bg-[#64ffda]/10 border border-[#64ffda]/30' : 'bg-blue-50 border border-blue-200')
                            : (isDark ? 'bg-[#0a192f] hover:bg-[#0a192f]/80' : 'bg-gray-50 hover:bg-gray-100')
                        }`}
                      >
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
                            <div className={`font-medium text-sm ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {asset.symbol}
                            </div>
                            <div className={`text-xs ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {asset.name}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`font-medium text-sm ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {formatPrice(asset.current_price)}
                          </div>
                          <div className={`text-xs font-medium flex items-center justify-end ${
                            asset.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {asset.price_change_percentage_24h >= 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {formatPercentage(asset.price_change_percentage_24h)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {filteredAssets.length === 0 && (
                  <div className="text-center py-8">
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      No assets found matching "{searchTerm}"
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Price Chart */}
        <Card className={`${
          isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className={`font-medium ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedAsset.symbol}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-lg font-bold ${
                    isDark ? 'text-[#64ffda]' : 'text-blue-600'
                  }`}>
                    {selectedAsset.symbol.includes('/') 
                      ? formatPrice(selectedAsset.current_price, selectedAsset.symbol)
                      : formatPrice(selectedAsset.current_price)
                    }
                  </span>
                  <span className={`flex items-center text-sm ${
                    selectedAsset.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {selectedAsset.price_change_percentage_24h >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {formatPercentage(selectedAsset.price_change_percentage_24h)}
                  </span>
                </div>
                <div className={`text-xs mt-1 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {selectedAsset.name} {selectedAsset.type && `• ${selectedAsset.type.toUpperCase()}`}
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className={isDark ? 'text-gray-400' : 'text-gray-600'}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="h-64">
              <TradingChart 
                symbol={selectedAsset.symbol} 
                data={selectedAsset}
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions - Buy/Sell */}
        <Card className={`${
          isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <CardContent className="p-4">
            <h3 className={`font-medium mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Quick Actions
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white h-12"
              >
                Buy {selectedAsset.symbol.split('/')[0] || selectedAsset.symbol}
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white h-12"
              >
                Sell {selectedAsset.symbol.split('/')[0] || selectedAsset.symbol}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trading Positions Footer */}
      <TradingPositionsFooter 
        isVisible={showPositionsFooter}
        onClose={() => setShowPositionsFooter(false)}
      />
    </div>
  );
};

export default MobileTradingDashboard;