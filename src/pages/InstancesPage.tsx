import React from 'react';
import { Link } from 'react-router-dom';
import { useVM } from '../context/VMContext';
import { Server, Terminal, Trash, Play, Clock, Cpu } from 'lucide-react';

const InstancesPage = () => {
  const { instances, updateInstanceState, terminateInstance } = useVM();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Server className="text-emerald-400" size={28} />
          My Instances
        </h1>
        
        <Link 
          to="/launch" 
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition duration-200"
        >
          Launch New VM
        </Link>
      </div>
      
      {instances.length === 0 ? (
        <div className="bg-slate-800 rounded-lg p-8 text-center">
          <div className="bg-slate-700 p-4 rounded-full w-fit mx-auto mb-4">
            <Server className="text-slate-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Instances Found</h2>
          <p className="text-slate-400 mb-6">You haven't launched any virtual machines yet.</p>
          <Link 
            to="/launch" 
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition duration-200"
          >
            Launch Your First VM
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instances.map((instance) => (
            <div 
              key={instance.id}
              className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-950/5 hover:border-slate-600"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold truncate">{instance.name}</h2>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    instance.state === 'running' ? 'bg-green-500/20 text-green-400' : 
                    instance.state === 'stopped' ? 'bg-red-500/20 text-red-400' : 
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {instance.state}
                  </span>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-slate-400">
                    <Cpu className="mr-2" size={14} />
                    <span>{instance.instanceType}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-slate-400">
                    <Clock className="mr-2" size={14} />
                    <span>Launched: {new Date(instance.launchedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mb-4">
                  <Link
                    to={`/lab/${instance.id}`}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition duration-200"
                  >
                    <Terminal size={16} />
                    <span>Open Lab</span>
                  </Link>
                  
                  {instance.state === 'running' ? (
                    <button 
                      onClick={() => updateInstanceState(instance.id, 'stopped')}
                      className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-md transition duration-200"
                      aria-label="Stop instance"
                    >
                      <Trash size={16} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => updateInstanceState(instance.id, 'running')}
                      className="p-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-md transition duration-200"
                      aria-label="Start instance"
                    >
                      <Play size={16} />
                    </button>
                  )}
                </div>
                
                <div className="text-xs text-slate-500">
                  <span className="font-medium">ID:</span> {instance.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default InstancesPage;