import React from 'react';
import { AlertTriangle, ZoomIn, EyeOff } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="problem" className="w-full py-24 bg-[#F7F8F5] text-[#080808] border-b border-[#D9DEDA]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-8">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FF334F]/10 text-[#FF334F] text-[10px] font-bold">01</span>
          <h2 className="text-sm font-mono font-bold tracking-widest text-neutral-500 uppercase">
            The Problem
          </h2>
        </div>
        
        <h3 className="text-6xl md:text-8xl font-black font-display tracking-tighter leading-[0.9] mb-12">
          10 METERS<br/>ISN'T<br/>
          <span className="text-[#6D35FF]">ENOUGH.</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div className="space-y-6">
            <p className="text-xl font-medium leading-relaxed">
              Standard satellite images are blurry. A single pixel covers 10 meters of ground.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              This means small objects like vehicles, farm roads, and small buildings completely vanish. We can't track important ground details because the camera simply isn't sharp enough.
            </p>
            
            <div className="p-6 bg-white rounded-xl border border-gray-200 mt-8 shadow-sm">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-[#FF334F] shrink-0" />
                <div>
                  <h4 className="font-bold mb-2">The AI Risk</h4>
                  <p className="text-sm text-gray-600">
                    Standard AI tries to guess what's missing, but it often invents fake details (hallucinations). Our solution uses a "Trust Map" so you know exactly which pixels are real and which are AI-generated.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <ZoomIn className="w-10 h-10 text-[#2D7DFF]" />
              <div>
                <h4 className="font-bold text-lg">See the Unseen</h4>
                <p className="text-sm text-gray-600">We enhance images from 10m to 2.5m, revealing hidden details.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <EyeOff className="w-10 h-10 text-[#6D35FF]" />
              <div>
                <h4 className="font-bold text-lg">No More Fake Pixels</h4>
                <p className="text-sm text-gray-600">Our physics engine prevents the AI from hallucinating objects that aren't there.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
