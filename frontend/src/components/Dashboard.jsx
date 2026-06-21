import React from 'react';

export default function Dashboard({ data }) {
  
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

  
  const getHealthColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex justify-between items-center border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">ControlTower AI</h1>
            <p className="text-sm text-gray-400 mt-1">Executive Decision Engine</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">System Health</p>
            <div className={`text-5xl font-black ${getHealthColor(metrics.healthScore)}`}>
              {metrics.healthScore}<span className="text-2xl text-gray-500">/100</span>
            </div>
          </div>
        </header>

       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
        
          <div className="lg:col-span-2 space-y-6">
            
          
            <section className="bg-gray-900 border border-red-900/50 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-red-500 flex items-center gap-2 mb-4">
                <span className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
                Critical Issues
              </h2>
              <ul className="space-y-3">
                {metrics.critical.map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-gray-800/50 p-3 rounded-lg border border-gray-800">
                    <span className="text-red-500 font-bold mt-0.5">🚨</span>
                    <span className="text-gray-200">{issue}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             
              <section className="bg-gray-900 border border-yellow-900/30 rounded-xl p-6 shadow-lg">
                <h2 className="text-lg font-semibold text-yellow-500 flex items-center gap-2 mb-4">
                  <span className="h-2 w-2 bg-yellow-500 rounded-full"></span>
                  Warnings
                </h2>
                <ul className="space-y-3">
                  {metrics.warnings.map((warning, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-yellow-500">🟡</span> {warning}
                    </li>
                  ))}
                </ul>
              </section>

              
              <section className="bg-gray-900 border border-green-900/30 rounded-xl p-6 shadow-lg">
                <h2 className="text-lg font-semibold text-green-500 flex items-center gap-2 mb-4">
                  <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                  Opportunities
                </h2>
                <ul className="space-y-3">
                  {metrics.opportunities.map((opp, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-green-500">🟢</span> {opp}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

         
          <div className="space-y-6">
            <section className="bg-blue-950/20 border border-blue-900/50 rounded-xl p-6 shadow-lg h-full">
              <h2 className="text-xl font-semibold text-blue-400 flex items-center gap-2 mb-6">
                 Recommended Actions
              </h2>
              <div className="space-y-4">
                {metrics.actions.map((action, idx) => (
                  <div key={idx} className="group relative bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-blue-900/50 text-blue-400 flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </div>
                        <span className="text-gray-100 font-medium">{action}</span>
                      </div>
                      <button className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded transition-colors opacity-0 group-hover:opacity-100">
                        Execute
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}