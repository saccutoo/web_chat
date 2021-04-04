import Consul from 'consul';
import IConfig from '../../config-interface';
const config: IConfig = require('../../../../appConfig.json');
class ConsulConfig {
    consul;
    constructor() {
        this.consul = new Consul({
            host: config.consul.host,
            port: config.consul.port,
            promisify: true,
        });

        //Service registration and health check configuration
        this.consul.agent.service.register({
            name: config.consul.serviceName,
            address: process.env.NODE_HOST,
            port: parseInt(process.env.NODE_PORT || '3001'),
            check: {
                http: 'http://' + process.env.NODE_HOST + ':' + process.env.NODE_PORT + '/health',
                interval: '10s',

            }
        }, (err, result) => {
            if (err) {
                console.error(err);
                throw err;
            }

            console.log(config.consul.serviceName + ' registered successfully!')
        })
    }

    async getConfig(key: string) {
        const result: any = await this.consul.kv.get(key);

        if (!result) {
            return Promise.reject(key + 'does not exist');
        }

        return JSON.parse(result.toString());
    }

    //Read user configuration simple package
    async getUserConfig(key: string) {
        const result = await this.getConfig('develop/user');

        if (!key) {
            return result;
        }

        return result[key];
    }

    //Update user configuration simple package
    async setUserConfig(key: string, val: any) {
        const user = await this.getConfig('develop/user');

        user[key] = val;

        return this.consul.kv.set('develop/user', JSON.stringify(user))
    }
}

export default ConsulConfig;
