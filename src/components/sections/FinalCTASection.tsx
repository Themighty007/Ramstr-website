import React from 'react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { PROJECT_CONFIG } from '../../config/project';

interface FinalCTASectionProps {
  onScrollTo: (id: string) => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onScrollTo }) => {
  return (
    <section id="cta" className="w-full py-24 bg-[#050505] text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-4xl md:text-7xl font-black font-display tracking-tighter mb-8">
          READY TO SEE<br/>
          <span className="text-[#00F0FF]">CLEARLY?</span>
        </h2>
        
        <p className="text-lg text-neutral-400 mb-12 max-w-2xl mx-auto">
          Our AI transforms blurry satellite images into crisp, trustworthy maps. Explore the code or try the dashboard today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href={PROJECT_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-[#00F0FF] text-black font-bold tracking-widest uppercase transition-all hover:bg-white flex items-center gap-2"
          >
            <Github className="w-5 h-5" />
            <span>View Source Code</span>
          </a>
          
          <button
            onClick={() => onScrollTo('hero')}
            className="px-8 py-4 rounded-full border border-white/20 text-white font-bold tracking-widest uppercase transition-all hover:bg-white/10 flex items-center gap-2"
          >
            <span>Back to Top</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
