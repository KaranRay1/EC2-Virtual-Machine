import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Cpu, Server, Code } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 px-4 flex flex-col items-center text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
          Launch Virtual Machines Instantly
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mb-10">
          Create your own cloud environment for scripting and programming practice with just a few clicks.
        </p>
        <Link 
          to="/launch" 
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-md text-lg transition duration-200 animate-pulse"
        >
          Launch Now
        </Link>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-700 p-6 rounded-lg transition-transform duration-300 hover:scale-105">
              <div className="bg-emerald-500/20 p-3 rounded-full w-fit mb-4">
                <Cpu className="text-emerald-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant VMs</h3>
              <p className="text-slate-300">Launch virtual machines in seconds with preconfigured environments.</p>
            </div>
            
            <div className="bg-slate-700 p-6 rounded-lg transition-transform duration-300 hover:scale-105">
              <div className="bg-emerald-500/20 p-3 rounded-full w-fit mb-4">
                <Terminal className="text-emerald-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Bash Scripting</h3>
              <p className="text-slate-300">Practice bash scripting in a real Linux environment.</p>
            </div>
            
            <div className="bg-slate-700 p-6 rounded-lg transition-transform duration-300 hover:scale-105">
              <div className="bg-emerald-500/20 p-3 rounded-full w-fit mb-4">
                <Server className="text-emerald-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Multiple Instances</h3>
              <p className="text-slate-300">Create and manage multiple lab environments simultaneously.</p>
            </div>
            
            <div className="bg-slate-700 p-6 rounded-lg transition-transform duration-300 hover:scale-105">
              <div className="bg-emerald-500/20 p-3 rounded-full w-fit mb-4">
                <Code className="text-emerald-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Coding Practice</h3>
              <p className="text-slate-300">Perfect environment for practicing programming and DevOps skills.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to start coding?</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Launch your personal cloud lab environment now and start practicing.
          </p>
          <Link 
            to="/launch" 
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-md text-lg transition duration-200"
          >
            Launch VM
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;