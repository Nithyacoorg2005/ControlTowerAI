import React from 'react';

export default function Dashboard({ data }) {
  // Defensive state fallback
  const metrics = data || {
    healthScore: 71,
    critical: [
      "Vendor delay affecting Project Alpha",
      "12% decline in customer satisfaction"
    ],
    warnings: [
      "Backend team overloaded"
    ],
    opportunities: [
      "Reduce cloud costs by ₹3.2L/month"
    ],
    actions: [
      "Reassign engineers",
      "Escalate vendor issue",
      "Optimize cloud resources"
    ]
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-400 p-8 font-sans antialiased selection:bg-indigo-500/30">
      <div className="max-w-5xl mx-auto space-y-12 mt-4">
        
        {/* Minimalist Header */}
        <header className="flex justify-between items-end border-b border-white/10 pb-8">
          <div>
            <h1 className="text-3xl font-medium text-zinc-100 tracking-tight">ControlTower</h1>
            <p className="text-sm mt-2 text-zinc-500">Executive Decision Engine</p>
          </div>
          <div className="text-right flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">System Health</p>
              <div className="text-4xl font-light text-zinc-100 tabular-nums tracking-tight">
                {metrics.healthScore}<span className="text-lg text-zinc-600">/100</span>
              </div>
            </div>
            {/* Minimalist Status Ring */}
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/5"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={metrics.healthScore > 80 ? "text-emerald-500" : metrics.healthScore > 50 ? "text-amber-500" : "text-rose-500"}
                strokeDasharray={`${metrics.healthScore}, 100`}
                strokeWidth="2"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Data Streams */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Critical Segment */}
            {metrics.critical.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold text-zinc-100 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
                  Critical Exceptions
                </h2>
                <div className="space-y-3">
                  {metrics.critical.map((issue, idx) => (
                    <div key={idx} className="group flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/10 transition-colors">
                      <div className="mt-1.5 w-1 h-4 rounded-full bg-rose-500/80 shrink-0"></div>
                      <p className="text-sm text-zinc-300 leading-relaxed">{issue}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Warnings */}
              <section>
                <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
                  Active Warnings
                </h2>
                <ul className="space-y-3">
                  {metrics.warnings.map((warning, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/50 shrink-0"></span>
                      <span className="leading-relaxed">{warning}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Opportunities */}
              <section>
                <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
                  Opportunities
                </h2>
                <ul className="space-y-3">
                  {metrics.opportunities.map((opp, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0"></span>
                      <span className="leading-relaxed">{opp}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Right Column: Execution */}
          <div className="lg:col-span-5">
            <section className="sticky top-8 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 backdrop-blur-xl">
              <h2 className="text-xs font-semibold text-zinc-100 uppercase tracking-widest mb-6">
                Execution Matrix
              </h2>
              <div className="space-y-3">
                {metrics.actions.map((action, idx) => (
                  <button 
                    key={idx} 
                    className="w-full text-left group relative flex items-center justify-between p-4 rounded-xl bg-[#09090b] border border-white/[0.04] hover:border-zinc-700 transition-all"
                  >
                    <div className="flex items-center gap-4 pr-4">
                      <span className="text-xs font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors">
                        0{idx + 1}
                      </span>
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors">
                        {action}
                      </span>
                    </div>
                    
                    {/* Minimalist Arrow Icon */}
                    <svg 
                      className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transform group-hover:translate-x-1 transition-all" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                ))}
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}