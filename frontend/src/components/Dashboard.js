import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Wallet, 
  RefreshCw,
  Edit,
  Save,
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

  // Load portfolio from localStorage on component mount
  useEffect(() => {
    const savedPortfolio = localStorage.getItem('cryptoPortfolio');
    if (savedPortfolio) {
      setPortfolioData(JSON.parse(savedPortfolio));
    } else {
      // Initialize with mock data
      setPortfolioData(mockPortfolioData);
      localStorage.setItem('cryptoPortfolio', JSON.stringify(mockPortfolioData));
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
    localStorage.setItem('cryptoPortfolio', JSON.stringify(updatedPortfolio));
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

  const totalValue = calculateTotalPortfolioValue();
  const portfolioChange = calculatePortfolioChange();

  return (
    <div className="min-h-screen bg-[#0a192f] text-white">
      {/* Header */}
      <header className="bg-[#112240] border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-8 w-8 text-[#64ffda]" />
                <h1 className="text-xl font-bold text-white">CryptoTrader</h1>
              </div>
              <nav className="hidden md:flex space-x-6">
                <Button variant="ghost" className="text-[#64ffda] hover:text-white hover:bg-[#64ffda]/10">
                  Dashboard
                </Button>
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                  Markets
                </Button>
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                  Portfolio
                </Button>
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                  Login
                </Button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
              <Button 
                onClick={handleRefreshData}
                disabled={isRefreshing}
                size="sm"
                variant="outline"
                className="border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda] hover:text-[#0a192f]"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Price Ticker */}
      <PriceTicker data={mockTickerData} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Market Overview */}
          <div className="xl:col-span-2 space-y-8">
            <MarketOverview 
              cryptoData={cryptoData}
              onCoinSelect={setSelectedCoin}
              selectedCoin={selectedCoin}
            />
            
            {/* Price Chart */}
            <Card className="bg-[#112240] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-[#64ffda]" />
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
          <div className="space-y-6">
            {/* Portfolio Summary */}
            <Card className="bg-[#112240] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Wallet className="h-5 w-5 text-[#64ffda]" />
                  <span>Portfolio Value</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-white">
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
                  <Separator className="bg-gray-700" />
                  <div className="text-sm text-gray-400">
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