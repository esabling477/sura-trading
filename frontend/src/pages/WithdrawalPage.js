import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from '../hooks/use-toast';

const WithdrawalPage = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('digital');
  const [selectedCurrency, setSelectedCurrency] = useState('USDT-TRC20');
  const [withdrawalData, setWithdrawalData] = useState({
    address: '',
    amount: '',
    remarks: '',
    name: ''
  });
  const [showRecords, setShowRecords] = useState(false);

  // Mock balance
  const balance = 4060200;
  const handlingFee = 0;
  const expectedAmount = withdrawalData.amount ? parseFloat(withdrawalData.amount) - handlingFee : 0;

  // Mock withdrawal records
  const withdrawalRecords = [
    {
      id: 1,
      amount: 100.00,
      receipts: 100.00,
      unit: 'USDT',
      handlingFee: 0.00,
      status: 'Pending review',
      date: '2025-08-07 23:02:48',
      address: 'TDiNOAEU3PRRXfeBcAWPWesrFbto4BUQx'
    },
    {
      id: 2,
      amount: 500.00,
      receipts: 500.00,
      unit: 'USDT',
      handlingFee: 0.00,
      status: 'Complete',
      date: '2025-08-06 15:30:12',
      address: 'TKjH8sVx4tPeR3nMcBaWxE9rFgHu7YVqL'
    }
  ];

  const handleInputChange = (field, value) => {
    setWithdrawalData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!withdrawalData.address) {
      toast({
        title: "Error",
        description: "Please enter withdrawal address",
        variant: "destructive"
      });
      return;
    }
    
    if (!withdrawalData.amount || parseFloat(withdrawalData.amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    if (parseFloat(withdrawalData.amount) > balance) {
      toast({
        title: "Error",
        description: "Insufficient balance",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Withdrawal Request Submitted",
      description: `Withdrawing ${withdrawalData.amount} ${selectedCurrency.split('-')[0]}`,
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
              {/* Currency Selection */}
              <div>
                <Label className={`${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Currency
                </Label>
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
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

              {/* Address for coin withdrawals */}
              <div>
                <Label className={`${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Address for coin withdrawals
                </Label>
                <Select onValueChange={(value) => handleInputChange('address', value)}>
                  <SelectTrigger className={`mt-2 ${
                    isDark 
                      ? 'bg-[#0a192f] border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}>
                    <SelectValue placeholder="Please select an address to call" />
                  </SelectTrigger>
                  <SelectContent className={
                    isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
                  }>
                    <SelectItem value="TDiNOAEU3PRRXfeBcAWPWesrFbto4BUQx">TDiNOAEU3PRRXfeBcAWPWesrFbto4BUQx</SelectItem>
                    <SelectItem value="TKjH8sVx4tPeR3nMcBaWxE9rFgHu7YVqL">TKjH8sVx4tPeR3nMcBaWxE9rFgHu7YVqL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Amount */}
              <div>
                <Label className={`${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Amount
                </Label>
                <Input
                  type="number"
                  placeholder="Amount"
                  value={withdrawalData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className={`mt-2 ${
                    isDark 
                      ? 'bg-[#0a192f] border-gray-600 text-white placeholder:text-gray-500' 
                      : 'bg-white border-gray-300 placeholder:text-gray-400'
                  }`}
                />
              </div>

              {/* Remarks Currency */}
              <div>
                <Label className={`${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Remarks Currency
                </Label>
                <Textarea
                  placeholder="Remarks Currency Name"
                  value={withdrawalData.remarks}
                  onChange={(e) => handleInputChange('remarks', e.target.value)}
                  className={`mt-2 ${
                    isDark 
                      ? 'bg-[#0a192f] border-gray-600 text-white placeholder:text-gray-500' 
                      : 'bg-white border-gray-300 placeholder:text-gray-400'
                  }`}
                  rows={3}
                />
              </div>

              {/* Name */}
              <div>
                <Label className={`${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Name
                </Label>
                <Input
                  type="text"
                  value={withdrawalData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`mt-2 ${
                    isDark 
                      ? 'bg-[#0a192f] border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                />
              </div>

              {/* Handling Fee */}
              <div className="flex justify-between items-center">
                <span className={`${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Handling fee
                </span>
                <span className={`${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {handlingFee}
                </span>
              </div>

              {/* Expected Amount */}
              <div className="flex justify-between items-center">
                <span className={`${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  It is expected that
                </span>
                <span className={`${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {expectedAmount} {selectedCurrency.split('-')[0]}
                </span>
              </div>

              {/* Balance */}
              <div className="flex justify-between items-center">
                <span className={`${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Balance
                </span>
                <span className={`${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {balance.toLocaleString()} USD
                </span>
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
                Bank card withdrawal functionality coming soon
              </p>
            </CardContent>
          </Card>
        )}

        {/* Withdrawal Records */}
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
              <span className="font-medium">Coin withdrawal record</span>
              {showRecords ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            
            {showRecords && (
              <div className="mt-4 space-y-4">
                {withdrawalRecords.map((record) => (
                  <div
                    key={record.id}
                    className={`p-4 rounded-lg border ${
                      isDark ? 'border-gray-600 bg-[#0a192f]' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            Amount:
                          </span>
                          <span className={`ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {record.amount}
                          </span>
                        </div>
                        <div>
                          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            Number of Receipts:
                          </span>
                          <span className={`ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {record.receipts}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
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
                            Handling fee:
                          </span>
                          <span className={`ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {record.handlingFee}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            Status:
                          </span>
                          <span className={`ml-2 ${
                            record.status === 'Complete' 
                              ? 'text-green-500' 
                              : record.status === 'Pending review' 
                                ? 'text-yellow-500' 
                                : 'text-red-500'
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
                      
                      <div>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                          Address for coin withdrawals:
                        </span>
                        <div className={`mt-1 p-2 rounded ${
                          isDark ? 'bg-[#112240] text-white' : 'bg-gray-100 text-gray-900'
                        } font-mono text-xs break-all`}>
                          {record.address}
                        </div>
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

export default WithdrawalPage;