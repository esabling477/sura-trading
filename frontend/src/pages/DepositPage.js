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

  // Mock wallet address
  const walletAddress = 'TT7XqWx6jvdAG9ucwmLjyT8Eo4rLLg1Hzv';

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
    navigator.clipboard.writeText(walletAddress);
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
                    <SelectItem value="USDT-TRC20">USDT-TRC20</SelectItem>
                    <SelectItem value="USDT-ERC20">USDT-ERC20</SelectItem>
                    <SelectItem value="BTC">BTC</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Wallet Address */}
              <div>
                <Label className={`${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Wallet Address
                </Label>
                
                {/* QR Code Placeholder */}
                <div className="flex justify-center my-4">
                  <div className={`w-32 h-32 ${
                    isDark ? 'bg-white' : 'bg-gray-100'
                  } rounded-lg flex items-center justify-center`}>
                    <div className="w-28 h-28 bg-black rounded-sm flex items-center justify-center">
                      <div className="grid grid-cols-8 gap-0.5">
                        {Array.from({ length: 64 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-1 ${
                              Math.random() > 0.5 ? 'bg-white' : 'bg-black'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address with Copy Button */}
                <div className="flex items-center space-x-2">
                  <Input
                    value={walletAddress}
                    readOnly
                    className={`flex-1 ${
                      isDark 
                        ? 'bg-[#0a192f] border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyAddress}
                    className={
                      isDark 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
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
                  placeholder="Please enter the number of coins to be charged"
                  value={coinAmount}
                  onChange={(e) => setCoinAmount(e.target.value)}
                  className={`mt-2 ${
                    isDark 
                      ? 'bg-[#0a192f] border-gray-600 text-white placeholder:text-gray-500' 
                      : 'bg-white border-gray-300 placeholder:text-gray-400'
                  }`}
                />
              </div>

              {/* Upload Certificate */}
              <div>
                <Label className={`${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Uploading Certificate
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
                    Upload payment screenshot
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                className="w-full bg-[#8BC34A] text-white hover:bg-[#7CB342] h-12"
              >
                Submit
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
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Bank card deposit functionality coming soon
              </p>
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
              <span className="font-medium">Deposit record</span>
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
                          Recharge amount:
                        </span>
                        <span className={`ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {record.rechargeAmount}
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
                          Unit:
                        </span>
                        <span className={`ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {record.unit}
                        </span>
                      </div>
                      <div>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                          Status:
                        </span>
                        <span className={`ml-2 ${
                          record.status === 'Complete' 
                            ? 'text-green-500' 
                            : record.status === 'Invalid' 
                              ? 'text-red-500' 
                              : 'text-yellow-500'
                        }`}>
                          {record.status}
                        </span>
                      </div>
                      <div className="col-span-2">
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