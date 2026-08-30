import React, { useState } from 'react';

const CornerBrackets = () => (
  <>
    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-gray-300"></div>
    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-gray-300"></div>
    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-gray-300"></div>
    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-gray-300"></div>
  </>
);

export const TrainingCurriculumSection: React.FC = () => {
  const [activePhase, setActivePhase] = useState(3); // Default to phase 04

  const phases = [
    { num: '01', title: 'SPATIAL FOUNDATION', loss: 'L1 + SAM', desc: 'Learn accurate spatial reconstruction.' },
    { num: '02', title: 'PHYSICS CONSTRAINT', loss: 'OBSERVATION CONSISTENCY', desc: 'Prevent hallucinated geometry.' },
    { num: '03', title: 'TEXTURE REFINEMENT', loss: 'GAN + PERCEPTUAL LOSS', desc: 'Improve texture realism and high-frequency details.' },
    { num: '04', title: 'TRUST CALIBRATION', loss: 'HETEROSCEDASTIC UNCERTAINTY', desc: 'Teach the AI to recognize when it is uncertain.' },
  ];

  return (
    <section id="training" className="w-full py-24 bg-[#F2F5F8] text-[#0F172A] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        
        {/* Header */}
        <div className="mb-16">
          <div className="text-[#0ea5e9] text-[10px] font-mono tracking-widest font-bold mb-4 uppercase">
            05 / Methodology
          </div>
          <h2 className="text-5xl md:text-7xl font-black font-sans tracking-tighter uppercase mb-6 text-[#1A202C]">
            Training Evolution
          </h2>
          <div className="text-xs font-mono text-gray-500 tracking-[0.2em] uppercase">
            Four-Phase Progressive Learning
          </div>
        </div>

        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {phases.map((phase, idx) => {
            const isActive = activePhase === idx;
            return (
              <div 
                key={phase.num}
                onClick={() => setActivePhase(idx)}
                className={`relative bg-[#FAFCFD] p-6 pt-8 pb-10 flex flex-col h-full cursor-pointer transition-all duration-300 ${
                  isActive ? 'shadow-xl shadow-[#0ea5e9]/5' : 'hover:bg-white'
                }`}
              >
                <CornerBrackets />
                
                <div className="text-[#0ea5e9] font-mono text-[10px] mb-6">
                  {phase.num}
                </div>
                
                <h3 className={`font-mono text-sm tracking-wider font-bold mb-8 ${isActive ? 'text-[#0ea5e9]' : 'text-[#1A202C]'}`}>
                  {phase.title}
                </h3>
                
                <div className={`relative px-4 py-3 border mb-6 text-[10px] font-mono tracking-widest ${
                  isActive ? 'border-[#0ea5e9]/30 bg-[#0ea5e9]/5 text-[#0ea5e9]' : 'border-gray-300 text-gray-500'
                }`}>
                  <div className="text-gray-400 text-[8px] mb-1">LOSS FUNCTION</div>
                  {phase.loss}
                  
                  {/* Small Dot indicator on the top edge of the box */}
                  <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#FAFCFD] flex items-center justify-center">
                    <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#0ea5e9] shadow-[0_0_8px_#0ea5e9]' : 'bg-gray-400'}`}></div>
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm leading-relaxed mt-auto font-sans">
                  {phase.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
