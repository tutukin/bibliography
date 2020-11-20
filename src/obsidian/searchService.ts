import Request from './request';

export default class SearchService {
    getUrl(id: string) {
        return `http://localhost:3000/?id=${id}`;
    }

    async search(id) {
        const request = new Request();
        return await request.get(this.getUrl(id))
    }
}