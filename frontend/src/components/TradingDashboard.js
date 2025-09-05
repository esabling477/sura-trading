import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { 
  Search,
  User,
  LogOut,
  Settings,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  BarChart3
} from 'lucide-react';
import { 
  mockAllAssets,
  mockPortfolioData,
  formatPrice, 
  formatPercentage 
} from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import TradingChart from './TradingChart';
import TradingPositionsFooter from './TradingPositionsFooter';
import DesktopSidebarMenu from './DesktopSidebarMenu';

const TradingDashboard = () => {
  const [assets, setAssets] = useState(mockAllAssets);
  const [selectedAsset, setSelectedAsset] = useState(mockAllAssets[0]); // Bitcoin by default
  const [portfolioData, setPortfolioData] = useState([]);
  const [accountBalance] = useState(15215.13);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderType, setOrderType] = useState('buy');
  const [orderAmount, setOrderAmount] = useState('0');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [showPositionsFooter, setShowPositionsFooter] = useState(true);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // Load portfolio from localStorage on component mount
  useEffect(() => {
    const savedPortfolio = localStorage.getItem('gt-trading-portfolio');
    if (savedPortfolio) {
      setPortfolioData(JSON.parse(savedPortfolio));
    } else {
      setPortfolioData(mockPortfolioData);
      localStorage.setItem('gt-trading-portfolio', JSON.stringify(mockPortfolioData));
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = () => {
    // Simulate data refresh
    const updatedAssets = assets.map(asset => ({
      ...asset,
      current_price: asset.current_price * (1 + (Math.random() - 0.5) * 0.01),
      price_change_percentage_24h: asset.price_change_percentage_24h + (Math.random() - 0.5) * 0.5
    }));
    setAssets(updatedAssets);
    setLastUpdated(new Date());
  };

  return (
    <div className={`h-screen flex flex-col ${
      isDark ? 'bg-[#0a192f] text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`h-14 ${
        isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
      } border-b flex items-center justify-between px-4 z-10`}>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className={`h-8 w-8 ${
              isDark ? 'text-[#64ffda]' : 'text-blue-600'
            }`} />
            <div className={`text-xl font-bold ${
              isDark ? 'text-[#64ffda]' : 'text-blue-600'
            }`}>
              GTC
            </div>
            <span className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Trading Platform
            </span>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 w-64 h-8 ${
                isDark 
                  ? 'bg-[#0a192f] border-gray-600 text-white placeholder:text-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <span className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
          
          <Button 
            onClick={handleRefresh}
            size="sm"
            variant="ghost"
            className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>

          <ThemeToggle />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className={`${
                    isDark ? 'bg-[#64ffda] text-[#0a192f]' : 'bg-blue-600 text-white'
                  }`}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`w-56 ${
              isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
            }`} align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className={`font-medium ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {user?.name}
                  </p>
                  <p className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {user?.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className={`${
                isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
              }`}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className={`${
                isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
              }`}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className={`${
                  isDark 
                    ? 'text-red-400 hover:bg-red-900/20' 
                    : 'text-red-600 hover:bg-red-50'
                }`}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar Menu */}
        <DesktopSidebarMenu 
          isExpanded={isSidebarExpanded}
          onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
        />

        {/* Assets List Sidebar */}
        <div className={`w-80 ${
          isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
        } border-r flex flex-col`}>
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all mb-1 ${
                    selectedAsset.id === asset.id
                      ? (isDark ? 'bg-[#64ffda]/10 border-l-2 border-[#64ffda]' : 'bg-blue-50 border-l-2 border-blue-500')
                      : (isDark ? 'hover:bg-[#0a192f]/50' : 'hover:bg-gray-50')
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
                      {asset.symbol.includes('/') 
                        ? formatPrice(asset.current_price, asset.symbol)
                        : formatPrice(asset.current_price)
                      }
                    </div>
                    <div className={`text-xs font-medium ${
                      asset.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {formatPercentage(asset.price_change_percentage_24h)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chart Area */}
        <div className="flex-1 p-4">
          <Card className={`h-full ${
            isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <CardContent className="p-0 h-full">
              {/* Chart Header */}
              <div className={`p-4 border-b ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className={`text-xl font-bold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {selectedAsset.symbol}
                    </h2>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className={`text-2xl font-bold ${
                        isDark ? 'text-[#64ffda]' : 'text-blue-600'
                      }`}>
                        {selectedAsset.symbol.includes('/') 
                          ? formatPrice(selectedAsset.current_price, selectedAsset.symbol)
                          : formatPrice(selectedAsset.current_price)
                        }
                      </span>
                      <span className={`flex items-center text-sm font-medium ${
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
                  
                  <div className="flex space-x-2 text-sm">
                    {['1M', '5M', '15M', '30M', '1H', '1D'].map((interval) => (
                      <Button
                        key={interval}
                        variant={interval === '1D' ? 'default' : 'ghost'}
                        size="sm"
                        className={`${
                          interval === '1D' 
                            ? (isDark ? 'bg-[#64ffda] text-[#0a192f]' : 'bg-blue-600 text-white')
                            : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                        }`}
                      >
                        {interval}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Chart */}
              <div className="h-full">
                <TradingChart 
                  symbol={selectedAsset.symbol} 
                  data={selectedAsset}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Trading Controls */}
        <div className={`w-80 p-4 ${
          isDark ? 'bg-[#112240]' : 'bg-white'
        }`}>
          <div className="space-y-4">
            {/* Account Balance */}
            <Card className={`${
              isDark ? 'bg-[#0a192f] border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <CardContent className="p-4">
                <div className="text-right">
                  <div className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Account Balance
                  </div>
                  <div className={`text-2xl font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    ${accountBalance.toLocaleString()}
                  </div>
                  <div className="flex justify-between text-xs mt-2">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      Today's P/L
                    </span>
                    <span className="text-green-400">+61.12 (0.40%)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      Equity
                    </span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      $15,276.25
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      Used Margin
                    </span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      $212.24
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      Margin Level
                    </span>
                    <span className="text-green-400">7189.19%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trading Controls */}
            <Card className={`${
              isDark ? 'bg-[#0a192f] border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Button
                      variant={orderType === 'buy' ? 'default' : 'outline'}
                      onClick={() => setOrderType('buy')}
                      className={`flex-1 ${
                        orderType === 'buy'
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'text-green-600 border-green-600 hover:bg-green-50'
                      }`}
                    >
                      Contact
                    </Button>
                    <Button
                      variant={orderType === 'sell' ? 'default' : 'outline'}
                      onClick={() => setOrderType('sell')}
                      className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      Future
                    </Button>
                  </div>

                  <div>
                    <div className={`text-xl font-bold ${
                      isDark ? 'text-[#64ffda]' : 'text-blue-600'
                    } mb-2`}>
                      {selectedAsset.symbol}
                    </div>
                    <div className={`text-2xl font-bold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {selectedAsset.symbol.includes('/') 
                        ? formatPrice(selectedAsset.current_price, selectedAsset.symbol)
                        : formatPrice(selectedAsset.current_price)
                      }
                    </div>
                  </div>

                  {/* Order Form */}
                  <div className="space-y-3">
                    <div>
                      <label className={`text-sm mb-1 block ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Set Loss
                      </label>
                      <Input
                        type="number"
                        value={orderAmount}
                        onChange={(e) => setOrderAmount(e.target.value)}
                        placeholder="0"
                        className={`${
                          isDark 
                            ? 'bg-[#112240] border-gray-600 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`text-sm mb-1 block ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Set Profit
                      </label>
                      <Input
                        type="number"
                        placeholder="0"
                        className={`${
                          isDark 
                            ? 'bg-[#112240] border-gray-600 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`text-sm mb-1 block ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Lots (Step: 0.01)
                      </label>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className={`${
                            isDark 
                              ? 'border-gray-600 text-gray-400 hover:bg-gray-700' 
                              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input
                          type="number"
                          value="0.01"
                          step="0.01"
                          className={`text-center ${
                            isDark 
                              ? 'bg-[#112240] border-gray-600 text-white' 
                              : 'bg-white border-gray-300'
                          }`}
                        />
                        <Button 
                          size="sm" 
                          variant="outline"
                          className={`${
                            isDark 
                              ? 'border-gray-600 text-gray-400 hover:bg-gray-700' 
                              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                          Each Loss:
                        </span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>
                          1 Lots = 1000 {selectedAsset.symbol.split('/')[0] || 'BTC'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                          Estimated Handling Fee:
                        </span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>0.3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                          Estimated Margin:
                        </span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>10</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                        Buy
                      </Button>
                      <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                        Sell
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Static Trading Positions Footer */}
      {showPositionsFooter && (
        <div className="mt-auto">
          <TradingPositionsFooter 
            isVisible={showPositionsFooter}
            onClose={() => setShowPositionsFooter(false)}
          />
        </div>
      )}
    </div>
  );
};

export default TradingDashboard;