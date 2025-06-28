import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVM } from '../context/VMContext';
import { Server, Cpu, HardDrive, MemoryStick as Memory } from 'lucide-react';

const instanceTypes = [
  { id: 't2.micro', name: 't2.micro', cpu: '1 vCPU', ram: '1 GB', description: 'Low to moderate baseline performance' },
  { id: 't2.small', name: 't2.small', cpu: '1 vCPU', ram: '2 GB', description: 'Low to moderate baseline performance' },
  { id: 't2.medium', name: 't2.medium', cpu: '2 vCPU', ram: '4 GB', description: 'Low to moderate baseline performance' }
];

const amis = [
  { id: 'ami-1234', name: 'Ubuntu 22.04 LTS', description: 'Latest Ubuntu LTS release' },
  { id: 'ami-5678', name: 'Amazon Linux 2', description: 'AWS optimized Linux image' },
  { id: 'ami-9012', name: 'CentOS 8', description: 'Community Enterprise Operating System' }
];

const LaunchPage = () => {
  const navigate = useNavigate();
  const { launchInstance } = useVM();
  
  const [isLaunching, setIsLaunching] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    instanceType: 't2.micro',
    ami: 'ami-1234',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLaunching(true);
    
    try {
      const instanceId = await launchInstance(formData);
      setTimeout(() => {
        navigate(`/lab/${instanceId}`);
      }, 3000); // Simulate launch delay
    } catch (error) {
      console.error('Failed to launch instance:', error);
      setIsLaunching(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-slate-800 rounded-lg p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Server size={28} className="text-emerald-400" />
          <h1 className="text-3xl font-bold">Launch Virtual Machine</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 font-medium text-slate-300">
              Instance Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="My VM Instance"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 font-medium text-slate-300">
              Amazon Machine Image (AMI)
            </label>
            <div className="grid gap-4 mb-4">
              {amis.map((ami) => (
                <label 
                  key={ami.id}
                  className={`flex items-start p-4 border ${formData.ami === ami.id ? 'border-emerald-500 bg-slate-700' : 'border-slate-600 bg-slate-750'} rounded-md cursor-pointer hover:bg-slate-700 transition duration-200`}
                >
                  <input
                    type="radio"
                    name="ami"
                    value={ami.id}
                    checked={formData.ami === ami.id}
                    onChange={handleChange}
                    className="mt-1 mr-3"
                  />
                  <div>
                    <div className="font-medium">{ami.name}</div>
                    <div className="text-sm text-slate-400 mt-1">{ami.description}</div>
                    <div className="text-xs text-slate-500 mt-1">AMI ID: {ami.id}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <label className="block mb-2 font-medium text-slate-300">
              Instance Type
            </label>
            <div className="grid gap-4">
              {instanceTypes.map((type) => (
                <label 
                  key={type.id}
                  className={`flex items-start p-4 border ${formData.instanceType === type.id ? 'border-emerald-500 bg-slate-700' : 'border-slate-600 bg-slate-750'} rounded-md cursor-pointer hover:bg-slate-700 transition duration-200`}
                >
                  <input
                    type="radio"
                    name="instanceType"
                    value={type.id}
                    checked={formData.instanceType === type.id}
                    onChange={handleChange}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-grow">
                    <div className="font-medium">{type.name}</div>
                    <div className="text-sm text-slate-400 mt-1">{type.description}</div>
                    <div className="flex gap-4 mt-2">
                      <div className="flex items-center text-xs text-slate-500">
                        <Cpu size={14} className="mr-1" />
                        {type.cpu}
                      </div>
                      <div className="flex items-center text-xs text-slate-500">
                        <Memory size={14} className="mr-1" />
                        {type.ram}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLaunching}
            className={`w-full p-3 rounded-md font-medium transition duration-200 
              ${isLaunching 
                ? 'bg-slate-600 cursor-not-allowed' 
                : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`
            }
          >
            {isLaunching ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Launching Instance...
              </div>
            ) : 'Launch Instance'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LaunchPage;