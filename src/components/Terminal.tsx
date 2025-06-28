import React, { useState, useEffect, useRef } from 'react';

interface CommandHistory {
  command: string;
  output: string;
}

const Terminal = () => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Initialize terminal with welcome message
  useEffect(() => {
    setCommandHistory([{
      command: '',
      output: 'Welcome to CloudLab Terminal! Type "help" to see available commands.'
    }]);
  }, []);
  
  // Auto-scroll to bottom when new commands are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);
  
  // Focus input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setCursorPosition(e.target.selectionStart || 0);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand();
    }
  };
  
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const executeCommand = () => {
    const trimmedInput = input.trim();
    
    if (trimmedInput) {
      let output = '';
      
      // Simple command processing
      switch (trimmedInput.split(' ')[0].toLowerCase()) {
        case 'help':
          output = `
Available commands:
  help           - Show this help message
  clear          - Clear the terminal
  ls             - List directory contents
  pwd            - Print working directory
  echo [text]    - Print text
  date           - Show current date
  whoami         - Show current user
  mkdir [name]   - Create a directory
  touch [name]   - Create a file
  cat [file]     - Show file contents
  uname -a       - Show system information
`;
          break;
        case 'clear':
          setCommandHistory([]);
          setInput('');
          return;
        case 'ls':
          output = 'Documents  Downloads  Pictures  Desktop  scripts.sh  data.txt';
          break;
        case 'pwd':
          output = '/home/user';
          break;
        case 'echo':
          output = trimmedInput.substring(5) || '';
          break;
        case 'date':
          output = new Date().toString();
          break;
        case 'whoami':
          output = 'user';
          break;
        case 'mkdir':
          const dirName = trimmedInput.split(' ')[1];
          output = dirName ? `Directory '${dirName}' created.` : 'mkdir: missing operand';
          break;
        case 'touch':
          const fileName = trimmedInput.split(' ')[1];
          output = fileName ? `File '${fileName}' created.` : 'touch: missing operand';
          break;
        case 'cat':
          const catFileName = trimmedInput.split(' ')[1];
          if (!catFileName) {
            output = 'cat: missing operand';
          } else if (catFileName === 'data.txt') {
            output = 'This is a sample file content.\nYou can practice bash commands here.';
          } else if (catFileName === 'scripts.sh') {
            output = '#!/bin/bash\n\necho "Hello from CloudLab!"\n\n# Add your bash scripting here';
          } else {
            output = `cat: ${catFileName}: No such file or directory`;
          }
          break;
        case 'uname':
          output = 'Linux cloudlab 5.15.0-generic #1 SMP x86_64 GNU/Linux';
          break;
        default:
          output = `Command not found: ${trimmedInput}`;
      }
      
      setCommandHistory([...commandHistory, { command: trimmedInput, output }]);
      setInput('');
    }
  };
  
  return (
    <div 
      ref={terminalRef}
      className="h-full bg-slate-900 text-green-400 font-mono p-4 overflow-auto" 
      onClick={handleTerminalClick}
    >
      <div className="pb-4">
        {commandHistory.map((entry, index) => (
          <div key={index} className="mb-2">
            {entry.command && (
              <div className="flex">
                <span className="text-blue-400 mr-2">user@cloudlab:~$</span>
                <span>{entry.command}</span>
              </div>
            )}
            <div className="whitespace-pre-wrap text-green-300">{entry.output}</div>
          </div>
        ))}
        
        <div className="flex items-center">
          <span className="text-blue-400 mr-2">user@cloudlab:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent border-none outline-none text-green-300 caret-green-300"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;