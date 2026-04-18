"use client";

import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Activity, Globe, Cpu } from 'lucide-react';

interface OperationsHubProps {
  data: any; // This will come from your profile.json or Database later
}

const OperationsHub = ({ data }: OperationsHubProps) => {
  const [bootSequence, setBootSequence] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBootSequence((prev) => (prev < 100 ? prev + 1 : 100));
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black/90 border-2 border-cyan-500/30 p-6 rounded-lg font-mono text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b border-cyan-500/30 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 animate-pulse" />
          <h2 className="text-xl font-bold tracking-widest uppercase">
            Operations Command Center
          </h2>
        </div>
        <div className="text-right">
          <div className="text-xs text-cyan-600">SYSTEM STATUS</div>
          <div className="text-sm font-bold text-green-400">ACTIVE // SECURE</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Live Feed Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-cyan-600 mb-2">
            <Terminal className="w-4 h-4" />
            <span>LIVE_OS_INTEL_FEED</span>
          </div>
          <div className="bg-black/50 border border-cyan-900 p-4 h-48 overflow-y-auto custom-scrollbar text-sm space-y-2">
            <p className="text-green-500">{`> Initializing ${data?.hero?.name || 'Operator'} environment...`}</p>
            <p className="text-cyan-500">{`> Loading neural modules: [${bootSequence}%]`}</p>
            <p className="text-yellow-500">{`> Warning: Unauthorized access attempt blocked.`}</p>
            <p className="text-cyan-500">{`> Connection established via node_3.2.1`}</p>
            <p className="text-white/70">{`> Current focus: Building Portfolio SaaS Engine`}</p>
          </div>
        </div>

        {/* Metrics Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-cyan-600 mb-2">
            <Activity className="w-4 h-4" />
            <span>BIO_METRIC_METRICS</span>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>SYSTEM UPTIME</span>
                <span>99.9%</span>
              </div>
              <div className="w-full bg-cyan-950 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full" style={{ width: '99%' }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-cyan-500/20 p-3 rounded bg-cyan-950/20">
                <Globe className="w-4 h-4 mb-1 text-cyan-300" />
                <div className="text-[10px] text-cyan-600">NODES</div>
                <div className="text-lg font-bold">14</div>
              </div>
              <div className="border border-cyan-500/20 p-3 rounded bg-cyan-950/20">
                <Cpu className="w-4 h-4 mb-1 text-cyan-300" />
                <div className="text-[10px] text-cyan-600">CORE_LOAD</div>
                <div className="text-lg font-bold">24%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-6 pt-4 border-t border-cyan-500/10 flex justify-between items-center opacity-50 text-[10px]">
        <span>BUILDER_VERSION_3.0_REV1</span>
        <span>DESIGNED_BY_GEMINI_AI</span>
      </div>
    </div>
  );
};

export default OperationsHub;