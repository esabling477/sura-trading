import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Copy, Upload, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from '../hooks/use-toast';

const DepositPage = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('digital');
  const [selectedNetwork, setSelectedNetwork] = useState('USDT-TRC20');
  const [coinAmount, setCoinAmount] = useState('');
  const [showRecords, setShowRecords] = useState(false);

  // Real wallet addresses and QR codes with updated images
  const walletData = {
    'BTC': {
      address: 'bc1qerkz35fpm895yu6ktnvajp9eepe4yg2u84f6v6',
      qrCode: 'https://customer-assets.emergentagent.com/job_marketwatch-app/artifacts/rqdaxirp_5897763252107069860_120.jpg'
    },
    'USDT-TRC20': {
      address: 'TXrJGy8P4MohRcjCNZRSK5zvv1ZP4YNRjc',
      qrCode: 'https://customer-assets.emergentagent.com/job_marketwatch-app/artifacts/nq6ofw9y_5897763252107069859_109.jpg'
    },
    'USDT-ERC20': {
      address: 'TXrJGy8P4MohRcjCNZRSK5zvv1ZP4YNRjc', // Using same USDT address for now
      qrCode: 'https://customer-assets.emergentagent.com/job_marketwatch-app/artifacts/nq6ofw9y_5897763252107069859_109.jpg'
    },
    'ETH': {
      address: 'bc1qerkz35fpm895yu6ktnvajp9eepe4yg2u84f6v6', // Using BTC address as placeholder
      qrCode: 'https://customer-assets.emergentagent.com/job_marketwatch-app/artifacts/rqdaxirp_5897763252107069860_120.jpg'
    }
  };

  const currentWalletData = walletData[selectedNetwork] || walletData['USDT-TRC20'];

  // Mock deposit records
  const depositRecords = [
    {
      id: 1,
      rechargeAmount: 678,
      type: 'Digital Currency',
      unit: 'USDT',
      status: 'Invalid',
      date: '2025-08-18 06:37:20'
    },
    {
      id: 2,
      rechargeAmount: 500,
      type: 'Digital Currency',
      unit: 'USDT',
      status: 'Complete',
      date: '2025-08-17 14:22:15'
    }
  ];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(currentWalletData.address);
    toast({
      title: "Address Copied",
      description: "Wallet address has been copied to clipboard",
    });
  };

  const handleSubmit = () => {
    if (!coinAmount) {
      toast({
        title: "Error",
        description: "Please enter the number of coins to be charged",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Deposit Request Submitted",
      description: `Depositing ${coinAmount} ${selectedNetwork.split('-')[0]}`,
    });
  };

  const getNetworkDisplayName = (network) => {
    const names = {
      'BTC': 'Bitcoin (BTC)',
      'USDT-TRC20': 'Tether USDT (TRC20)',
      'USDT-ERC20': 'Tether USDT (ERC20)',
      'ETH': 'Ethereum (ETH)'
    };
    return names[network] || network;
  };

  const getNetworkWarning = (network) => {
    const warnings = {
      'BTC': 'Only send Bitcoin (BTC) assets to this address. Other assets will be lost forever.',
      'USDT-TRC20': 'Only send Tether (TRC20) assets to this address. Other assets will be lost forever.',
      'USDT-ERC20': 'Only send Tether (ERC20) assets to this address. Other assets will be lost forever.',
      'ETH': 'Only send Ethereum (ETH) assets to this address. Other assets will be lost forever.'
    };
    return warnings[network] || 'Please ensure you send the correct asset type to this address.';
  };

  return (
    <div className={`min-h-screen ${
      isDark ? 'bg-[#0a192f]' : 'bg-gray-50'
    }`}>
      <div className="p-4 space-y-6">
        {/* Tab Headers */}
        <div className="flex rounded-lg overflow-hidden">
          <Button
            variant={activeTab === 'digital' ? 'default' : 'outline'}
            className={`flex-1 rounded-none ${
              activeTab === 'digital'
                ? 'bg-[#8BC34A] text-white hover:bg-[#7CB342]'
                : (isDark 
                    ? 'bg-[#112240] text-gray-300 border-gray-600 hover:bg-gray-700' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  )
            }`}
            onClick={() => setActiveTab('digital')}
          >
            Digital Currency
          </Button>
          <Button
            variant={activeTab === 'bank' ? 'default' : 'outline'}
            className={`flex-1 rounded-none ${
              activeTab === 'bank'
                ? 'bg-[#8BC34A] text-white hover:bg-[#7CB342]'
                : (isDark 
                    ? 'bg-[#112240] text-gray-300 border-gray-600 hover:bg-gray-700' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  )
            }`}
            onClick={() => setActiveTab('bank')}
          >
            Bank Card
          </Button>
        </div>

        {/* Digital Currency Tab Content */}
        {activeTab === 'digital' && (
          <Card className={`${
            isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <CardContent className="p-6 space-y-6">
              {/* Warning Message */}
              <div className={`p-3 rounded-lg border-l-4 ${
                isDark 
                  ? 'bg-yellow-900/20 border-yellow-600 text-yellow-200' 
                  : 'bg-yellow-50 border-yellow-400 text-yellow-800'
              }`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">
                      {getNetworkWarning(selectedNetwork)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Network Selection */}
              <div>
                <Label className={`${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Select Network
                </Label>
                <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                  <SelectTrigger className={`mt-2 ${
                    isDark 
                      ? 'bg-[#0a192f] border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={
                    isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
                  }>
                    <SelectItem value="USDT-TRC20">Tether USDT (TRC20)</SelectItem>
                    <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                    <SelectItem value="USDT-ERC20">Tether USDT (ERC20)</SelectItem>
                    <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Selected Network Info */}
              <div className={`p-4 rounded-lg border ${
                isDark ? 'bg-[#0a192f] border-gray-600' : 'bg-gray-50 border-gray-300'
              }`}>
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedNetwork.includes('BTC') ? 'bg-orange-500' : 
                    selectedNetwork.includes('USDT') ? 'bg-green-500' : 'bg-blue-500'
                  }`}>
                    <span className="text-white font-bold text-sm">
                      {selectedNetwork.split('-')[0].charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className={`font-medium ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {getNetworkDisplayName(selectedNetwork)}
                    </h3>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Network: {selectedNetwork.includes('-') ? selectedNetwork.split('-')[1] : selectedNetwork}
                    </p>
                  </div>
                </div>
              </div>

              {/* Wallet Address */}
              <div>
                <Label className={`${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Wallet Address
                </Label>
                
                {/* QR Code */}
                <div className="flex justify-center my-4">
                  <div className={`p-4 rounded-lg ${
                    isDark ? 'bg-white' : 'bg-white'
                  } shadow-lg`}>
                    <img 
                      src={currentWalletData.qrCode}
                      alt={`${selectedNetwork} QR Code`}
                      className="w-48 h-48 object-contain"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIGZpbGw9ImJsYWNrIi8+CjxyZWN0IHg9IjQwIiB5PSI0MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjYwIiB5PSI2MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K';
                      }}
                    />
                  </div>
                </div>

                {/* Address with Copy Button */}
                <div className="flex items-center space-x-2">
                  <Input
                    value={currentWalletData.address}
                    readOnly
                    className={`flex-1 ${
                      isDark 
                        ? 'bg-[#0a192f] border-gray-600 text-white font-mono text-sm' 
                        : 'bg-gray-50 border-gray-300 font-mono text-sm'
                    }`}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyAddress}
                    className={`${
                      isDark 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    } flex-shrink-0`}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className={`text-xs mt-2 ${
                  isDark ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Send only {selectedNetwork.split('-')[0]} to this address. Sending any other asset will result in permanent loss.
                </p>
              </div>

              {/* Number of Coins */}
              <div>
                <Label className={`${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Number of coins
                </Label>
                <Input
                  type="number"
                  placeholder={`Enter amount of ${selectedNetwork.split('-')[0]} to deposit`}
                  value={coinAmount}
                  onChange={(e) => setCoinAmount(e.target.value)}
                  className={`mt-2 ${
                    isDark 
                      ? 'bg-[#0a192f] border-gray-600 text-white placeholder:text-gray-500' 
                      : 'bg-white border-gray-300 placeholder:text-gray-400'
                  }`}
                />
                <p className={`text-xs mt-1 ${
                  isDark ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Minimum deposit: {selectedNetwork.includes('BTC') ? '0.0001 BTC' : '10 USDT'}
                </p>
              </div>

              {/* Upload Certificate */}
              <div>
                <Label className={`${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Upload Payment Screenshot (Optional)
                </Label>
                <div className={`mt-2 border-2 border-dashed rounded-lg p-8 text-center ${
                  isDark 
                    ? 'border-gray-600 bg-[#0a192f]' 
                    : 'border-gray-300 bg-gray-50'
                }`}>
                  <Upload className={`h-8 w-8 mx-auto mb-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <p className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Upload payment screenshot for faster processing
                  </p>
                  <p className={`text-xs mt-1 ${
                    isDark ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                className="w-full bg-[#8BC34A] text-white hover:bg-[#7CB342] h-12"
              >
                Submit Deposit Request
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Bank Card Tab Content */}
        {activeTab === 'bank' && (
          <Card className={`${
            isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <CardContent className="p-6 text-center">
              <div className="py-12">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <svg className={`w-8 h-8 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className={`text-lg font-medium mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Bank Card Deposits
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  Bank card deposit functionality is coming soon
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  For now, please use digital currency deposits for instant processing
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Deposit Records */}
        <Card className={`${
          isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <CardContent className="p-4">
            <Button
              variant="ghost"
              onClick={() => setShowRecords(!showRecords)}
              className={`w-full justify-between ${
                isDark ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span className="font-medium">Deposit History</span>
              {showRecords ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            
            {showRecords && (
              <div className="mt-4 space-y-4">
                {depositRecords.map((record) => (
                  <div
                    key={record.id}
                    className={`p-4 rounded-lg border ${
                      isDark ? 'border-gray-600 bg-[#0a192f]' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                          Amount:
                        </span>
                        <span className={`ml-2 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {record.rechargeAmount} {record.unit}
                        </span>
                      </div>
                      <div>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                          Type:
                        </span>
                        <span className={`ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {record.type}
                        </span>
                      </div>
                      <div>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                          Status:
                        </span>
                        <span className={`ml-2 font-medium ${
                          record.status === 'Complete' 
                            ? 'text-green-500' 
                            : record.status === 'Invalid' 
                              ? 'text-red-500' 
                              : 'text-yellow-500'
                        }`}>
                          {record.status}
                        </span>
                      </div>
                      <div>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                          Date:
                        </span>
                        <span className={`ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {record.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional spacing for mobile navigation */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default DepositPage;