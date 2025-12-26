import React from 'react';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const Performance = () => {
  const { performance } = useData();
  
  return (
    <section id="performance" className="py-20 lg:py-28 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Performance
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Transparent Track Record
          </h2>
          <p className="text-lg text-slate-400">
            Consistent, risk-adjusted returns built on disciplined investment principles.
          </p>
        </div>

        {/* Performance Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">YTD Return</span>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-bold text-emerald-400">{performance.summary.ytdReturn}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Avg Annual Return</span>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-bold text-emerald-400">{performance.summary.avgAnnualReturn}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <TooltipProvider>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">Sharpe Ratio</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-slate-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm">Risk-adjusted return measure. Higher is better. Above 1.0 is good, above 2.0 is excellent.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </TooltipProvider>
            <p className="text-3xl font-bold text-white">{performanceData.summary.sharpeRatio}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <TooltipProvider>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">Max Drawdown</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-slate-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm">Largest peak-to-trough decline. Lower (closer to 0%) indicates better downside protection.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <TrendingDown className="w-5 h-5 text-amber-400" />
              </div>
            </TooltipProvider>
            <p className="text-3xl font-bold text-amber-400">{performanceData.summary.maxDrawdown}</p>
          </div>
        </div>

        {/* Charts Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Performance Chart */}
          <div className="lg:col-span-2 bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Portfolio vs Benchmark</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full" />
                  <span className="text-slate-400">Portfolio</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-500 rounded-full" />
                  <span className="text-slate-400">S&P 500</span>
                </div>
              </div>
            </div>
            
            {/* Simple Chart Visualization */}
            <div className="relative h-64">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-slate-500">
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
                    <div key={i} className="border-b border-slate-700/50" />
                  ))}
                </div>
                
                {/* Bars */}
                <div className="absolute bottom-8 left-0 right-0 flex items-end justify-between gap-2 h-48">
                  {performanceData.chartData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex gap-1 justify-center">
                        <div
                          className="w-2 bg-blue-400 rounded-t"
                          style={{ height: `${(data.portfolio - 90) * 5}px` }}
                        />
                        <div
                          className="w-2 bg-slate-500 rounded-t"
                          style={{ height: `${(data.benchmark - 90) * 5}px` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 mt-2">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Allocation Chart */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className="font-semibold text-lg mb-6">Asset Allocation</h3>
            
            {/* Donut Chart Placeholder */}
            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {performanceData.allocation.reduce((acc, item, index) => {
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
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-xs text-slate-400">Allocated</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {performanceData.allocation.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-slate-300">{item.asset}</span>
                  </div>
                  <span className="text-sm font-medium">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-xs text-slate-500 text-center">
            {performanceData.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Performance;
