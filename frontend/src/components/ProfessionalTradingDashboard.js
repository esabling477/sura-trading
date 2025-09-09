import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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
  Minus,
  X
} from 'lucide-react';
import { 
  mockAllAssets,
  formatPrice, 
  formatPercentage 
} from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import TradingChart from './TradingChart';

const ProfessionalTradingDashboard = () => {
  const [selectedAsset, setSelectedAsset] = useState(mockAllAssets[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [assets] = useState(mockAllAssets);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [accountData] = useState({
    balance: 15215.13,
    equity: 15276.25,
    usedMargin: 212.24,
    marginLevel: 7189.19,
    todaysPL: 61.12,
    todaysPLPercent: 0.40
  });

  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Mock open positions
  const [openPositions] = useState([
    {
      id: '#794507',
      pair: 'XAUUSD',
      direction: 'Buy',
      lots: 1.0,
      entryPrice: 2122.4122,
      currentPrice: 2311.83,
      stopLoss: 0,
      takeProfit: 0,
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
    }
  ]);

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, active: true },
    { id: 'markets', label: 'Markets', icon: TrendingUp },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const timeframes = ['1M', '5M', '15M', '30M', '1H', '1D'];

  return (
    <div className={`h-screen flex ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex w-64 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } flex-col border-r ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <BarChart3 className={`h-8 w-8 ${isDark ? 'text-green-400' : 'text-blue-600'}`} />
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              GTC Trading
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={item.active ? "default" : "ghost"}
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
        </nav>

        {/* Logout */}
        <div className="p-4">
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
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className={`h-16 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-b flex items-center justify-between px-6`}>
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              className="lg:hidden"
              onClick={() => setShowMobileNav(!showMobileNav)}
            >
              <BarChart3 className="h-6 w-6" />
            </Button>

            {/* Search Bar */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <Input
                placeholder="Search assets (AAPL, BTC/USD)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 w-80 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Last Updated */}
            <span className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>

            {/* Refresh */}
            <Button variant="ghost" size="sm">
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

        {/* Main Panel - 3 Column Layout */}
        <main className="flex-1 p-6 overflow-hidden">
          <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel - Assets List */}
            <div className="lg:col-span-3">
              <Card className={`h-full ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-2xl shadow-lg`}>
                <CardHeader>
                  <CardTitle className={`flex items-center space-x-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Activity className="h-5 w-5 text-green-400" />
                    <span>Popular Assets</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-1 p-4">
                      {filteredAssets.map((asset) => (
                        <div
                          key={asset.id}
                          onClick={() => setSelectedAsset(asset)}
                          className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                            selectedAsset.id === asset.id
                              ? 'bg-green-600 text-white'
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
                              <div className={`font-medium ${
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
                </CardContent>
              </Card>
            </div>

            {/* Center Panel - Chart */}
            <div className="lg:col-span-6">
              <Card className={`h-full ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-2xl shadow-lg`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {selectedAsset.symbol} Live Chart
                      </CardTitle>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`text-2xl font-bold ${
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
                    <div className="flex space-x-1">
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
                <CardContent className="p-0 h-full">
                  <div className="h-[500px]">
                    <TradingChart 
                      symbol={selectedAsset.symbol} 
                      data={selectedAsset}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Panel - Account & Trading */}
            <div className="lg:col-span-3 space-y-6">
              {/* Account Balance */}
              <Card className={`${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-2xl shadow-lg`}>
                <CardHeader>
                  <CardTitle className={`flex items-center space-x-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    <DollarSign className="h-5 w-5 text-green-400" />
                    <span>Account Balance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ${accountData.balance.toLocaleString()}
                    </div>
                    <div className="flex items-center justify-center space-x-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-green-400" />
                      <span className="text-sm text-green-400">
                        +${accountData.todaysPL} ({accountData.todaysPLPercent}%)
                      </span>
                    </div>
                  </div>
                  
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
                        ${accountData.usedMargin.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Margin Level:</span>
                      <span className="text-green-400">
                        {accountData.marginLevel.toLocaleString()}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Trade */}
              <Card className={`${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-2xl shadow-lg`}>
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
                      <Button size="sm" variant="outline">
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        value="1.00"
                        step="0.01"
                        className={`text-center ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                        }`}
                      />
                      <Button size="sm" variant="outline">
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
                        className={`${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Buy/Sell Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button className="bg-green-600 hover:bg-green-700 text-white h-12">
                      BUY
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700 text-white h-12">
                      SELL
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Bottom Section - Tabbed Trading Data */}
        <div className={`${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-t`}>
          <div className="h-80">
            <Tabs defaultValue="positions" className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 pb-2">
                <TabsList className={`${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <TabsTrigger value="positions" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    Position Holding
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    Pending Orders
                  </TabsTrigger>
                  <TabsTrigger value="history" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    History
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 px-4 pb-4">
                <TabsContent value="positions" className="m-0 h-full">
                  <ScrollArea className="h-full">
                    {/* Desktop Table View */}
                    <div className="hidden lg:block">
                      <div className="grid grid-cols-11 gap-4 py-2 px-4 text-sm font-medium text-gray-400 border-b border-gray-600">
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
                      
                      {openPositions.map((position) => (
                        <div key={position.id} className="grid grid-cols-11 gap-4 py-3 px-4 text-sm border-b border-gray-700 hover:bg-gray-700/50">
                          <div className={isDark ? 'text-white' : 'text-gray-900'}>{position.pair}</div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{position.id}</div>
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
                          <div className="text-green-400 font-medium">${position.profit}</div>
                          <div className={isDark ? 'text-white' : 'text-gray-900'}>${position.margin}</div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {position.openTime}
                          </div>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline" className="text-xs">Close</Button>
                          </div>
                        </div>
                      ))}
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
                                  position.direction === 'Buy' ? 'bg-green-600' : 'bg-red-600'
                                } text-white`}>
                                  {position.direction}
                                </Badge>
                              </div>
                              <div className="text-green-400 font-medium">
                                +${position.profit}
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
                              {position.id} • {position.openTime}
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
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className={`lg:hidden fixed bottom-0 left-0 right-0 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-t`}>
        <div className="grid grid-cols-6 gap-1 p-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
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

      {/* Mobile Menu Overlay */}
      {showMobileNav && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowMobileNav(false)}>
          <div className={`absolute left-0 top-0 h-full w-80 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } p-4`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-lg font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Menu</h2>
              <Button variant="ghost" onClick={() => setShowMobileNav(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Mobile menu items would go here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalTradingDashboard;