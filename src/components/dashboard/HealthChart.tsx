"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

export function HealthChart() {
  // Generate mock path data for a small sparkline
  const points = useMemo(() => [
    { x: 0, y: 40 },
    { x: 20, y: 35 },
    { x: 40, y: 45 },
    { x: 60, y: 30 },
    { x: 80, y: 25 },
    { x: 100, y: 35 },
    { x: 120, y: 20 },
    { x: 140, y: 25 },
    { x: 160, y: 15 },
    { x: 180, y: 10 },
    { x: 200, y: 5 },
  ], []);

  const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;

  return (
    <div className="w-full h-12 flex items-end overflow-hidden group">
      <svg viewBox="0 0 200 50" className="w-full h-full preserve-3d overflow-visible">
        <defs>
          <linearGradient id="chart-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(45, 90, 39)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="rgb(45, 90, 39)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Animated Background Area */}
        <motion.path 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d={`${pathData} L 200,50 L 0,50 Z`} 
          fill="url(#chart-gradient)" 
        />
        
        {/* Animated Line */}
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d={pathData} 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          className="text-primary-accent"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Interactive Point Glow */}
        <motion.circle 
          cx="200" 
          cy="5" 
          r="4" 
          className="fill-primary-accent shadow-soft-glow"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </svg>
    </div>
  );
}

