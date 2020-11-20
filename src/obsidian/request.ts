import { get } from 'http';

export default class Request {
    async get(url) {
        const response = await new Promise((resolve, reject) {
            const req = get(url, resolve);
            req.on('error', reject);
        });

        return await this.readResponse(response, 'utf8');
    }

    async readResponse(response, encoding): any {
        response.setEncoding(encoding);
        
        const body: string = await new Promise((resolve, reject) => {
            let content = '';
            response.on('data', chunk => content += chunk);
            response.on('end', () => resolve(content));
            response.on('error', reject);
        });
        
        return JSON.parse(body);
    }
}