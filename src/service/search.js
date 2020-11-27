const isbn = require('node-isbn');
const { validate } = require('isbn-util');
const Converter = require('./bibtex');

const self  = module.exports = {
    search: async (id) => {
        if (!validate(id)) {
            throw Error('Invalid ISBN');
        }
        
        const response = await isbn.resolve(id);
        const bibtex = new Converter().fromGoogleBook(response);
        const validationErrors = bibtex.validate();
        if (validationErrors.length > 0) {
            throw Error(`Invalid description is retrieved: ${validationErrors.join('; ')}`);
        }
        return { bibtex: bibtex.toString() };
    }
};
