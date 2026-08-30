import React from 'react';
import { Layers, Clock, Zap } from 'lucide-react';

export const TemporalFusionSection: React.FC = () => {
  return (
    <section id="temporal" className="w-full py-24 bg-[#080808] text-white border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-8">
          <Layers className="w-6 h-6 text-[#B7F000]" />
          <h2 className="text-sm font-mono font-bold tracking-widest text-neutral-400 uppercase">
            The Secret Sauce
          </h2>
        </div>
        
        <h3 className="text-4xl md:text-6xl font-black font-display tracking-tight leading-tight mb-6">
          TIME-TRAVEL <span className="text-[#B7F000]">AI.</span>
        </h3>
        
        <p className="text-lg text-neutral-300 mb-12 max-w-3xl leading-relaxed">
          Standard AI upscalers look at a single image and try to guess what's missing. We take a smarter approach. Our AI looks at a sequence of 5 images taken over several weeks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
            <Clock className="w-10 h-10 text-[#00F0FF] mb-4" />
            <h4 className="font-bold text-xl mb-2">Temporal Stacking</h4>
            <p className="text-neutral-400 text-sm leading-relaxed">By tracking how shadows, vehicles, and seasons change across 5 different days, the AI pieces together tiny details that a single image could never show.</p>
          </div>
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
            <Zap className="w-10 h-10 text-[#B7F000] mb-4" />
            <h4 className="font-bold text-xl mb-2">Smart Attention</h4>
            <p className="text-neutral-400 text-sm leading-relaxed">If one of the past images is covered by thick clouds, the AI automatically ignores the bad pixels and pulls data from a clearer day.</p>
          </div>
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
            <Layers className="w-10 h-10 text-[#6D35FF] mb-4" />
            <h4 className="font-bold text-xl mb-2">Sub-Pixel Alignment</h4>
            <p className="text-neutral-400 text-sm leading-relaxed">The AI perfectly aligns all 5 images at a microscopic level, ensuring buildings and roads don't blur together during the upscaling process.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
