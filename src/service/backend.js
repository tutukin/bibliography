'use strict';

const fastify = require('fastify')({logger: true});
const { search } = require('./search');

fastify.register(require('fastify-cors'));

fastify.route({
    method: 'GET',
    url: '/',
    schema: {
        querystring: {
            id: { type: 'string' }
        },

        response: {
            200: {
                type: 'object',
                properties: {
                    key: { type: 'string' },
                    description: { type: 'string' }
                }
            }
        }
    },

    preHandler: async (req, res) => {
        // executes before handler.
    },

    handler: async (req, res) => {
        fastify.log.info(`---Requested an ID: ${req.query.id}`);
        const result = await search(req.query.id);
        return result;
    }
});

const start = async () => {
    try {
        await fastify.listen(3000);
        fastify.log.info(`Bibliography search service is listening on ${fastify.server.address().port}`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    } 
};

start();