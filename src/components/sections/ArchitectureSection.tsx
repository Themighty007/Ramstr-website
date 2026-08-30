import React from 'react';
import { Layers } from 'lucide-react';
import { MermaidChart } from '../MermaidChart';

export const ArchitectureSection: React.FC = () => {
  const mermaidGraph = `
graph TD
    A[Raw 10m Satellite Images] --> B(Alignment & Cloud Check)
    B --> C{AI Brain: SwinIR Encoder}
    C --> D[Look at Past Images]
    C --> E[Look at Current Details]
    D --> F{Merge Information}
    E --> F
    F --> G(Physics Check: Is it realistic?)
    G --> H[Final 2.5m High-Res Map]
    F --> I[Trust Map: Where is AI unsure?]
    
    style A fill:#e2f3f5,stroke:#00B8D4,stroke-width:2px
    style C fill:#f3e8ff,stroke:#6D35FF,stroke-width:2px
    style F fill:#e0f2fe,stroke:#2D7DFF,stroke-width:2px
    style H fill:#dcfce7,stroke:#22C55E,stroke-width:2px
    style I fill:#fee2e2,stroke:#FF334F,stroke-width:2px
  `;

  return (
    <section id="architecture" className="w-full py-24 bg-white text-[#080808] border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-8">
          <Layers className="w-6 h-6 text-[#6D35FF]" />
          <h2 className="text-sm font-mono font-bold tracking-widest text-gray-500 uppercase">
            How It Works
          </h2>
        </div>
        
        <h3 className="text-4xl md:text-5xl font-black font-display tracking-tight leading-tight mb-6">
          A Simple, Powerful AI Pipeline.
        </h3>
        
        <p className="text-lg text-gray-600 mb-12 max-w-3xl leading-relaxed">
          We designed our AI to work like a human expert. First, it looks at multiple satellite images from the past to understand the area. Then, it combines this with the current image to add sharp details. Finally, it double-checks its work against real-world physics to ensure it didn't invent anything fake.
        </p>

        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 shadow-sm">
          <MermaidChart chart={mermaidGraph} />
        </div>
      </div>
    </section>
  );
};