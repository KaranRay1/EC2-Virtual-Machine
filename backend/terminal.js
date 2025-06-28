import WebSocket from 'ws';
import AWS from 'aws-sdk';

export function setupTerminal(httpServer) {
  const wss = new WebSocket.Server({ server: httpServer });

  wss.on('connection', (ws, req) => {
    const instanceId = req.url.split('/')[2];
    const ssm = new AWS.SSM();
    
    // Start SSM session
    const session = ssm.startSession({
      Target: instanceId
    });
    
    // Forward terminal commands
    ws.on('message', async (command) => {
      const response = await ssm.sendCommand({
        InstanceIds: [instanceId],
        DocumentName: 'AWS-RunShellScript',
        Parameters: { commands: [command] }
      }).promise();
      
      ws.send(response.StandardOutputContent);
    });
  });
}