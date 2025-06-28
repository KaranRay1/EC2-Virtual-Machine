import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface VMInstance {
  id: string;
  name: string;
  instanceType: string;
  ami: string;
  state: 'pending' | 'running' | 'stopping' | 'stopped' | 'terminated';
  launchedAt: string;
}

interface LaunchConfig {
  name: string;
  instanceType: string;
  ami: string;
}

interface VMContextType {
  instances: VMInstance[];
  launchInstance: (config: LaunchConfig) => string;
  terminateInstance: (id: string) => void;
  getInstance: (id: string) => VMInstance | undefined;
  updateInstanceState: (id: string, state: VMInstance['state']) => void;
}

const VMContext = createContext<VMContextType | undefined>(undefined);

export const VMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [instances, setInstances] = useState<VMInstance[]>([]);
  
  // Create a new instance
  const launchInstance = useCallback((config: LaunchConfig): string => {
    const id = uuidv4();
    const newInstance: VMInstance = {
      id,
      name: config.name || `Instance-${id.substring(0, 8)}`,
      instanceType: config.instanceType,
      ami: config.ami,
      state: 'pending',
      launchedAt: new Date().toISOString(),
    };
    
    setInstances(prev => [...prev, newInstance]);
    
    // Simulate state transition from pending to running
    setTimeout(() => {
      setInstances(prev => 
        prev.map(instance => 
          instance.id === id 
            ? { ...instance, state: 'running' as const } 
            : instance
        )
      );
    }, 3000);
    
    return id;
  }, []);
  
  // Terminate an instance
  const terminateInstance = useCallback((id: string) => {
    setInstances(prev => prev.filter(instance => instance.id !== id));
  }, []);
  
  // Get a specific instance by ID
  const getInstance = useCallback((id: string) => {
    return instances.find(instance => instance.id === id);
  }, [instances]);
  
  // Update the state of an instance
  const updateInstanceState = useCallback((id: string, state: VMInstance['state']) => {
    setInstances(prev => 
      prev.map(instance => 
        instance.id === id 
          ? { ...instance, state } 
          : instance
      )
    );
  }, []);
  
  return (
    <VMContext.Provider 
      value={{ 
        instances, 
        launchInstance, 
        terminateInstance, 
        getInstance, 
        updateInstanceState 
      }}
    >
      {children}
    </VMContext.Provider>
  );
};

export const useVM = () => {
  const context = useContext(VMContext);
  if (context === undefined) {
    throw new Error('useVM must be used within a VMProvider');
  }
  return context;
};