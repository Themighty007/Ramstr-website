import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export const MermaidChart: React.FC<{ chart: string }> = ({ chart }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#F7F8F5',
        primaryTextColor: '#080808',
        primaryBorderColor: '#D9DEDA',
        lineColor: '#6D35FF',
        secondaryColor: '#EBEBEB',
        tertiaryColor: '#fff'
      },
      flowchart: {
        curve: 'basis'
      }
    });
    
    if (chartRef.current) {
      chartRef.current.innerHTML = chart;
      mermaid.run({ nodes: [chartRef.current] });
    }
  }, [chart]);

  return <div className="mermaid flex justify-center py-8" ref={chartRef}></div>;
};
