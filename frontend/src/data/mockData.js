// Mock data for cryptocurrency trading dashboard

export const mockCryptoPrices = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    current_price: 111384,
    price_change_percentage_24h: 1.74,
    market_cap: 2198456789012,
    market_cap_rank: 1,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    current_price: 4383.05,
    price_change_percentage_24h: -1.31,
    market_cap: 526789123456,
    market_cap_rank: 2,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
  },
  {
    id: 'binancecoin',
    name: 'BNB',
    symbol: 'BNB',
    current_price: 554.77,
    price_change_percentage_24h: 1.11,
    market_cap: 82345678901,
    market_cap_rank: 3,
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png'
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    current_price: 211.83,
    price_change_percentage_24h: 4.54,
    market_cap: 98765432109,
    market_cap_rank: 4,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png'
  },
  {
    id: 'usd-coin',
    name: 'USDC',
    symbol: 'USDC',
    current_price: 1.00,
    price_change_percentage_24h: -0.06,
    market_cap: 34567890123,
    market_cap_rank: 5,
    image: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png'
  },
  {
    id: 'ripple',
    name: 'XRP',
    symbol: 'XRP',
    current_price: 2.85,
    price_change_percentage_24h: 2.71,
    market_cap: 161234567890,
    market_cap_rank: 6,
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png'
  },
  {
    id: 'tether',
    name: 'Tether',
    symbol: 'USDT',
    current_price: 1.00,
    price_change_percentage_24h: 0.02,
    market_cap: 136789012345,
    market_cap_rank: 7,
    image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png'
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    current_price: 0.217,
    price_change_percentage_24h: -2.73,
    market_cap: 31987654321,
    market_cap_rank: 8,
    image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png'
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    current_price: 0.852,
    price_change_percentage_24h: 2.26,
    market_cap: 29876543210,
    market_cap_rank: 9,
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png'
  },
  {
    id: 'tron',
    name: 'TRON',
    symbol: 'TRX',
    current_price: 0.34,
    price_change_percentage_24h: 29.74,
    market_cap: 29123456789,
    market_cap_rank: 10,
    image: 'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png'
  }
];

export const mockPortfolioData = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    holdings: 0.5,
    current_price: 111384,
    price_change_percentage_24h: 1.74,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    holdings: 2.1,
    current_price: 4383.05,
    price_change_percentage_24h: -1.31,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
  },
  {
    id: 'binancecoin',
    name: 'BNB',
    symbol: 'BNB',
    holdings: 10,
    current_price: 554.77,
    price_change_percentage_24h: 1.11,
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png'
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    holdings: 25,
    current_price: 211.83,
    price_change_percentage_24h: 4.54,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png'
  }
];

// Mock chart data for price history
export const generateMockChartData = (symbol, days = 7) => {
  const data = [];
  const now = new Date();
  const basePrice = mockCryptoPrices.find(coin => coin.symbol === symbol)?.current_price || 100;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate realistic price variations
    const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
    const price = basePrice * (1 + variation * (i / days));
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(2)),
      timestamp: date.getTime()
    });
  }
  
  return data;
};

// Mock ticker data for horizontal scrolling
export const mockTickerData = mockCryptoPrices.slice(0, 6).map(coin => ({
  symbol: coin.symbol,
  name: coin.name,
  price: coin.current_price,
  change: coin.price_change_percentage_24h
}));

// Helper functions
export const formatPrice = (price) => {
  if (price >= 1000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  } else if (price >= 1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(price);
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 6
    }).format(price);
  }
};

export const formatMarketCap = (marketCap) => {
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  } else {
    return `$${(marketCap / 1e3).toFixed(2)}K`;
  }
};

export const formatPercentage = (percentage) => {
  const sign = percentage >= 0 ? '+' : '';
  return `${sign}${percentage.toFixed(2)}%`;
};