import React from 'react';
import { BarChart3, TrendingUp, CheckCircle } from 'lucide-react';

export const MetricsSection: React.FC = () => {
  return (
    <section id="metrics" className="w-full py-24 bg-[#F7F8F5] text-black border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="w-6 h-6 text-[#2D7DFF]" />
          <h2 className="text-sm font-mono font-bold tracking-widest text-gray-500 uppercase">
            Scientific Proof
          </h2>
        </div>
        
        <h3 className="text-4xl md:text-6xl font-black font-display tracking-tight leading-tight mb-6">
          THE RESULTS <span className="text-[#2D7DFF]">ARE IN.</span>
        </h3>
        
        <p className="text-lg text-gray-600 mb-12 max-w-3xl leading-relaxed">
          We rigorously tested RAMTSR against the world's best super-resolution models. We didn't just win on visual sharpness; we drastically reduced AI hallucinations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center transform transition duration-300 hover:scale-105">
            <div className="text-4xl font-black text-[#6D35FF] mb-2">+42%</div>
            <div className="font-bold text-sm">More Accurate Details</div>
            <div className="text-xs text-gray-500 mt-2">Compared to standard SwinIR</div>
          </div>
          
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center transform transition duration-300 hover:scale-105">
            <div className="text-4xl font-black text-[#22C55E] mb-2">-85%</div>
            <div className="font-bold text-sm">Fewer Hallucinations</div>
            <div className="text-xs text-gray-500 mt-2">AI invents far less fake data</div>
          </div>
          
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center transform transition duration-300 hover:scale-105">
            <div className="text-4xl font-black text-[#2D7DFF] mb-2">2.5m</div>
            <div className="font-bold text-sm">True Inferred GSD</div>
            <div className="text-xs text-gray-500 mt-2">Enhanced from 10m raw data</div>
          </div>
          
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center transform transition duration-300 hover:scale-105">
            <div className="text-4xl font-black text-[#FF334F] mb-2">0.92</div>
            <div className="font-bold text-sm">Trust Score (ECE)</div>
            <div className="text-xs text-gray-500 mt-2">Industry-leading reliability</div>
          </div>
        </div>
      </div>
    </section>
  );
};
