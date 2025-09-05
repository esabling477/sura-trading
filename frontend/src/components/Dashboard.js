import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Wallet, 
  RefreshCw,
  User,
  LogOut,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { 
  mockCryptoPrices, 
  mockPortfolioData, 
  mockTickerData,
  formatPrice, 
  formatMarketCap, 
  formatPercentage 
} from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import PriceTicker from './PriceTicker';
import MarketOverview from './MarketOverview';
import Portfolio from './Portfolio';
import PriceChart from './PriceChart';

const Dashboard = () => {
  const [cryptoData, setCryptoData] = useState(mockCryptoPrices);
  const [portfolioData, setPortfolioData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // Load portfolio from localStorage on component mount
  useEffect(() => {
    const savedPortfolio = localStorage.getItem('gt-trading-portfolio');
    if (savedPortfolio) {
      setPortfolioData(JSON.parse(savedPortfolio));
    } else {
      // Initialize with mock data
      setPortfolioData(mockPortfolioData);
      localStorage.setItem('gt-trading-portfolio', JSON.stringify(mockPortfolioData));
    }
  }, []);

  const handleRefreshData = () => {
    setIsRefreshing(true);
    // Simulate API call delay
    setTimeout(() => {
      // In real implementation, this would fetch from CoinGecko API
      // For now, we'll just update the timestamp and add some random variation
      const updatedData = cryptoData.map(coin => ({
        ...coin,
        current_price: coin.current_price * (1 + (Math.random() - 0.5) * 0.01), // ±0.5% variation
        price_change_percentage_24h: coin.price_change_percentage_24h + (Math.random() - 0.5) * 0.5
      }));
      setCryptoData(updatedData);
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1500);
  };

  const updatePortfolio = (updatedPortfolio) => {
    setPortfolioData(updatedPortfolio);
    localStorage.setItem('gt-trading-portfolio', JSON.stringify(updatedPortfolio));
  };

  const calculateTotalPortfolioValue = () => {
    return portfolioData.reduce((total, asset) => {
      return total + (asset.holdings * asset.current_price);
    }, 0);
  };

  const calculatePortfolioChange = () => {
    const totalValue = calculateTotalPortfolioValue();
    const yesterdayValue = portfolioData.reduce((total, asset) => {
      const yesterdayPrice = asset.current_price / (1 + asset.price_change_percentage_24h / 100);
      return total + (asset.holdings * yesterdayPrice);
    }, 0);
    
    if (yesterdayValue === 0) return 0;
    return ((totalValue - yesterdayValue) / yesterdayValue) * 100;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const totalValue = calculateTotalPortfolioValue();
  const portfolioChange = calculatePortfolioChange();

  return (
    <div className={`min-h-screen ${
      isDark ? 'bg-[#0a192f] text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`${
        isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
      } border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <BarChart3 className={`h-8 w-8 ${
                  isDark ? 'text-[#64ffda]' : 'text-blue-600'
                }`} />
                <h1 className={`text-xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  GT Trading
                </h1>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6">
                <Button variant="ghost" className={`${
                  isDark 
                    ? 'text-[#64ffda] hover:text-white hover:bg-[#64ffda]/10' 
                    : 'text-blue-600 hover:text-gray-900 hover:bg-blue-50'
                }`}>
                  Dashboard
                </Button>
                <Button variant="ghost" className={`${
                  isDark 
                    ? 'text-gray-300 hover:text-white hover:bg-white/10' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}>
                  Markets
                </Button>
                <Button variant="ghost" className={`${
                  isDark 
                    ? 'text-gray-300 hover:text-white hover:bg-white/10' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}>
                  Portfolio
                </Button>
              </nav>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <span className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              </div>
              
              <Button 
                onClick={handleRefreshData}
                disabled={isRefreshing}
                size="sm"
                variant="outline"
                className={`${
                  isDark 
                    ? 'border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda] hover:text-[#0a192f]' 
                    : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                }`}
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>

              {/* Theme Toggle */}
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
                }`} align="end" forceMount>
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
                  <DropdownMenuSeparator className={
                    isDark ? 'bg-gray-700' : 'bg-gray-200'
                  } />
                  <DropdownMenuItem className={`${
                    isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className={`${
                    isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className={
                    isDark ? 'bg-gray-700' : 'bg-gray-200'
                  } />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className={`${
                      isDark 
                        ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300' 
                        : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                    }`}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-700 py-4">
              <nav className="flex flex-col space-y-2">
                <Button variant="ghost" className={`justify-start ${
                  isDark 
                    ? 'text-[#64ffda] hover:text-white hover:bg-[#64ffda]/10' 
                    : 'text-blue-600 hover:text-gray-900 hover:bg-blue-50'
                }`}>
                  Dashboard
                </Button>
                <Button variant="ghost" className={`justify-start ${
                  isDark 
                    ? 'text-gray-300 hover:text-white hover:bg-white/10' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}>
                  Markets
                </Button>
                <Button variant="ghost" className={`justify-start ${
                  isDark 
                    ? 'text-gray-300 hover:text-white hover:bg-white/10' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}>
                  Portfolio
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Price Ticker */}
      <PriceTicker data={mockTickerData} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-8">
          {/* Left Column - Market Overview */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-8">
            <MarketOverview 
              cryptoData={cryptoData}
              onCoinSelect={setSelectedCoin}
              selectedCoin={selectedCoin}
            />
            
            {/* Price Chart */}
            <Card className={`${
              isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <CardHeader>
                <CardTitle className={`${
                  isDark ? 'text-white' : 'text-gray-900'
                } flex items-center space-x-2`}>
                  <BarChart3 className={`h-5 w-5 ${
                    isDark ? 'text-[#64ffda]' : 'text-blue-600'
                  }`} />
                  <span>
                    {cryptoData.find(coin => coin.id === selectedCoin)?.name || 'Bitcoin'} Price Chart
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PriceChart coinId={selectedCoin} />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Portfolio */}
          <div className="space-y-4 sm:space-y-6">
            {/* Portfolio Summary */}
            <Card className={`${
              isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <CardHeader>
                <CardTitle className={`${
                  isDark ? 'text-white' : 'text-gray-900'
                } flex items-center space-x-2`}>
                  <Wallet className={`h-5 w-5 ${
                    isDark ? 'text-[#64ffda]' : 'text-blue-600'
                  }`} />
                  <span>Portfolio Value</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className={`text-2xl sm:text-3xl font-bold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {formatPrice(totalValue)}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      {portfolioChange >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      )}
                      <span className={`text-sm ${portfolioChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatPercentage(portfolioChange)} (24h)
                      </span>
                    </div>
                  </div>
                  <div className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Total assets: {portfolioData.length}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Holdings */}
            <Portfolio 
              portfolioData={portfolioData}
              onUpdatePortfolio={updatePortfolio}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;