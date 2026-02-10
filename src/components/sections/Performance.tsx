import React from 'react';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import GlassCard from '../ui/GlassCard';
import GradientText from '../ui/GradientText';
import type { ChartDataPoint } from '../../data/mockData';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Performance: React.FC = () => {
  const { performance } = useData();
  const reveal = useScrollReveal();
  
  return (
    <section id="performance" className="py-12 lg:py-16 bg-background-secondary relative overflow-hidden">
      {/* Background Elements - Subtle accent color */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={reveal} className="max-w-3xl mx-auto text-center mb-10 scroll-reveal">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
            Performance
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-poppins">
            Transparent <GradientText>Track Record</GradientText>
          </h2>
          <p className="text-lg text-foreground-secondary">
            Consistent, risk-adjusted returns built on disciplined investment principles.
          </p>
        </div>

        {/* Performance Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <GlassCard className="p-6" hover>
            <div className="flex items-center justify-between mb-2">
              <span className="text-foreground-muted text-sm">YTD Return</span>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-poppins">{performance.summary.ytdReturn}</p>
          </GlassCard>
          <GlassCard className="p-6" hover>
            <div className="flex items-center justify-between mb-2">
              <span className="text-foreground-muted text-sm">Avg Annual Return</span>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-poppins">{performance.summary.avgAnnualReturn}</p>
          </GlassCard>
          <GlassCard className="p-6" hover>
            <TooltipProvider>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-foreground-muted text-sm">Sharpe Ratio</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-foreground-muted" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm">Risk-adjusted return measure. Higher is better. Above 1.0 is good, above 2.0 is excellent.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </TooltipProvider>
            <p className="text-3xl font-bold text-foreground font-poppins">{performance.summary.sharpeRatio}</p>
          </GlassCard>
          <GlassCard className="p-6" hover>
            <TooltipProvider>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-foreground-muted text-sm">Max Drawdown</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-foreground-muted" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm">Largest peak-to-trough decline. Lower (closer to 0%) indicates better downside protection.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <TrendingDown className="w-5 h-5 text-accent" />
              </div>
            </TooltipProvider>
            <p className="text-3xl font-bold text-accent font-poppins">{performance.summary.maxDrawdown}</p>
          </GlassCard>
        </div>

        {/* Charts Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Performance Chart */}
          <GlassCard className="lg:col-span-2 p-6" hover>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg text-foreground font-poppins">Portfolio vs Benchmark</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded-full" />
                  <span className="text-foreground-muted">Portfolio</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-foreground-muted rounded-full" />
                  <span className="text-foreground-muted">S&P 500</span>
                </div>
              </div>
            </div>
            
            {/* Simple Chart Visualization */}
            <div className="relative h-64">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-foreground-muted">
                <span>120</span>
                <span>110</span>
                <span>100</span>
                <span>90</span>
              </div>
              
              {/* Chart Area */}
              <div className="ml-14 h-full relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="border-b border-border" />
                  ))}
                </div>
                
                {/* Bars */}
                <div className="absolute bottom-8 left-0 right-0 flex items-end justify-between gap-2 h-48">
                  {performance.chartData.map((data: ChartDataPoint, index: number) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex gap-1 justify-center">
                        <div
                          className="w-2 bg-accent rounded-t"
                          style={{ height: `${(data.portfolio - 90) * 5}px` }}
                        />
                        <div
                          className="w-2 bg-foreground-muted rounded-t"
                          style={{ height: `${(data.benchmark - 90) * 5}px` }}
                        />
                      </div>
                      <span className="text-xs text-foreground-muted mt-2">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Allocation Chart */}
          <GlassCard className="p-6" hover>
            <h3 className="font-semibold text-lg mb-6 text-foreground font-poppins">Asset Allocation</h3>
            
            {/* Donut Chart */}
            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {performance.allocation.reduce((acc: { elements: React.ReactNode[]; offset: number }, item, index) => {
                  const offset = acc.offset;
                  const dashArray = item.percentage;
                  acc.elements.push(
                    <circle
                      key={index}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={item.color}
                      strokeWidth="20"
                      strokeDasharray={`${dashArray} ${100 - dashArray}`}
                      strokeDashoffset={-offset}
                      className="transition-all duration-500"
                    />
                  );
                  acc.offset += dashArray;
                  return acc;
                }, { elements: [], offset: 0 }).elements}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground font-poppins">100%</p>
                  <p className="text-xs text-foreground-muted">Allocated</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {performance.allocation.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-foreground-secondary">{item.asset}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 glass-light rounded-xl border border-border">
          <p className="text-xs text-foreground-muted text-center">
            {performance.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Performance;
