const isbn = require('node-isbn');
const { validate } = require('isbn-util');

const self  = module.exports = {
    search: async (id) => {
        if (!validate(id)) {
            throw Error('Invalid ISBN');
        }
        
        const response = await isbn.resolve(id);
        
        return {
            key: self.getKey(response),
            description: self.getDescription(response)
        };
    },

    getKey(response) {
        const firstAuthor = !!response.authors && response.authors.length > 0 ?
            response.authors[0].split(/\s+/g).pop() :
            'NoAuthor';
        
        const year = !!response.publishedDate ?
            response.publishedDate :
            'NoDate';
        
        return `${firstAuthor}${year}`;
    },

    getDescription(response) {
        let description = [];

        if (!!response.authors && response.authors.length > 0) {
            description.push(`${response.authors[0]}.`);
        }

        const title = !!response.title ? response.title : 'Untitled';
        description.push(`${title}.`);

        if (!!response.publishedDate) {
            description.push(response.publishedDate);
        }

        return description.join(' ');
    }
};
