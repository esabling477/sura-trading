// Mock data for cryptocurrency and forex trading dashboard

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
    id: 'ripple',
    name: 'XRP',
    symbol: 'XRP',
    current_price: 2.85,
    price_change_percentage_24h: 2.71,
    market_cap: 161234567890,
    market_cap_rank: 3,
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png'
  },
  {
    id: 'tether',
    name: 'Tether',
    symbol: 'USDT',
    current_price: 1.00,
    price_change_percentage_24h: 0.02,
    market_cap: 136789012345,
    market_cap_rank: 4,
    image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png'
  },
  {
    id: 'binancecoin',
    name: 'BNB',
    symbol: 'BNB',
    current_price: 554.77,
    price_change_percentage_24h: 1.11,
    market_cap: 82345678901,
    market_cap_rank: 5,
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png'
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    current_price: 211.83,
    price_change_percentage_24h: 4.54,
    market_cap: 98765432109,
    market_cap_rank: 6,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png'
  },
  {
    id: 'usd-coin',
    name: 'USDC',
    symbol: 'USDC',
    current_price: 1.00,
    price_change_percentage_24h: -0.06,
    market_cap: 34567890123,
    market_cap_rank: 7,
    image: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png'
  },
  {
    id: 'staked-ether',
    name: 'Lido Staked Ether',
    symbol: 'STETH',
    current_price: 4372.16,
    price_change_percentage_24h: 1.69,
    market_cap: 42876543210,
    market_cap_rank: 8,
    image: 'https://assets.coingecko.com/coins/images/13442/large/steth_logo.png'
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    current_price: 0.217,
    price_change_percentage_24h: -2.73,
    market_cap: 31987654321,
    market_cap_rank: 9,
    image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png'
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
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    current_price: 0.852,
    price_change_percentage_24h: 2.26,
    market_cap: 29876543210,
    market_cap_rank: 11,
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png'
  },
  {
    id: 'wrapped-steth',
    name: 'Wrapped stETH',
    symbol: 'WSTETH',
    current_price: 5299.39,
    price_change_percentage_24h: 1.86,
    market_cap: 21234567890,
    market_cap_rank: 12,
    image: 'https://assets.coingecko.com/coins/images/18834/large/wsteth.png'
  },
  {
    id: 'chainlink',
    name: 'Chainlink',
    symbol: 'LINK',
    current_price: 23.49,
    price_change_percentage_24h: 1.58,
    market_cap: 15678901234,
    market_cap_rank: 13,
    image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png'
  }
];

// Forex and commodities data
export const mockForexPairs = [
  {
    id: 'xau-usd',
    name: 'Gold',
    symbol: 'XAU/USD',
    current_price: 2645.30,
    price_change_percentage_24h: 0.45,
    market_cap: null,
    market_cap_rank: null,
    image: 'https://s3-symbol-logo.tradingview.com/metal/gold--600.png',
    type: 'commodity'
  },
  {
    id: 'eur-usd',
    name: 'Euro US Dollar',
    symbol: 'EUR/USD',
    current_price: 1.0856,
    price_change_percentage_24h: -0.12,
    market_cap: null,
    market_cap_rank: null,
    image: 'https://s3-symbol-logo.tradingview.com/country/US--300.png',
    type: 'forex'
  },
  {
    id: 'gbp-usd',
    name: 'British Pound US Dollar',
    symbol: 'GBP/USD',
    current_price: 1.2734,
    price_change_percentage_24h: 0.23,
    market_cap: null,
    market_cap_rank: null,
    image: 'https://s3-symbol-logo.tradingview.com/country/GB--300.png',
    type: 'forex'
  },
  {
    id: 'usd-jpy',
    name: 'US Dollar Japanese Yen',
    symbol: 'USD/JPY',
    current_price: 148.92,
    price_change_percentage_24h: 0.67,
    market_cap: null,
    market_cap_rank: null,
    image: 'https://s3-symbol-logo.tradingview.com/country/JP--300.png',
    type: 'forex'
  },
  {
    id: 'xag-usd',
    name: 'Silver',
    symbol: 'XAG/USD',
    current_price: 31.42,
    price_change_percentage_24h: 1.23,
    market_cap: null,
    market_cap_rank: null,
    image: 'https://s3-symbol-logo.tradingview.com/metal/silver--600.png',
    type: 'commodity'
  },
  {
    id: 'usd-cad',
    name: 'US Dollar Canadian Dollar',
    symbol: 'USD/CAD',
    current_price: 1.3567,
    price_change_percentage_24h: -0.18,
    market_cap: null,
    market_cap_rank: null,
    image: 'https://s3-symbol-logo.tradingview.com/country/CA--300.png',
    type: 'forex'
  },
  {
    id: 'aud-usd',
    name: 'Australian Dollar US Dollar',
    symbol: 'AUD/USD',
    current_price: 0.6789,
    price_change_percentage_24h: 0.34,
    market_cap: null,
    market_cap_rank: null,
    image: 'https://s3-symbol-logo.tradingview.com/country/AU--300.png',
    type: 'forex'
  }
];

// Combined data for the sidebar
export const mockAllAssets = [...mockCryptoPrices, ...mockForexPairs];

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
    id: 'xau-usd',
    name: 'Gold',
    symbol: 'XAU/USD',
    holdings: 5.0,
    current_price: 2645.30,
    price_change_percentage_24h: 0.45,
    image: 'https://s3-symbol-logo.tradingview.com/metal/gold--600.png'
  }
];

// Mock chart data for price history
export const generateMockChartData = (symbol, days = 30) => {
  const data = [];
  const now = new Date();
  let basePrice;
  
  // Set base prices based on asset type
  if (symbol === 'BTC') basePrice = 111384;
  else if (symbol === 'ETH') basePrice = 4383.05;
  else if (symbol === 'XAU/USD') basePrice = 2645.30;
  else if (symbol === 'EUR/USD') basePrice = 1.0856;
  else basePrice = mockAllAssets.find(asset => asset.symbol === symbol)?.current_price || 100;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate realistic price variations
    const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
    const price = basePrice * (1 + variation * (i / days));
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(symbol.includes('/') ? 4 : 2)),
      timestamp: date.getTime(),
      open: parseFloat((price * 0.995).toFixed(symbol.includes('/') ? 4 : 2)),
      high: parseFloat((price * 1.01).toFixed(symbol.includes('/') ? 4 : 2)),
      low: parseFloat((price * 0.99).toFixed(symbol.includes('/') ? 4 : 2)),
      close: parseFloat(price.toFixed(symbol.includes('/') ? 4 : 2)),
      volume: Math.floor(Math.random() * 1000000 + 100000)
    });
  }
  
  return data;
};

// Helper functions
export const formatPrice = (price, symbol = '') => {
  if (symbol.includes('/')) {
    // Forex pair formatting
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    }).format(price);
  } else if (price >= 1000) {
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
  if (!marketCap) return 'N/A';
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