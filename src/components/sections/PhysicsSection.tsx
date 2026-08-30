import React, { useState } from 'react';

const CornerBrackets = () => (
  <>
    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-gray-400"></div>
    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-gray-400"></div>
    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-gray-400"></div>
    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-gray-400"></div>
  </>
);

export const PhysicsSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(4); // Default to step 05 (index 4)

  const steps = [
    { num: '01', title: 'GENERATED 2.5M IMAGE', sub: 'SUPER-RESOLVED STATE' },
    { num: '02', title: 'GAUSSIAN PSF', sub: 'SENSOR BLUR SIMULATION' },
    { num: '03', title: 'SPECTRAL RESPONSE', sub: 'BAND-SPECIFIC DEGRADATION' },
    { num: '04', title: '10M RECONSTRUCTION', sub: 'DOWNSAMPLED SYNTHETIC' },
    { num: '05', title: 'COMPARE WITH REAL OBSERVATION', sub: 'CONSISTENCY LOSS CALCULATION' },
  ];

  return (
    <section id="physics" className="w-full py-24 bg-[#F2F5F8] text-[#1A202C] font-mono border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Column - Steps */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`relative p-5 cursor-pointer transition-all duration-300 ${
                    isActive ? 'bg-[#E3F2ED]' : 'bg-[#FAFCFD] hover:bg-white'
                  }`}
                >
                  <CornerBrackets />
                  <div className="flex items-center gap-6">
                    <span className={`text-lg font-bold ${isActive ? 'text-[#00D084]' : 'text-gray-400'}`}>
                      {step.num}
                    </span>
                    <div className="flex-1">
                      <h4 className={`text-sm tracking-wider font-bold mb-1 ${isActive ? 'text-[#1A202C]' : 'text-gray-500'}`}>
                        {step.title}
                      </h4>
                      <p className={`text-[10px] tracking-widest uppercase ${isActive ? 'text-gray-500' : 'text-gray-400'}`}>
                        {step.sub}
                      </p>
                    </div>
                    {isActive && (
                      <div className="w-6 h-6 rounded-full border border-[#00D084]/30 flex items-center justify-center bg-[#00D084]/10">
                        <div className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column - Metric Display */}
          <div className="w-full lg:w-1/2 relative bg-[#FAFCFD] p-12 h-full min-h-[400px] flex flex-col items-center justify-center">
            <CornerBrackets />
            
            <h3 className="text-xs tracking-[0.2em] text-gray-500 font-bold mb-12 uppercase text-center relative z-10">
              {activeStep === 4 ? 'Observation Consistency' : steps[activeStep].title}
            </h3>

            <div className="relative flex flex-col items-center justify-center w-full">
              {/* Green Divider Line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00D084]/50 to-transparent"></div>
              
              {activeStep === 4 ? (
                <>
                  {/* Glowing Metric */}
                  <div className="relative mt-12 mb-16">
                    <div className="absolute inset-0 bg-[#00D084] blur-3xl opacity-20 rounded-full"></div>
                    <div className="text-8xl md:text-9xl font-black text-[#00D084] tracking-tighter relative z-10 font-sans">
                      98.7<span className="text-6xl md:text-7xl">%</span>
                    </div>
                  </div>

                  {/* Formula Box */}
                  <div className="relative px-6 py-3 bg-[#E3F2ED] border border-[#00D084]/30 text-[#00D084] text-xs tracking-widest font-bold">
                    L_OBS = ||F(SR) - LR||1 + ?SAM
                  </div>
                </>
              ) : (
                <div className="mt-12 mb-16 flex flex-col items-center opacity-50">
                  <div className="text-4xl font-bold text-gray-300 mb-4">PROCESSING STEP {steps[activeStep].num}</div>
                  <div className="text-xs text-gray-400 tracking-widest">Select Step 05 to view final metrics</div>
                </div>
              )}
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
};
