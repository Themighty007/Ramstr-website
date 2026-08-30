import React from 'react';
import { Target, Activity } from 'lucide-react';

export const PhysicsSection: React.FC = () => {
  return (
    <section id="physics" className="w-full py-24 bg-[#080808] text-white border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-8">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#2D7DFF]/10 text-[#2D7DFF] text-[10px] font-bold">02</span>
          <h2 className="text-sm font-mono font-bold tracking-widest text-neutral-400 uppercase">
            Real-World Physics
          </h2>
        </div>
        
        <h3 className="text-5xl md:text-7xl font-black font-display tracking-tight leading-tight mb-8">
          AI GROUNDED IN<br/>
          <span className="text-[#2D7DFF]">REALITY.</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <p className="text-xl text-neutral-300 leading-relaxed">
            Most AI upscalers invent details that aren't there. To prevent this, we force our AI to obey the actual physics of satellite cameras.
          </p>
          <div className="space-y-6">
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <Target className="w-8 h-8 text-[#2D7DFF] mb-4" />
              <h4 className="font-bold text-lg mb-2">Camera Simulation</h4>
              <p className="text-sm text-neutral-400">We simulate how the satellite's lens blurs light. If our AI's high-res image doesn't match the original blurry image when downscaled, the AI corrects itself.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
