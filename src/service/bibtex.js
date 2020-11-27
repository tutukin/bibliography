'use strict'

const { FIELD, TYPE, Entry } = require('bibtex-entry');

class Converter {
    fromGoogleBook(obj) {
        var book = new Entry(TYPE.book);
        try {
            book.addFields(
                this.getKey(obj),
                FIELD.author, this.convertAuthors(obj.authors),
                FIELD.title, obj.title,
                FIELD.publisher, obj.publisher,
                FIELD.year, obj.publishedDate
            );
        } catch (err) {
            // FIXME: fix the error
        }
        return book;
    }
    
    getKey(obj) {
        const firstAuthor = !!obj.authors && obj.authors.length > 0 ?
            obj.authors[0].split(/\s+/g).pop() :
            'NoAuthor';
         
        const year = !!obj.publishedDate ?
            obj.publishedDate :
            'NoDate';
         
        return `${firstAuthor}${year}`;
    }

    convertAuthors(authors) {
        // FIXME invert first/last for bibtex!
        return authors.join(' and ');
    }
}

module.exports = Converter;