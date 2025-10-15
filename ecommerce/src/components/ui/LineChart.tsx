import { useEffect, useRef } from "react";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension?: number;
  }[];
}

interface LineChartProps {
  data: ChartData;
  height?: number;
}

export const LineChart = ({ data, height = 300 }: LineChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const devicePixelRatio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    
    ctx.scale(devicePixelRatio, devicePixelRatio);
    canvas.style.width = rect.width + "px";
    canvas.style.height = height + "px";

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, height);

    // Set up chart dimensions
    const padding = 60;
    const chartWidth = rect.width - 2 * padding;
    const chartHeight = height - 2 * padding;

    const maxValue = Math.max(...data.datasets[0].data);
    const minValue = Math.min(...data.datasets[0].data);
    const range = maxValue - minValue || 1;

    // Draw grid lines
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + chartWidth, y);
      ctx.stroke();
    }

    // Vertical grid lines
    const stepX = chartWidth / (data.labels.length - 1);
    for (let i = 0; i < data.labels.length; i++) {
      const x = padding + stepX * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, padding + chartHeight);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + chartHeight);
    ctx.lineTo(padding + chartWidth, padding + chartHeight);
    ctx.stroke();

    // Draw data line
    const dataset = data.datasets[0];
    ctx.strokeStyle = dataset.borderColor;
    ctx.fillStyle = dataset.backgroundColor;
    ctx.lineWidth = 3;

    ctx.beginPath();
    dataset.data.forEach((value, index) => {
      const x = padding + stepX * index;
      const y = padding + chartHeight - ((value - minValue) / range) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = dataset.borderColor;
    dataset.data.forEach((value, index) => {
      const x = padding + stepX * index;
      const y = padding + chartHeight - ((value - minValue) / range) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw labels
    ctx.fillStyle = "#374151";
    ctx.font = "12px system-ui";
    ctx.textAlign = "center";

    // X-axis labels
    data.labels.forEach((label, index) => {
      const x = padding + stepX * index;
      ctx.fillText(label, x, padding + chartHeight + 20);
    });

    // Y-axis labels
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const value = minValue + (range / 5) * (5 - i);
      const y = padding + (chartHeight / 5) * i + 4;
      ctx.fillText(
        value >= 1000 
          ? `₹${(value / 1000).toFixed(0)}k` 
          : `₹${value.toFixed(0)}`,
        padding - 10,
        y
      );
    }

  }, [data, height]);

  return (
    <div className="w-full">
      <canvas
        ref={canvasRef}
        className="w-full border rounded-lg bg-white"
        style={{ height: `${height}px` }}
      />
    </div>
  );
};