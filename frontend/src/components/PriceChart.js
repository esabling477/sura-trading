import React, { useEffect, useRef, useState } from 'react';
import { generateMockChartData } from '../data/mockData';

const PriceChart = ({ coinId }) => {
  const canvasRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    // Generate mock chart data for the selected coin
    const data = generateMockChartData(coinId?.toUpperCase() || 'BTC', 30);
    setChartData(data);
  }, [coinId]);

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
    const padding = 40;
    const chartWidth = rect.width - padding * 2;
    const chartHeight = rect.height - padding * 2;

    // Find min and max values
    const prices = chartData.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    // Draw grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i * chartHeight / 5);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(rect.width - padding, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i <= 6; i++) {
      const x = padding + (i * chartWidth / 6);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, rect.height - padding);
      ctx.stroke();
    }

    // Draw price line
    ctx.strokeStyle = '#64ffda';
    ctx.lineWidth = 2;
    ctx.beginPath();

    chartData.forEach((point, index) => {
      const x = padding + (index / (chartData.length - 1)) * chartWidth;
      const y = rect.height - padding - ((point.price - minPrice) / priceRange) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw area under the line
    ctx.fillStyle = 'rgba(100, 255, 218, 0.1)';
    ctx.beginPath();
    
    chartData.forEach((point, index) => {
      const x = padding + (index / (chartData.length - 1)) * chartWidth;
      const y = rect.height - padding - ((point.price - minPrice) / priceRange) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.lineTo(rect.width - padding, rect.height - padding);
    ctx.lineTo(padding, rect.height - padding);
    ctx.closePath();
    ctx.fill();

    // Draw price labels
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'right';
    
    for (let i = 0; i <= 5; i++) {
      const price = maxPrice - (i * priceRange / 5);
      const y = padding + (i * chartHeight / 5);
      ctx.fillText(`$${price.toFixed(2)}`, padding - 10, y + 4);
    }

    // Draw date labels
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
          rect.height - padding + 20
        );
      }
    }

    // Draw hovered point
    if (hoveredPoint) {
      const x = padding + (hoveredPoint.index / (chartData.length - 1)) * chartWidth;
      const y = rect.height - padding - ((hoveredPoint.price - minPrice) / priceRange) * chartHeight;
      
      // Draw vertical line
      ctx.strokeStyle = '#64ffda';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, rect.height - padding);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw point
      ctx.fillStyle = '#64ffda';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw tooltip
      const tooltipWidth = 120;
      const tooltipHeight = 40;
      const tooltipX = x > rect.width / 2 ? x - tooltipWidth - 10 : x + 10;
      const tooltipY = y - tooltipHeight / 2;
      
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);
      
      ctx.strokeStyle = '#64ffda';
      ctx.lineWidth = 1;
      ctx.strokeRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`$${hoveredPoint.price.toFixed(2)}`, tooltipX + 8, tooltipY + 16);
      ctx.fillText(new Date(hoveredPoint.date).toLocaleDateString(), tooltipX + 8, tooltipY + 32);
    }

  }, [chartData, hoveredPoint]);

  const handleMouseMove = (event) => {
    if (!chartData.length) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    
    const padding = 40;
    const chartWidth = rect.width - padding * 2;
    
    if (x >= padding && x <= rect.width - padding) {
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
    <div className="relative">
      <canvas
        ref={canvasRef}
        width="800"
        height="400"
        className="w-full h-80 cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ width: '100%', height: '320px' }}
      />
      <div className="absolute top-4 left-4 text-sm text-gray-400">
        {chartData.length > 0 && (
          <div>
            Price range: ${Math.min(...chartData.map(d => d.price)).toFixed(2)} - ${Math.max(...chartData.map(d => d.price)).toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceChart;