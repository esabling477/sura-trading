import React, { useEffect, useRef, useState } from 'react';
import { generateMockChartData } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

const TradingChart = ({ symbol, data }) => {
  const canvasRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    // Generate mock chart data for the selected symbol
    const mockData = generateMockChartData(symbol, 30);
    setChartData(mockData);
  }, [symbol]);

  useEffect(() => {
    if (!chartData.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size for high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Chart dimensions
    const padding = 60;
    const chartWidth = rect.width - padding * 2;
    const chartHeight = rect.height - padding * 2;

    // Find min and max values
    const prices = chartData.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    // Theme-based colors
    const gridColor = isDark ? '#1e293b' : '#e5e7eb';
    const lineColor = isDark ? '#64ffda' : '#2563eb';
    const areaColor = isDark ? 'rgba(100, 255, 218, 0.1)' : 'rgba(37, 99, 235, 0.1)';
    const textColor = isDark ? '#64748b' : '#6b7280';
    const backgroundColor = isDark ? '#0a192f' : '#ffffff';

    // Fill background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 8; i++) {
      const y = padding + (i * chartHeight / 8);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(rect.width - padding, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i * chartWidth / 10);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, rect.height - padding);
      ctx.stroke();
    }

    // Draw candlestick-style chart
    const candleWidth = chartWidth / chartData.length * 0.6;
    
    chartData.forEach((point, index) => {
      const x = padding + (index / (chartData.length - 1)) * chartWidth;
      const openY = rect.height - padding - ((point.open - minPrice) / priceRange) * chartHeight;
      const closeY = rect.height - padding - ((point.close - minPrice) / priceRange) * chartHeight;
      const highY = rect.height - padding - ((point.high - minPrice) / priceRange) * chartHeight;
      const lowY = rect.height - padding - ((point.low - minPrice) / priceRange) * chartHeight;
      
      const isGreen = point.close >= point.open;
      
      // Draw the wick (high-low line)
      ctx.strokeStyle = isGreen ? '#10b981' : '#ef4444';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();
      
      // Draw the body (open-close rectangle)
      ctx.fillStyle = isGreen ? '#10b981' : '#ef4444';
      const bodyHeight = Math.abs(closeY - openY);
      const bodyY = Math.min(openY, closeY);
      
      if (bodyHeight < 1) {
        // Draw a line for doji candles
        ctx.strokeStyle = isGreen ? '#10b981' : '#ef4444';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - candleWidth/2, bodyY);
        ctx.lineTo(x + candleWidth/2, bodyY);
        ctx.stroke();
      } else {
        ctx.fillRect(x - candleWidth/2, bodyY, candleWidth, bodyHeight);
      }
    });

    // Draw price labels on the right
    ctx.fillStyle = textColor;
    ctx.font = '11px Inter, system-ui, sans-serif';
    ctx.textAlign = 'left';
    
    for (let i = 0; i <= 8; i++) {
      const price = maxPrice - (i * priceRange / 8);
      const y = padding + (i * chartHeight / 8);
      const priceText = symbol.includes('/') 
        ? price.toFixed(4) 
        : price.toFixed(2);
      ctx.fillText(priceText, rect.width - padding + 5, y + 4);
    }

    // Draw time labels on the bottom
    ctx.textAlign = 'center';
    const step = Math.floor(chartData.length / 6);
    for (let i = 0; i <= 6; i++) {
      const dataIndex = Math.min(i * step, chartData.length - 1);
      const point = chartData[dataIndex];
      if (point) {
        const x = padding + (dataIndex / (chartData.length - 1)) * chartWidth;
        const date = new Date(point.date);
        ctx.fillText(
          date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          x,
          rect.height - padding + 15
        );
      }
    }

    // Draw hovered point
    if (hoveredPoint) {
      const x = padding + (hoveredPoint.index / (chartData.length - 1)) * chartWidth;
      const y = rect.height - padding - ((hoveredPoint.price - minPrice) / priceRange) * chartHeight;
      
      // Draw crosshair
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      
      // Vertical line
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, rect.height - padding);
      ctx.stroke();
      
      // Horizontal line
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(rect.width - padding, y);
      ctx.stroke();
      
      ctx.setLineDash([]);
      
      // Draw tooltip
      const tooltipWidth = 140;
      const tooltipHeight = 60;
      const tooltipX = x > rect.width / 2 ? x - tooltipWidth - 10 : x + 10;
      const tooltipY = y - tooltipHeight / 2;
      
      ctx.fillStyle = isDark ? 'rgba(17, 34, 64, 0.95)' : 'rgba(255, 255, 255, 0.95)';
      ctx.strokeStyle = isDark ? '#64ffda' : '#2563eb';
      ctx.lineWidth = 1;
      
      ctx.fillRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);
      ctx.strokeRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);
      
      ctx.fillStyle = isDark ? '#ffffff' : '#000000';
      ctx.font = '11px Inter, system-ui, sans-serif';
      ctx.textAlign = 'left';
      
      const priceText = symbol.includes('/') 
        ? hoveredPoint.price.toFixed(4) 
        : hoveredPoint.price.toFixed(2);
      
      ctx.fillText(`Price: ${priceText}`, tooltipX + 8, tooltipY + 16);
      ctx.fillText(`Date: ${new Date(hoveredPoint.date).toLocaleDateString()}`, tooltipX + 8, tooltipY + 32);
      ctx.fillText(`Volume: ${hoveredPoint.volume?.toLocaleString() || 'N/A'}`, tooltipX + 8, tooltipY + 48);
    }

  }, [chartData, hoveredPoint, isDark, symbol]);

  const handleMouseMove = (event) => {
    if (!chartData.length) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const padding = 60;
    const chartWidth = rect.width - padding * 2;
    const chartHeight = rect.height - padding * 2;
    
    if (x >= padding && x <= rect.width - padding && y >= padding && y <= rect.height - padding) {
      const index = Math.round(((x - padding) / chartWidth) * (chartData.length - 1));
      const point = chartData[index];
      if (point) {
        setHoveredPoint({ ...point, index });
      }
    } else {
      setHoveredPoint(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  return (
    <div className="relative h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default TradingChart;