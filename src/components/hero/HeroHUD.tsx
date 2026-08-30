import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { PROJECT_CONFIG } from '../../config/project';

interface HeroHUDProps {
  onExploreClick: () => void;
  onArchitectureClick: () => void;
  scrollProgress: number;
}

export const HeroHUD: React.FC<HeroHUDProps> = ({
  onExploreClick,
  onArchitectureClick,
  scrollProgress
}) => {
  const hudOpacity = Math.max(1 - scrollProgress * 1.8, 0);

  if (hudOpacity <= 0.02) return null;

  return (
    <div 
      id="hero-hud-layer"
      style={{ opacity: hudOpacity }}
      className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 md:p-12 lg:p-16 text-white transition-opacity duration-300"
    >
      <div className="h-12 md:h-16"></div>

      <div className="grid grid-cols-1 gap-8 items-center w-full max-w-7xl mx-auto my-auto">
        
        <div className="flex flex-col items-start pointer-events-auto">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-mono mb-4 tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping"></span>
            <span>SIH26142 • {PROJECT_CONFIG.organization} • SPACE TECH</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter font-display leading-[0.92] text-white mb-4 uppercase">
            SEE<br/>
            THE<br/>
            <span className="text-[#00F0FF] text-glow-cyan">UNSEEN.</span>
          </h1>

          <div className="text-xl sm:text-2xl font-bold font-display text-neutral-200 tracking-tight mb-3">
            {PROJECT_CONFIG.fullName}
          </div>

          <p className="text-lg text-neutral-300 font-sans max-w-lg leading-relaxed mb-8">
            We turn blurry 10-meter satellite images into crystal-clear 2.5-meter maps using AI, revealing the world in stunning detail.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="px-6 py-3.5 rounded-full bg-[#00F0FF] hover:bg-[#B7F000] text-black font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>EXPLORE RAMTSR</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={onArchitectureClick}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-medium tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <span>VIEW ARCHITECTURE</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs font-mono text-neutral-400 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <span className="text-white font-medium">10m to 2.5m AI Upscaling</span>
        </div>

        <div 
          onClick={onExploreClick}
          className="flex items-center gap-2 text-[#00F0FF] hover:text-white transition-colors cursor-pointer pointer-events-auto group"
        >
          <span className="tracking-widest uppercase text-[11px]">SCROLL TO DESCEND</span>
          <div className="w-6 h-6 rounded-full border border-[#00F0FF]/40 flex items-center justify-center group-hover:translate-y-1 transition-transform">
            <ArrowDown className="w-3.5 h-3.5 text-[#00F0FF]" />
          </div>
        </div>
      </div>
    </div>
  );
};
