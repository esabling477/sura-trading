import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Menu,
  BarChart3,
  TrendingUp,
  TrendingDown,
  RefreshCw
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

const MobileTradingDashboard = () => {
  const [assets] = useState(mockAllAssets);
  const [selectedAsset, setSelectedAsset] = useState(mockAllAssets[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [accountBalance] = useState(15215.13);

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

  const topAssets = assets.slice(0, 6);

  return (
    <div className={`min-h-screen ${
      isDark ? 'bg-[#0a192f] text-white' : 'bg-gray-50 text-gray-900'
    }`}>
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

        {/* Top Assets */}
        <Card className={`${
          isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <CardContent className="p-4">
            <h3 className={`font-medium mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Top Assets
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {topAssets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedAsset.id === asset.id
                      ? (isDark ? 'bg-[#64ffda]/10 border border-[#64ffda]/30' : 'bg-blue-50 border border-blue-200')
                      : (isDark ? 'bg-[#0a192f] hover:bg-[#0a192f]/80' : 'bg-gray-50 hover:bg-gray-100')
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <img 
                      src={asset.image} 
                      alt={asset.name}
                      className="w-6 h-6 rounded-full"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <span className={`font-medium text-sm ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {asset.symbol}
                    </span>
                  </div>
                  
                  <div className={`text-sm font-medium mb-1 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {asset.symbol.includes('/') 
                      ? formatPrice(asset.current_price, asset.symbol)
                      : formatPrice(asset.current_price)
                    }
                  </div>
                  
                  <div className={`text-xs font-medium flex items-center ${
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
              ))}
            </div>
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

        {/* Quick Actions */}
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
                onClick={() => navigate('/dashboard/deposit')}
                className="bg-green-600 hover:bg-green-700 text-white h-12"
              >
                Deposit
              </Button>
              <Button
                onClick={() => navigate('/dashboard/withdrawal')}
                className="bg-red-600 hover:bg-red-700 text-white h-12"
              >
                Withdrawal
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional spacing for mobile navigation */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default MobileTradingDashboard;