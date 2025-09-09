import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { 
  Search,
  Bell,
  Sun,
  Moon,
  Home,
  TrendingUp,
  ShoppingCart,
  Wallet,
  User,
  Settings,
  LogOut,
  RefreshCw,
  TrendingDown,
  BarChart3,
  Activity,
  DollarSign,
  Plus,
  Minus
} from 'lucide-react';
import { 
  mockAllAssets,
  formatPrice, 
  formatPercentage 
} from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import TradingChart from './TradingChart';

const ResponsiveTradingDashboard = () => {
  const [selectedAsset, setSelectedAsset] = useState(mockAllAssets[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [assets] = useState(mockAllAssets);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [lotSize, setLotSize] = useState(1.0);
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');

  const [accountData] = useState({
    balance: 15215.13,
    equity: 15276.25,
    usedMargin: 212.24,
    marginLevel: 7189.19,
    todaysPL: 61.12,
    todaysPLPercent: 0.40
  });

  // Mock open positions with more realistic data
  const [openPositions] = useState([
    {
      id: '#794507',
      pair: 'XAUUSD',
      direction: 'Buy',
      lots: 1.0,
      entryPrice: 2122.41,
      currentPrice: 2311.83,
      stopLoss: 2050.00,
      takeProfit: 2400.00,
      profit: 189.42,
      margin: 212.24,
      openTime: '2025-09-04 15:56:32'
    },
    {
      id: '#794508',
      pair: 'BTCUSD',
      direction: 'Buy',
      lots: 0.1,
      entryPrice: 110000,
      currentPrice: 111384,
      stopLoss: 105000,
      takeProfit: 115000,
      profit: 138.4,
      margin: 1100,
      openTime: '2025-09-04 14:22:15'
    },
    {
      id: '#794509',
      pair: 'EURUSD',
      direction: 'Sell',
      lots: 2.0,
      entryPrice: 1.0890,
      currentPrice: 1.0856,
      stopLoss: 1.0950,
      takeProfit: 1.0800,
      profit: 68.0,
      margin: 217.8,
      openTime: '2025-09-04 12:30:45'
    }
  ]);

  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, active: true },
    { id: 'markets', label: 'Markets', icon: TrendingUp },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'wallet', label: 'Wallet', icon: Wallet, action: () => navigate('/dashboard/deposit') },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const timeframes = ['1M', '5M', '15M', '30M', '1H', '1D'];

  return (
    <div className={`flex flex-col min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`h-16 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-b flex items-center justify-between px-6 sticky top-0 z-40`}>
        <div className="flex items-center space-x-4">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-green-400" />
            <span className="font-bold">GTC</span>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <Input
              placeholder="Search assets (AAPL, BTC/USD)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 w-64 lg:w-80 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Last Updated */}
          <span className={`hidden sm:block text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>

          {/* Refresh */}
          <Button variant="ghost" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-green-600 text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`w-56 ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`} align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1">
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {user?.name}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {user?.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/dashboard/deposit')}>
                Deposit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/dashboard/withdrawal')}>
                Withdraw
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
          {/* Left Sidebar - Desktop Only */}
          <aside className={`hidden lg:block lg:col-span-2 ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border-r`}>
            <div className="p-6">
              {/* Logo */}
              <div className="flex items-center space-x-2 mb-8">
                <BarChart3 className="h-8 w-8 text-green-400" />
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  GTC Trading
                </h1>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={item.active ? "default" : "ghost"}
                      onClick={item.action}
                      className={`w-full justify-start h-12 ${
                        item.active 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : (isDark 
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                            )
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </Button>
                  );
                })}
                
                <Separator className={`my-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className={`w-full justify-start h-12 text-red-500 hover:text-red-600 ${
                    isDark ? 'hover:bg-red-900/20' : 'hover:bg-red-50'
                  }`}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </Button>
              </nav>
            </div>
          </aside>

          {/* Center & Right Panels */}
          <div className="col-span-1 lg:col-span-10 p-6 space-y-6">
            {/* 3-Column Grid for Desktop, Stacked for Mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
              {/* Popular Assets - Mobile/Desktop */}
              <div className="lg:col-span-3">
                <Card className={`h-full ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } rounded-xl shadow-lg`}>
                  <CardHeader>
                    <CardTitle className={`flex items-center space-x-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Activity className="h-5 w-5 text-green-400" />
                      <span>Popular Assets</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[400px] lg:h-[500px]">
                      <div className="space-y-1 p-4">
                        {filteredAssets.map((asset) => (
                          <div
                            key={asset.id}
                            onClick={() => setSelectedAsset(asset)}
                            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                              selectedAsset.id === asset.id
                                ? 'bg-green-600 text-white shadow-md'
                                : (isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50')
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
                                  selectedAsset.id === asset.id ? 'text-white' : (isDark ? 'text-white' : 'text-gray-900')
                                }`}>
                                  {asset.symbol}
                                </div>
                                <div className={`text-xs ${
                                  selectedAsset.id === asset.id ? 'text-green-100' : (isDark ? 'text-gray-400' : 'text-gray-600')
                                }`}>
                                  {asset.name}
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className={`font-medium text-sm ${
                                selectedAsset.id === asset.id ? 'text-white' : (isDark ? 'text-white' : 'text-gray-900')
                              }`}>
                                {asset.symbol.includes('/') 
                                  ? formatPrice(asset.current_price, asset.symbol)
                                  : formatPrice(asset.current_price)
                                }
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
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Chart - Center */}
              <div className="lg:col-span-4">
                <Card className={`h-full ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } rounded-xl shadow-lg`}>
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
                      <div>
                        <CardTitle className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {selectedAsset.symbol} Live Chart
                        </CardTitle>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className={`text-xl lg:text-2xl font-bold ${
                            isDark ? 'text-green-400' : 'text-blue-600'
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
                      
                      {/* Timeframe Selector */}
                      <div className="flex flex-wrap gap-1">
                        {timeframes.map((tf) => (
                          <Button
                            key={tf}
                            variant={selectedTimeframe === tf ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setSelectedTimeframe(tf)}
                            className={`${
                              selectedTimeframe === tf 
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : (isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900')
                            }`}
                          >
                            {tf}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-[300px] lg:h-[400px]">
                      <TradingChart 
                        symbol={selectedAsset.symbol} 
                        data={selectedAsset}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Account & Trading - Right */}
              <div className="lg:col-span-3 space-y-6">
                {/* Account Balance */}
                <Card className={`${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } rounded-xl shadow-lg`}>
                  <CardHeader>
                    <CardTitle className={`flex items-center space-x-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      <DollarSign className="h-5 w-5 text-green-400" />
                      <span>Account</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ${accountData.balance.toLocaleString()}
                      </div>
                      <div className="flex items-center justify-center space-x-1 mt-1">
                        <TrendingUp className="h-3 w-3 text-green-400" />
                        <span className="text-sm text-green-400">
                          +${accountData.todaysPL} ({accountData.todaysPLPercent}%)
                        </span>
                      </div>
                    </div>
                    
                    <Separator className={isDark ? 'bg-gray-700' : 'bg-gray-200'} />
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Equity:</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>
                          ${accountData.equity.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Used Margin:</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>
                          ${accountData.usedMargin}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Margin Level:</span>
                        <span className="text-green-400">
                          {accountData.marginLevel}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Trade */}
                <Card className={`${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } rounded-xl shadow-lg`}>
                  <CardHeader>
                    <CardTitle className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Quick Trade
                    </CardTitle>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {selectedAsset.symbol}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Lot Size */}
                    <div>
                      <label className={`text-sm mb-2 block ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Lot Size
                      </label>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setLotSize(Math.max(0.01, lotSize - 0.01))}
                          className={isDark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input
                          type="number"
                          value={lotSize.toFixed(2)}
                          onChange={(e) => setLotSize(parseFloat(e.target.value) || 0)}
                          step="0.01"
                          min="0.01"
                          className={`text-center ${
                            isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setLotSize(lotSize + 0.01)}
                          className={isDark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Stop Loss & Take Profit */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className={`text-xs mb-1 block ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Stop Loss
                        </label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={stopLoss}
                          onChange={(e) => setStopLoss(e.target.value)}
                          className={`${
                            isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`text-xs mb-1 block ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Take Profit
                        </label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={takeProfit}
                          onChange={(e) => setTakeProfit(e.target.value)}
                          className={`${
                            isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Buy/Sell Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button className="bg-green-600 hover:bg-green-700 text-white h-12 font-semibold">
                        BUY
                      </Button>
                      <Button className="bg-red-500 hover:bg-red-600 text-white h-12 font-semibold">
                        SELL
                      </Button>
                    </div>
                    
                    <div className={`text-xs space-y-1 pt-2 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <div className="flex justify-between">
                        <span>Estimated Margin:</span>
                        <span>${(lotSize * 100).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Spread:</span>
                        <span>0.3 pips</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Large Chart - Center for Desktop */}
              <div className="lg:col-span-7 order-first lg:order-none">
                <Card className={`h-full ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } rounded-xl shadow-lg`}>
                  <CardContent className="p-0 h-full">
                    <div className="h-[300px] lg:h-[500px]">
                      <TradingChart 
                        symbol={selectedAsset.symbol} 
                        data={selectedAsset}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bottom Section - Trading Tables */}
            <Card className={`${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } rounded-xl shadow-lg`}>
              <CardContent className="p-0">
                <div className="h-80">
                  <Tabs defaultValue="positions" className="h-full flex flex-col">
                    <div className="flex items-center justify-between p-4 pb-2">
                      <TabsList className={`${
                        isDark ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <TabsTrigger 
                          value="positions" 
                          className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                        >
                          Position Holding
                        </TabsTrigger>
                        <TabsTrigger 
                          value="pending" 
                          className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                        >
                          Pending Orders
                        </TabsTrigger>
                        <TabsTrigger 
                          value="history" 
                          className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                        >
                          History
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <div className="flex-1 px-4 pb-4 overflow-hidden">
                      <TabsContent value="positions" className="m-0 h-full">
                        <ScrollArea className="h-full">
                          {/* Desktop Table View */}
                          <div className="hidden lg:block">
                            <div className="grid grid-cols-10 gap-4 py-2 px-4 text-sm font-medium text-gray-400 border-b border-gray-600 mb-2">
                              <div>Pair</div>
                              <div>Order ID</div>
                              <div>Direction</div>
                              <div>Lots</div>
                              <div>Entry Price</div>
                              <div>Current Price</div>
                              <div>Profit</div>
                              <div>Margin</div>
                              <div>Open Time</div>
                              <div>Actions</div>
                            </div>
                            
                            <div className="space-y-1">
                              {openPositions.map((position) => (
                                <div key={position.id} className={`grid grid-cols-10 gap-4 py-3 px-4 text-sm rounded-lg ${
                                  isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                                }`}>
                                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {position.pair}
                                  </div>
                                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {position.id}
                                  </div>
                                  <div className={`flex items-center ${
                                    position.direction === 'Buy' ? 'text-green-400' : 'text-red-400'
                                  }`}>
                                    {position.direction === 'Buy' ? (
                                      <TrendingUp className="h-3 w-3 mr-1" />
                                    ) : (
                                      <TrendingDown className="h-3 w-3 mr-1" />
                                    )}
                                    {position.direction}
                                  </div>
                                  <div className={isDark ? 'text-white' : 'text-gray-900'}>{position.lots}</div>
                                  <div className={isDark ? 'text-white' : 'text-gray-900'}>{position.entryPrice}</div>
                                  <div className={isDark ? 'text-white' : 'text-gray-900'}>{position.currentPrice}</div>
                                  <div className={`font-medium ${
                                    position.profit >= 0 ? 'text-green-400' : 'text-red-400'
                                  }`}>
                                    ${position.profit}
                                  </div>
                                  <div className={isDark ? 'text-white' : 'text-gray-900'}>${position.margin}</div>
                                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {new Date(position.openTime).toLocaleDateString()}
                                  </div>
                                  <div>
                                    <Button size="sm" variant="outline" className="text-xs">
                                      Close
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Mobile Card View */}
                          <div className="lg:hidden space-y-3">
                            {openPositions.map((position) => (
                              <Card key={position.id} className={`${
                                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                              }`}>
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {position.pair}
                                      </span>
                                      <Badge className={`${
                                        position.direction === 'Buy' ? 'bg-green-600' : 'bg-red-500'
                                      } text-white`}>
                                        {position.direction}
                                      </Badge>
                                    </div>
                                    <div className={`font-medium ${
                                      position.profit >= 0 ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                      ${position.profit}
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                                    <div>
                                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Lots: </span>
                                      <span className={isDark ? 'text-white' : 'text-gray-900'}>{position.lots}</span>
                                    </div>
                                    <div>
                                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Entry: </span>
                                      <span className={isDark ? 'text-white' : 'text-gray-900'}>{position.entryPrice}</span>
                                    </div>
                                    <div>
                                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Current: </span>
                                      <span className={isDark ? 'text-white' : 'text-gray-900'}>{position.currentPrice}</span>
                                    </div>
                                    <div>
                                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Margin: </span>
                                      <span className={isDark ? 'text-white' : 'text-gray-900'}>${position.margin}</span>
                                    </div>
                                  </div>
                                  
                                  <div className={`text-xs mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {position.id} • {new Date(position.openTime).toLocaleDateString()}
                                  </div>
                                  
                                  <Button size="sm" variant="outline" className="w-full">
                                    Close Position
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </ScrollArea>
                      </TabsContent>

                      <TabsContent value="pending" className="m-0 h-full flex items-center justify-center">
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          No pending orders
                        </p>
                      </TabsContent>

                      <TabsContent value="history" className="m-0 h-full flex items-center justify-center">
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          No trade history
                        </p>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className={`lg:hidden ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-t`}>
        <div className="grid grid-cols-6 gap-1 p-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={item.action}
                className={`flex flex-col items-center py-2 h-auto ${
                  item.active 
                    ? 'text-green-400' 
                    : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                }`}
              >
                <Icon className="h-4 w-4 mb-1" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Fixed Footer */}
      <footer className={`${
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-200'
      } border-t py-6`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2025 GTC Trading Platform. All rights reserved.
            </div>
            
            {/* Links */}
            <div className="flex items-center space-x-6">
              <a 
                href="#" 
                className={`text-sm hover:underline transition-colors ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Terms of Service
              </a>
              <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>|</span>
              <a 
                href="#" 
                className={`text-sm hover:underline transition-colors ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Privacy Policy
              </a>
              <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>|</span>
              <a 
                href="#" 
                className={`text-sm hover:underline transition-colors ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Contact Us
              </a>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className={`p-2 rounded-full transition-colors ${
                  isDark 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a 
                href="#" 
                className={`p-2 rounded-full transition-colors ${
                  isDark 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
                aria-label="Telegram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResponsiveTradingDashboard;