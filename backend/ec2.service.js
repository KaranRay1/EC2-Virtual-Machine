export default class EC2Service {
  constructor() {
    this.instances = [];
    // Initialize with some mock data if needed
    this.launchInstance({
      name: 'Default Instance',
      instanceType: 't2.micro',
      ami: 'ami-123456'
    });
  }

  getAllInstances() {
    return this.instances;
  }

  getInstance(id) {
    return this.instances.find(instance => instance.id === id);
  }

  launchInstance(config) {
    const id = `i-${Math.random().toString(36).substr(2, 8)}`;
    const newInstance = {
      id,
      name: config.name || `Instance-${id.substring(0, 8)}`,
      instanceType: config.instanceType,
      ami: config.ami,
      state: 'pending',
      launchedAt: new Date().toISOString()
    };

    this.instances.push(newInstance);

    // Simulate state transition (matches VMContext.tsx behavior)
    setTimeout(() => {
      this.updateInstanceState(id, 'running');
    }, 3000);

    return id;
  }

  updateInstanceState(id, state) {
    const instance = this.getInstance(id);
    if (instance) {
      instance.state = state;
      return true;
    }
    return false;
  }

  terminateInstance(id) {
    this.instances = this.instances.filter(instance => instance.id !== id);
  }
}