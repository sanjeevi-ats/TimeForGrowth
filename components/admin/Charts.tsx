"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface LineChartProps {
  data: { date: string; count: number }[];
  label?: string;
}

export function LineChart({ data, label = "Clicks" }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: data.map((d) => d.date),
        datasets: [
          {
            label,
            data: data.map((d) => d.count),
            borderColor: "#000000",
            backgroundColor: "rgba(0,0,0,0.04)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
            pointBackgroundColor: "#000",
            pointRadius: 3,
            pointHoverRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: "easeOutQuart",
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#000",
            titleColor: "#fff",
            bodyColor: "#fff",
            padding: 8,
          },
        },
        scales: {
          x: {
            grid: { color: "#F0F0F0" },
            ticks: { color: "#666", font: { size: 11 } },
          },
          y: {
            grid: { color: "#F0F0F0" },
            ticks: { color: "#666", font: { size: 11 } },
            beginAtZero: true,
          },
        },
      },
    });

    return () => { chartRef.current?.destroy(); };
  }, [data, label]);

  return <canvas ref={canvasRef} />;
}

interface HBarChartProps {
  data: { label: string; count: number }[];
}

export function HBarChart({ data }: HBarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: data.map((d) => d.label),
        datasets: [
          {
            data: data.map((d) => d.count),
            backgroundColor: "#000000",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        animation: { duration: 800, easing: "easeOutQuart" },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#000",
            titleColor: "#fff",
            bodyColor: "#fff",
          },
        },
        scales: {
          x: { grid: { color: "#F0F0F0" }, ticks: { color: "#666", font: { size: 11 } }, beginAtZero: true },
          y: { grid: { display: false }, ticks: { color: "#333", font: { size: 12 } } },
        },
      },
    });

    return () => { chartRef.current?.destroy(); };
  }, [data]);

  return <canvas ref={canvasRef} />;
}
