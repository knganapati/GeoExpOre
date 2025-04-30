import { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

interface ForestCoverChartProps {
  privatePercentage: number;
  barrenPercentage: number;
  forestPercentage: number;
  className?: string;
}

const ForestCoverChart = ({ 
  privatePercentage, 
  barrenPercentage, 
  forestPercentage,
  className 
}: ForestCoverChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ensure high resolution for retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Prepare data
    const data = [
      { label: 'Private Land', value: privatePercentage, color: '#4F86E4' },
      { label: 'Barren Land', value: barrenPercentage, color: '#C3A35E' },
      { label: 'Forest RF/PF', value: forestPercentage, color: '#47854F' },
    ];

    // Sort data descending to make the chart look better
    data.sort((a, b) => b.value - a.value);

    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // Draw pie chart
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    let startAngle = 0;
    
    // Draw slices
    data.forEach((item) => {
      // Calculate angle
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      
      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      
      ctx.fillStyle = item.color;
      ctx.fill();
      
      // Draw slice border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Calculate label position
      const labelAngle = startAngle + (sliceAngle / 2);
      const labelX = centerX + (radius * 0.7 * Math.cos(labelAngle));
      const labelY = centerY + (radius * 0.7 * Math.sin(labelAngle));
      
      // Draw percentage if slice is big enough
      if (item.value > 5) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${Math.round(item.value)}%`, labelX, labelY);
      }
      
      // Update start angle for next slice
      startAngle += sliceAngle;
    });

    // Draw legend
    const legendX = 10;
    let legendY = rect.height - 10 - (data.length * 25);
    
    data.forEach((item) => {
      // Draw legend box
      ctx.fillStyle = item.color;
      ctx.fillRect(legendX, legendY, 16, 16);
      
      // Draw legend text
      ctx.fillStyle = '#333333';
      ctx.font = '14px Inter';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${item.label} (${item.value.toFixed(1)}%)`, legendX + 25, legendY + 8);
      
      legendY += 25;
    });
  }, [privatePercentage, barrenPercentage, forestPercentage]);

  return (
    <div className={cn('w-full max-w-md h-64', className)}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
        style={{ maxHeight: '250px' }}
      />
    </div>
  );
};

export default ForestCoverChart;