import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useVM } from '../context/VMContext';
import { Terminal as TerminalIcon, Server, HardDrive, Cpu, MemoryStick as Memory, Play, Trash, RefreshCw } from 'lucide-react';
import Terminal from '../components/Terminal';

const LabPage = () => {
  const { instanceId } = useParams<{ instanceId: string }>();
  const { getInstance, updateInstanceState } = useVM();
  const [instance, setInstance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (instanceId) {
      const vmInstance = getInstance(instanceId);
      setInstance(vmInstance);
      setIsLoading(false);
    }
  }, [instanceId, getInstance]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="mb-4">
            <svg className="animate-spin h-10 w-10 text-emerald-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-xl text-slate-300">Loading lab environment...</p>
        </div>
      </div>
    );
  }
  
  if (!instance) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-red-500/20 p-6 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Instance Not Found</h2>
          <p className="text-slate-300 mb-6">The instance you're looking for doesn't exist or has been terminated.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Server className="text-emerald-400" size={24} />
            {instance.name}
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
              instance.state === 'running' ? 'bg-green-500/20 text-green-400' : 
              instance.state === 'stopped' ? 'bg-red-500/20 text-red-400' : 
              'bg-yellow-500/20 text-yellow-400'
            }`}>
              {instance.state}
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Instance ID: {instance.id}</p>
        </div>
        
        <div className="flex gap-2">
          {instance.state === 'running' ? (
            <button 
              onClick={() => updateInstanceState(instance.id, 'stopped')}
              className="flex items-center gap-1 px-3 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-md transition duration-200"
            >
              <Trash size={16} />
              Stop
            </button>
          ) : (
            <button 
              onClick={() => updateInstanceState(instance.id, 'running')}
              className="flex items-center gap-1 px-3 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-md transition duration-200"
            >
              <Play size={16} />
              Start
            </button>
          )}
          
          <button 
            className="flex items-center gap-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-md transition duration-200"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 flex flex-col">
          <div className="bg-slate-800 rounded-t-lg p-4 border-b border-slate-700 flex items-center gap-2">
            <TerminalIcon className="text-emerald-400" size={20} />
            <h2 className="font-medium">Terminal</h2>
          </div>
          
          <div className="flex-grow bg-slate-800 rounded-b-lg h-[70vh]">
            {instance.state === 'running' ? (
              <Terminal />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-6">
                  <div className="bg-yellow-500/20 p-4 rounded-lg mb-4 inline-block">
                    <TerminalIcon className="text-yellow-400" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Instance is not running</h3>
                  <p className="text-slate-400 mb-4">Start the instance to access the terminal.</p>
                  <button 
                    onClick={() => updateInstanceState(instance.id, 'running')}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-md transition duration-200"
                  >
                    Start Instance
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Instance Details</h2>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-slate-400 mb-1">Instance Type</div>
              <div className="flex items-center gap-2">
                <Cpu size={16} className="text-slate-500" />
                <span>{instance.instanceType}</span>
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-slate-400 mb-1">AMI</div>
              <div className="flex items-center gap-2">
                <HardDrive size={16} className="text-slate-500" />
                <span>{instance.ami}</span>
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-slate-400 mb-1">Resources</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Cpu size={14} className="text-slate-500" />
                  <span>1 vCPU</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Memory size={14} className="text-slate-500" />
                  <span>1 GiB Memory</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-slate-400 mb-1">Status</div>
              <div className={`text-sm ${
                instance.state === 'running' ? 'text-green-400' : 
                instance.state === 'stopped' ? 'text-red-400' : 
                'text-yellow-400'
              }`}>
                {instance.state.charAt(0).toUpperCase() + instance.state.slice(1)}
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-slate-400 mb-1">Launched</div>
              <div className="text-sm">{new Date(instance.launchedAt).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabPage;