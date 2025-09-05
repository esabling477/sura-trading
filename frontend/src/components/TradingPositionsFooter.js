import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { 
  X,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const TradingPositionsFooter = ({ isVisible, onClose }) => {
  const { isDark } = useTheme();
  
  // Mock trading positions data
  const mockPositions = [
    {
      id: '#794507',
      pair: 'XAUUSD',
      direction: 'Buy',
      lots: 1,
      lowerUnitPrice: 2122.4122,
      currentPrice: 2311.83,
      setProfit: 0,
      setLoss: 0,
      handlingFee: 0.01,
      margin: 212.2412,
      profit: 611.222,
      openTime: '2025-09-04 15:56:32',
      operation: 'TP/SL Close position'
    }
  ];

  const mockPendingOrders = [];
  const mockHistory = [];

  if (!isVisible) return null;

  return (
    <div className={`${
      isDark ? 'bg-[#0a192f] border-gray-700' : 'bg-white border-gray-200'
    } border-t h-80`}>
      <div className="h-full flex flex-col">
        <Tabs defaultValue="positions" className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-4 pb-0">
            <TabsList className={`${
              isDark ? 'bg-[#112240]' : 'bg-gray-100'
            }`}>
              <TabsTrigger 
                value="positions"
                className={`${
                  isDark 
                    ? 'data-[state=active]:bg-[#64ffda] data-[state=active]:text-[#0a192f] text-gray-300' 
                    : 'data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700'
                }`}
              >
                Position holding
              </TabsTrigger>
              <TabsTrigger 
                value="pending"
                className={`${
                  isDark 
                    ? 'data-[state=active]:bg-[#64ffda] data-[state=active]:text-[#0a192f] text-gray-300' 
                    : 'data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700'
                }`}
              >
                Pending Orders
              </TabsTrigger>
              <TabsTrigger 
                value="history"
                className={`${
                  isDark 
                    ? 'data-[state=active]:bg-[#64ffda] data-[state=active]:text-[#0a192f] text-gray-300' 
                    : 'data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700'
                }`}
              >
                History
              </TabsTrigger>
            </TabsList>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 px-4 pb-4">
            <TabsContent value="positions" className="m-0 h-full">
              <ScrollArea className="h-full">
                {mockPositions.length > 0 ? (
                  <div className="space-y-2">
                    {/* Header Row - Desktop */}
                    <div className="hidden lg:grid grid-cols-12 gap-2 py-2 px-3 text-xs font-medium border-b border-gray-600">
                      <div className="col-span-1 text-gray-400">Transaction pairs</div>
                      <div className="col-span-1 text-gray-400">Reservation number</div>
                      <div className="col-span-1 text-gray-400">direction</div>
                      <div className="col-span-1 text-gray-400">Lots</div>
                      <div className="col-span-1 text-gray-400">Lower unit price</div>
                      <div className="col-span-1 text-gray-400">Current price</div>
                      <div className="col-span-1 text-gray-400">Set Profit</div>
                      <div className="col-span-1 text-gray-400">Set Loss</div>
                      <div className="col-span-1 text-gray-400">Handling fee</div>
                      <div className="col-span-1 text-gray-400">Margin</div>
                      <div className="col-span-1 text-gray-400">profit</div>
                      <div className="col-span-1 text-gray-400">Open time</div>
                    </div>

                    {/* Position Rows */}
                    {mockPositions.map((position) => (
                      <Card key={position.id} className={`${
                        isDark ? 'bg-[#112240] border-gray-700' : 'bg-gray-50 border-gray-200'
                      }`}>
                        <CardContent className="p-3">
                          {/* Desktop Layout */}
                          <div className="hidden lg:grid grid-cols-12 gap-2 items-center text-sm">
                            <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {position.pair}
                            </div>
                            <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {position.id}
                            </div>
                            <div className={`flex items-center space-x-1 ${
                              position.direction === 'Buy' ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {position.direction === 'Buy' ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : (
                                <TrendingDown className="h-3 w-3" />
                              )}
                              <span>{position.direction}</span>
                            </div>
                            <div className={isDark ? 'text-white' : 'text-gray-900'}>
                              {position.lots}
                            </div>
                            <div className={isDark ? 'text-white' : 'text-gray-900'}>
                              {position.lowerUnitPrice}
                            </div>
                            <div className={isDark ? 'text-white' : 'text-gray-900'}>
                              {position.currentPrice}
                            </div>
                            <div className={isDark ? 'text-white' : 'text-gray-900'}>
                              {position.setProfit}
                            </div>
                            <div className={isDark ? 'text-white' : 'text-gray-900'}>
                              {position.setLoss}
                            </div>
                            <div className={isDark ? 'text-white' : 'text-gray-900'}>
                              {position.handlingFee}
                            </div>
                            <div className={isDark ? 'text-white' : 'text-gray-900'}>
                              {position.margin}
                            </div>
                            <div className="text-red-400 font-medium">
                              {position.profit}
                            </div>
                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {position.openTime}
                            </div>
                          </div>

                          {/* Mobile Layout */}
                          <div className="lg:hidden space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {position.pair}
                                </span>
                                <div className={`flex items-center space-x-1 ${
                                  position.direction === 'Buy' ? 'text-green-400' : 'text-red-400'
                                }`}>
                                  {position.direction === 'Buy' ? (
                                    <TrendingUp className="h-3 w-3" />
                                  ) : (
                                    <TrendingDown className="h-3 w-3" />
                                  )}
                                  <span className="text-sm">{position.direction}</span>
                                </div>
                              </div>
                              <div className="text-red-400 font-medium">
                                {position.profit}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Lots: </span>
                                <span className={isDark ? 'text-white' : 'text-gray-900'}>{position.lots}</span>
                              </div>
                              <div>
                                <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Current: </span>
                                <span className={isDark ? 'text-white' : 'text-gray-900'}>{position.currentPrice}</span>
                              </div>
                              <div>
                                <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Open: </span>
                                <span className={isDark ? 'text-white' : 'text-gray-900'}>{position.lowerUnitPrice}</span>
                              </div>
                              <div>
                                <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Margin: </span>
                                <span className={isDark ? 'text-white' : 'text-gray-900'}>{position.margin}</span>
                              </div>
                            </div>
                            
                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {position.id} • {position.openTime}
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="flex-1 text-xs">
                                TP/SL
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 text-xs">
                                Close
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      No open positions
                    </p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="pending" className="m-0 h-full">
              <div className="flex items-center justify-center h-full">
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  No pending orders
                </p>
              </div>
            </TabsContent>

            <TabsContent value="history" className="m-0 h-full">
              <div className="flex items-center justify-center h-full">
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  No trading history
                </p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default TradingPositionsFooter;