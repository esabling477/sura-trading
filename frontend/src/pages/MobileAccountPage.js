import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';
import { formatPrice } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

const MobileAccountPage = () => {
  const { isDark } = useTheme();

  // Mock account data
  const totalAccountAssets = 12533647.73;
  const accounts = [
    {
      name: 'Funding Account',
      balance: 4060200,
      freeze: 15100
    },
    {
      name: 'Future account',
      balance: 285879.476,
      freeze: 0
    },
    {
      name: 'Contract account',
      balance: 8172468.257,
      freeze: 0
    }
  ];

  return (
    <div className={`min-h-screen ${
      isDark ? 'bg-[#0a192f]' : 'bg-gray-50'
    }`}>
      <div className="p-4 space-y-6">
        {/* Total Account Asset Conversion */}
        <Card className={`${
          isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <CardContent className="p-6 text-center">
            <h2 className={`text-sm mb-2 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Total account asset conversion
            </h2>
            <div className="text-4xl font-bold text-[#8BC34A] mb-4">
              {totalAccountAssets.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Account Cards */}
        <div className="space-y-4">
          {accounts.map((account, index) => (
            <Card key={index} className={`${
              isDark ? 'bg-[#112240] border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className={`font-medium mb-3 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {account.name}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className={`text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Balance
                        </div>
                        <div className={`font-medium ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {account.balance.toLocaleString()}
                        </div>
                      </div>
                      
                      <div>
                        <div className={`text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Freeze
                        </div>
                        <div className={`font-medium ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {account.freeze.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={isDark ? 'text-gray-400' : 'text-gray-600'}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional spacing for mobile navigation */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default MobileAccountPage;