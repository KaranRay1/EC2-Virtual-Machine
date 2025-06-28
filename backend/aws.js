import AWS from 'aws-sdk';

export class VMController {
  constructor() {
    this.ec2 = new AWS.EC2({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
      }
    });
    
    this.labConfigs = {
      'ami-1234': { // Ubuntu
        initScript: 'apt update && apt install -y docker.io nodejs python3'
      },
      'ami-5678': { // Amazon Linux
        initScript: 'yum install -y docker nodejs python3'
      }
    };
  }

  async launchInstance({ name, ami, instanceType }) {
    const params = {
      ImageId: ami,
      InstanceType: instanceType,
      MinCount: 1,
      MaxCount: 1,
      TagSpecifications: [{
        ResourceType: 'instance',
        Tags: [{ Key: 'Name', Value: name }]
      }],
      UserData: Buffer.from(this.labConfigs[ami].initScript).toString('base64')
    };

    const data = await this.ec2.runInstances(params).promise();
    return data.Instances[0];
  }
}