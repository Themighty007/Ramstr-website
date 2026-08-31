import React, { useState, useRef } from 'react';
import { Upload, Zap, Target, BarChart2, CheckCircle2, AlertTriangle, Loader2, Terminal, Eye } from 'lucide-react';

export const AILabSection: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<{psnr: string, ssim: string, consistency: string} | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
      setMetrics(null);
      setError(null);
    }
  };

  const handleRunInference = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Connect to local FastAPI backend
      const response = await fetch('http://localhost:8000/api/upscale', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setResult(data.image_base64);
        setMetrics(data.metrics);
      } else {
        setError(data.message || 'Unknown error occurred during inference.');
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to the local ML API. Ensure the Python FastAPI server is running on port 8000.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="ailab" className="w-full py-24 bg-[#0a0a0a] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] text-[10px] font-bold">05</span>
            <h2 className="text-sm font-mono font-bold tracking-widest text-neutral-400 uppercase">
              Live AI Inference Lab
            </h2>
          </div>
          <h3 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white uppercase">
            UPSCALE <span className="text-[#00F0FF] text-glow-cyan">IN REAL-TIME.</span>
          </h3>
          <p className="text-sm text-neutral-400 font-sans leading-relaxed mt-4 max-w-2xl">
            Upload any 10m resolution satellite image patch (e.g., Sentinel-2) directly into our live inference engine. 
            The system connects to our dedicated GPU backend to reconstruct the image to 2.5m resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* UPLOAD & CONTROLS COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-[#0f0f0f] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-50"></div>
              
              <h4 className="text-xs font-mono font-bold text-neutral-300 mb-6 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#00F0FF]" /> TARGET ACQUISITION
              </h4>
              
              <div 
                className="w-full aspect-square rounded-2xl border-2 border-dashed border-white/20 bg-black/50 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:border-[#00F0FF]/50 hover:bg-[#00F0FF]/5 transition-all"
                onClick={() => fileInputRef.current?.click()}
              >
                {preview ? (
                  <div className="relative w-full h-full rounded-xl overflow-hidden group">
                    <img src={preview} alt="Input preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">Change Image</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-neutral-500 mb-4" />
                    <span className="text-sm font-bold text-white mb-2">Drop Satellite Image</span>
                    <span className="text-[10px] font-mono text-neutral-500">10m GSD (Sentinel-2 Format)</span>
                    <span className="text-[10px] font-mono text-neutral-500 mt-1">PNG, JPG up to 10MB</span>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileSelect}
                />
              </div>

              <button 
                onClick={handleRunInference}
                disabled={!file || isProcessing}
                className="w-full mt-6 py-4 rounded-xl bg-[#00F0FF] text-black font-bold font-mono text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> ENHANCING ASSETS...</>
                ) : (
                  <><Zap className="w-5 h-5" /> INITIALIZE SUPER-RESOLUTION</>
                )}
              </button>
              
              {error && (
                <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-mono text-red-400">{error}</p>
                </div>
              )}
            </div>
            
            {/* API STATUS */}
            <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> BACKEND STATUS
              </span>
              <span className="flex items-center gap-2 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> ONLINE (GPU READY)
              </span>
            </div>
          </div>

          {/* RESULTS COLUMN */}
          <div className="lg:col-span-8">
            <div className="h-full min-h-[500px] p-6 rounded-3xl bg-[#0f0f0f] border border-white/10 shadow-2xl relative flex flex-col">
              <h4 className="text-xs font-mono font-bold text-neutral-300 mb-6 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#00F0FF]" /> INFERENCE OUTPUT & TELEMETRY
              </h4>
              
              {result && metrics ? (
                <div className="flex-1 flex flex-col gap-6">
                  {/* Side by side comparison */}
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black flex flex-col">
                      <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-white tracking-widest">
                        INPUT (10m)
                      </div>
                      <img src={preview!} alt="Original" className="w-full h-full object-cover mix-blend-screen" style={{imageRendering: 'pixelated'}} />
                    </div>
                    
                    <div className="relative rounded-2xl overflow-hidden border border-[#00F0FF]/30 bg-black flex flex-col shadow-[0_0_30px_rgba(0,240,255,0.1)]">
                      <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-lg bg-[#00F0FF]/20 backdrop-blur-md border border-[#00F0FF]/50 text-[10px] font-mono font-bold text-[#00F0FF] tracking-widest flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3" /> ENHANCED (2.5m)
                      </div>
                      <img src={result} alt="Enhanced" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  
                  {/* Metrics HUD */}
                  <div className="grid grid-cols-3 gap-4 shrink-0">
                    <div className="p-4 rounded-xl bg-black border border-white/10 text-center">
                      <div className="text-[10px] text-neutral-500 font-mono mb-1">PSNR (SIGNAL/NOISE)</div>
                      <div className="text-xl font-display font-bold text-white">{metrics.psnr}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-black border border-white/10 text-center">
                      <div className="text-[10px] text-neutral-500 font-mono mb-1">STRUCTURAL SIMILARITY</div>
                      <div className="text-xl font-display font-bold text-white">{metrics.ssim}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                      <div className="text-[10px] text-emerald-500 font-mono mb-1">OBSERVATION CONSISTENCY</div>
                      <div className="text-xl font-display font-bold text-emerald-400">{metrics.consistency}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-white/5 rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 text-neutral-600" />
                  </div>
                  <h5 className="text-sm font-bold text-white mb-2">AWAITING TARGET ACQUISITION</h5>
                  <p className="text-xs text-neutral-500 font-mono max-w-sm mx-auto">
                    Upload an image and run the inference engine to view the enhanced 2.5m output alongside real-time metrics telemetry.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
