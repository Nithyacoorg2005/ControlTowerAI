import React, { useState, useRef } from 'react';

export default function UploadCenter({ onProcessStart }) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);


  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Push the raw File object directly into state
      setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // Push the raw File object directly into state
      setFiles(prev => [...prev, ...Array.from(e.target.files)]);
    }
  };

  
  const loadDemoAssets = () => {
    setFiles([
      { name: "Q3_Financial_Projections.xlsx", type: "Excel", size: "2.4 MB" },
      { name: "Project_Alpha_Vendor_Contract.pdf", type: "PDF", size: "1.1 MB" },
      { name: "Customer_Escalation_Log_Oct.csv", type: "CSV", size: "0.8 MB" },
      { name: "Engineering_Standup_Notes.txt", type: "Text", size: "0.1 MB" },
      { name: "AWS_Billing_Screenshot.png", type: "Image", size: "3.2 MB" },
    ]);
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-sans text-gray-100">
      
      
      <div className="text-center mb-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          ControlTower <span className="text-blue-500">AI</span>
        </h1>
        <p className="text-lg text-gray-400">
          Upload fragmented enterprise data. Get a unified decision dashboard in seconds.
        </p>
      </div>

     
      <div className="w-full max-w-3xl bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8">
        
       
        <div 
          className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ease-in-out ${
            isDragging ? 'border-blue-500 bg-blue-900/10' : 'border-gray-700 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-800'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            multiple 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileSelect}
            ref={fileInputRef}
          />
          <div className="pointer-events-none">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-200 mb-1">Drag & drop files here</h3>
            <p className="text-sm text-gray-500">Support for PDF, Excel, CSV, Images, and Text</p>
          </div>
        </div>

       
        <div className="mt-6 flex justify-between items-center">
          <button 
            onClick={loadDemoAssets}
            className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            + Load Demo Assets
          </button>
          
          <button 
            onClick={() => onProcessStart(files)}
            disabled={files.length === 0}
            className={`px-6 py-3 rounded-lg font-bold text-white transition-all shadow-lg ${
              files.length > 0 
                ? 'bg-blue-600 hover:bg-blue-500 hover:shadow-blue-900/50 cursor-pointer' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            Generate Dashboard
          </button>
        </div>

   
        {files.length > 0 && (
          <div className="mt-8 border-t border-gray-800 pt-6">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Queued for Analysis ({files.length})
            </h4>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-950 border border-gray-800 p-3 rounded-lg group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="h-8 w-8 rounded bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                      {/* Safely extract a 3-letter type indicator from the raw file */}
                      {(file.type ? file.type.split('/').pop() : 'DOC').substring(0,3).toUpperCase()}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-medium text-gray-200 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {/* Dynamically calculate MB if it's a raw File object, otherwise use the mock string */}
                        {typeof file.size === 'number' ? (file.size / 1024 / 1024).toFixed(2) + ' MB' : file.size}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFile(idx)}
                    className="text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 px-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}