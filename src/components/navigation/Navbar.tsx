import React, { useState, useEffect } from 'react';
import { Satellite, Shield, Cpu, Clock, BarChart3, MapPin, Code2, Menu, X } from 'lucide-react';
import { PROJECT_CONFIG } from '../../config/project';

interface NavbarProps {
  activeSection: string;
  isDarkTheme?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, isDarkTheme = true }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'SYSTEM', icon: Satellite },
    { id: 'problem', label: 'SCIENCE', icon: Shield },
    { id: 'architecture', label: 'ARCHITECTURE', icon: Cpu },
    { id: 'temporal', label: 'AI LOGIC', icon: Clock },
    { id: 'metrics', label: 'METRICS', icon: BarChart3 },
    { id: 'gis', label: 'GIS LAB', icon: MapPin }
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-[100] px-4 md:px-8 max-w-7xl mx-auto pointer-events-none">
      <nav 
        id="main-navigation"
        className={`pointer-events-auto transition-all duration-500 rounded-full px-4 md:px-6 py-2.5 flex items-center justify-between border backdrop-blur-md shadow-2xl ${
          isDarkTheme
            ? 'bg-[#080808]/80 border-white/10 text-white shadow-black/60'
            : 'bg-white/90 border-black/10 text-black shadow-slate-200/60'
        }`}
      >
        <button 
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-black border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-[#00F0FF]/20 group-hover:bg-[#00F0FF]/40 transition-colors"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_8px_#00F0FF]"></div>
          </div>
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="font-black font-display tracking-tighter text-sm uppercase">RAMTSR</span>
              <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-[#00B8D4]/20 text-[#00B8D4] border border-[#00B8D4]/30">SIH26142</span>
            </div>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-widest transition-all cursor-pointer flex items-center gap-2 ${
                activeSection === item.id 
                  ? (isDarkTheme ? 'text-white bg-white/10' : 'text-black bg-black/5') 
                  : 'text-neutral-500 hover:text-[#00F0FF]'
              }`}
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={PROJECT_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 transition-colors text-xs font-mono font-bold tracking-widest text-white"
          >
            <span>CODE</span>
            <Code2 className="w-3.5 h-3.5" />
          </a>
        </div>

        <button 
          className="md:hidden p-2 rounded-full bg-white/10 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="absolute top-16 left-4 right-4 p-4 rounded-2xl bg-[#080808]/95 border border-white/10 backdrop-blur-xl shadow-2xl pointer-events-auto flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="px-4 py-3 rounded-xl text-left text-sm font-mono font-bold tracking-widest text-white hover:bg-white/10 flex items-center gap-3"
            >
              <item.icon className="w-4 h-4 text-[#00F0FF]" />
              {item.label}
            </button>
          ))}
          <a
            href={PROJECT_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 mt-2 rounded-xl text-left text-sm font-mono font-bold tracking-widest text-black bg-[#00F0FF] flex items-center gap-3"
          >
            <Code2 className="w-4 h-4" />
            VIEW SOURCE CODE
          </a>
        </div>
      )}
    </header>
  );
};
