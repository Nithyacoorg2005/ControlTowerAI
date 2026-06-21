import React, { useState } from 'react';
import UploadCenter from './components/UploadCenter';
import ProcessingScreen from './components/ProcessingScreen';
import Dashboard from './components/Dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('upload'); 
  const [dashboardData, setDashboardData] = useState(null);

  const handleProcessStart = async (files) => {
    setCurrentScreen('processing');
    
    // 1. Package the files into a FormData object
    const formData = new FormData();
    files.forEach(file => {
      // In a real scenario, you'd pass actual File objects from the input element.
      // If using the "Mock Assets" button, you will need to fetch those assets 
      // as Blobs or just skip the real upload for the strictly mock demo.
      // Assuming 'files' contains real JS File objects here:
      if (file instanceof File) {
        formData.append("files", file);
      }
    });

    try {
      // 2. Fire the request to your FastAPI endpoint
      const response = await fetch("http://127.0.0.1:8000/api/v1/process-documents", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("API processing failed");

      const data = await response.json();
      
      // 3. Pass the strictly typed JSON payload to the Dashboard
      setDashboardData(data);
      setCurrentScreen('dashboard');

    } catch (error) {
      console.error("Pipeline failure:", error);
      // Fallback to demo data if the server fails
      setCurrentScreen('dashboard'); 
    }
  };

  const handleProcessingComplete = () => {
    setCurrentScreen('dashboard');
  };

  return (
    <>
      {currentScreen === 'upload' && (
        <UploadCenter onProcessStart={handleProcessStart} />
      )}
      
      {currentScreen === 'processing' && (
        <ProcessingScreen onComplete={handleProcessingComplete} />
      )}
      
      {currentScreen === 'dashboard' && (
        <Dashboard data={dashboardData} />
      )}
    </>
  );
}