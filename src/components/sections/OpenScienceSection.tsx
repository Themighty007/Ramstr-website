import React from 'react';
import { BookOpen, Code, Share2 } from 'lucide-react';

export const OpenScienceSection: React.FC = () => {
  return (
    <section id="opensource" className="w-full py-24 bg-white text-black border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight mb-4">
            Built for Everyone.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We believe good AI should be open and accessible. That's why we made everything completely free and open-source.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200 text-center">
            <Code className="w-12 h-12 text-[#6D35FF] mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Open Code</h3>
            <p className="text-gray-600">Our entire project is available on GitHub. Anyone can use, modify, or learn from it.</p>
          </div>
          
          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200 text-center">
            <BookOpen className="w-12 h-12 text-[#2D7DFF] mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Easy to Understand</h3>
            <p className="text-gray-600">No confusing math or hidden tricks. Our code is clean and fully documented.</p>
          </div>
          
          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200 text-center">
            <Share2 className="w-12 h-12 text-[#22C55E] mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Free to Use</h3>
            <p className="text-gray-600">We want to help researchers and scientists around the world make better maps.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
