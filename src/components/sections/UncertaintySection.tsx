import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const UncertaintySection: React.FC = () => {
  return (
    <section id="uncertainty" className="w-full py-24 bg-white text-black border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-8">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FF334F]/10 text-[#FF334F] text-[10px] font-bold">03</span>
          <h2 className="text-sm font-mono font-bold tracking-widest text-gray-500 uppercase">
            Trust & Uncertainty
          </h2>
        </div>
        
        <h3 className="text-5xl md:text-7xl font-black font-display tracking-tight leading-tight mb-8">
          WE TELL YOU WHEN<br/>
          <span className="text-[#FF334F]">THE AI IS UNSURE.</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <p className="text-xl text-gray-600 leading-relaxed">
            Every pixel we generate comes with a "Trust Score." If clouds or heavy shadows make a prediction difficult, the map glows red to warn you.
          </p>
          
          <div className="p-8 bg-[#FFF5F6] rounded-2xl border border-[#FF334F]/20">
            <ShieldAlert className="w-10 h-10 text-[#FF334F] mb-4" />
            <h4 className="font-bold text-lg mb-2">The Trust Map</h4>
            <p className="text-gray-700">Instead of blindly trusting the AI, military and agricultural analysts can look at the Trust Map to see exactly where the data is 100% reliable.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
