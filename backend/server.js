import express from 'express';
import cors from 'cors';
import { VMController } from './vm-manager/aws.js';
import { setupTerminal } from './vm-manager/terminal.js';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize VM Manager
const vmManager = new VMController();

// API Endpoints
app.post('/api/instances', async (req, res) => {
  const { name, ami, instanceType } = req.body;
  
  try {
    const instance = await vmManager.launchInstance({
      name: name || `Lab-${Date.now()}`,
      ami,
      instanceType
    });
    
    res.status(201).json({
      id: instance.InstanceId,
      terminalUrl: `/terminal/${instance.InstanceId}`,
      details: instance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// WebSocket Terminal
const server = app.listen(3000, () => {
  console.log('API running on port 3000');
  setupTerminal(server); // Initialize terminal server
});