import React, { useState, useEffect } from 'react';
import { FirstLoadModal } from './components/ui/FirstLoadModal';
import { Navbar } from './components/navigation/Navbar';
import { WebGLHero } from './components/hero/WebGLHero';
import { HeroHUD } from './components/hero/HeroHUD';
import { ProblemSection } from './components/sections/ProblemSection';
import { ComparisonSection } from './components/sections/ComparisonSection';
import { ArchitectureSection } from './components/sections/ArchitectureSection';
import { AIBrainSection } from './components/sections/AIBrainSection';
import { TemporalFusionSection } from './components/sections/TemporalFusionSection';
import { PhysicsSection } from './components/sections/PhysicsSection';
import { TrainingCurriculumSection } from './components/sections/TrainingCurriculumSection';
import { UncertaintySection } from './components/sections/UncertaintySection';
import { MetricsSection } from './components/sections/MetricsSection';
import { GISDashboardSection } from './components/sections/GISDashboardSection';
import { AILabSection } from './components/sections/AILabSection';
import { OpenScienceSection } from './components/sections/OpenScienceSection';
import { FinalCTASection } from './components/sections/FinalCTASection';

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isNavbarDark, setIsNavbarDark] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      
      const p = Math.min(Math.max(scrollY / (heroHeight * 2.2), 0), 1);
      setScrollProgress(p);

      const sections = [
        { id: 'hero', dark: true },
        { id: 'problem', dark: false },
        { id: 'comparison', dark: false },
        { id: 'architecture', dark: false },
        { id: 'aibrain', dark: false },
        { id: 'temporal', dark: true },
        { id: 'physics', dark: false },
        { id: 'training', dark: false },
        { id: 'uncertainty', dark: false },
        { id: 'metrics', dark: false },
        { id: 'gis', dark: true },
        { id: 'opensource', dark: false }
      ];

      const currentScrollPos = scrollY + 200;
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (currentScrollPos >= top && currentScrollPos < top + height) {
            setActiveSection(sec.id);
            setIsNavbarDark(sec.dark);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#080808] selection:bg-[#00F0FF] selection:text-black">
      {!loadingComplete && (
        <FirstLoadModal onComplete={() => setLoadingComplete(true)} />
      )}

      <Navbar 
        activeSection={activeSection} 
        isDarkTheme={isNavbarDark} 
      />

      <section id="hero" className="relative w-full h-[300vh]">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <WebGLHero 
            scrollProgress={scrollProgress} 
            onExploreClick={() => scrollToSection('problem')}
          />
          <HeroHUD 
            scrollProgress={scrollProgress}
            onExploreClick={() => scrollToSection('problem')}
            onArchitectureClick={() => scrollToSection('architecture')}
          />
        </div>
      </section>

      <ProblemSection />
      <ComparisonSection />
      <ArchitectureSection />
      <AIBrainSection />
      <TemporalFusionSection />
      <PhysicsSection />
      <TrainingCurriculumSection />
      <UncertaintySection />
      <MetricsSection />
      <GISDashboardSection />
      <AILabSection />
      <OpenScienceSection />
      <FinalCTASection onScrollTo={scrollToSection} />
    </div>
  );
}
