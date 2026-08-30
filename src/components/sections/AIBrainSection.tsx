import React, { useState } from 'react';
import { Brain, Cpu, Database, Sparkles, CheckCircle2 } from 'lucide-react';

export const AIBrainSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 'logic',
      icon: Brain,
      title: 'The Core Logic',
      heading: 'SwinIR Transformers',
      content: 'Instead of looking at the whole image at once, our AI breaks it down into overlapping "windows". It analyzes tiny local textures (like the edges of a building) while simultaneously keeping track of the big picture (like a whole city block). This prevents the AI from getting confused by complex terrain.',
      pros: ['Attention-based processing', 'Preserves high-frequency details', 'Context-aware upscaling']
    },
    {
      id: 'creation',
      icon: Database,
      title: 'How We Built It',
      heading: 'Trained on Reality',
      content: "We didn't just use synthetic blur. We trained the brain using terabytes of real ESA Copernicus satellite data. We fed it thousands of pairs of blurry, cloudy 10m images alongside crystal-clear 2.5m drone/aerial shots, forcing the AI to learn the exact physics of how light scatters through the atmosphere.",
      pros: ['Real-world atmospheric training', 'Physics-aware loss functions', 'Robust to severe cloud cover']
    },
    {
      id: 'pros',
      icon: Sparkles,
      title: 'The Advantages',
      heading: 'Why It Dominates',
      content: 'By combining the temporal memory of 5 past images with the spatial brilliance of Swin Transformers, RAMTSR delivers an operational capability that standard models simply cannot match. It is designed specifically for intelligence, defense, and high-stakes mapping.',
      pros: ['Zero generative hallucinations', 'Outputs mathematically proven Trust Scores', 'Lightweight enough for edge deployment']
    }
  ];

  return (
    <section id="aibrain" className="w-full py-24 bg-white text-black border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-12">
          <Cpu className="w-6 h-6 text-[#6D35FF]" />
          <h2 className="text-sm font-mono font-bold tracking-widest text-gray-500 uppercase">
            Under The Hood
          </h2>
        </div>
        
        <h3 className="text-4xl md:text-5xl font-black font-display tracking-tight leading-tight mb-12">
          INSIDE THE <span className="text-[#6D35FF]">AI BRAIN.</span>
        </h3>

        {/* Interactive Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all cursor-pointer ${
                activeTab === idx
                  ? 'bg-[#6D35FF] text-white shadow-lg shadow-[#6D35FF]/25 scale-105'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-12 min-h-[300px] flex flex-col md:flex-row gap-12 transition-all duration-500 shadow-sm relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#6D35FF]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex-1 relative z-10">
            <h4 className="text-3xl font-black mb-6 text-[#080808]">
              {tabs[activeTab].heading}
            </h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {tabs[activeTab].content}
            </p>
          </div>
          
          <div className="flex-1 relative z-10 md:border-l border-gray-200 md:pl-12 flex flex-col justify-center">
            <h5 className="font-mono text-sm text-gray-400 font-bold tracking-widest uppercase mb-6">
              Key Capabilities
            </h5>
            <ul className="space-y-4">
              {tabs[activeTab].pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                  <CheckCircle2 className="w-6 h-6 text-[#22C55E] shrink-0" />
                  <span className="text-gray-800 font-bold">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};
