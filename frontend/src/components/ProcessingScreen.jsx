import React, { useState, useEffect } from 'react';

export default function ProcessingScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  // The steps mirror the exact multi-agent pipeline from your pitch
  const processingSteps = [
    { id: 'ingest', label: 'Ingesting multimodal documents...' },
    { id: 'finance', label: 'Extracting financial risks from Excel...' },
    { id: 'ops', label: 'Analyzing operational & HR metrics...' },
    { id: 'vision', label: 'Processing AWS billing screenshots...' },
    { id: 'synth', label: 'Synthesizing final executive briefing...' }
  ];

  useEffect(() => {
    // Simulate the time it takes for your Gemini backend to process.
    // In a real app, this screen would listen for WebSockets or polling.
    // For the demo, we fake the staging perfectly to last about 4.5 seconds.
    const timers = [];
    
    processingSteps.forEach((_, index) => {
      const timer = setTimeout(() => {
        setCurrentStep(index + 1);
        
        // If it's the last step, wait 800ms then transition to Dashboard
        if (index === processingSteps.length - 1) {
          setTimeout(() => {
            onComplete();
          }, 800);
        }
      }, (index + 1) * 900); // 900ms per step
      
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8">
        
        {/* Pulsing Header */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative flex h-16 w-16 mb-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-20"></span>
            <div className="relative inline-flex rounded-full h-16 w-16 bg-gray-800 border-2 border-blue-500 items-center justify-center">
              <span className="text-blue-500 font-bold">AI</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">ControlTower Engine</h2>
          <p className="text-sm text-gray-400 mt-1">Processing enterprise context</p>
        </div>

        {/* Dynamic Checklist */}
        <div className="space-y-4">
          {processingSteps.map((step, index) => {
            const isCompleted = currentStep > index;
            const isActive = currentStep === index;
            const isPending = currentStep < index;

            return (
              <div 
                key={step.id} 
                className={`flex items-center gap-4 p-3 rounded-lg border transition-all duration-300 ${
                  isActive ? 'bg-blue-900/20 border-blue-500/50' : 
                  isCompleted ? 'bg-gray-800/30 border-green-900/30' : 
                  'bg-gray-950 border-gray-800/50 opacity-50'
                }`}
              >
                {/* Status Icon */}
                <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                  {isCompleted && (
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {isActive && (
                    <svg className="w-5 h-5 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {isPending && (
                    <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                  )}
                </div>

                {/* Step Label */}
                <span className={`text-sm font-medium ${
                  isCompleted ? 'text-gray-300' : 
                  isActive ? 'text-blue-400 font-semibold' : 
                  'text-gray-600'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}