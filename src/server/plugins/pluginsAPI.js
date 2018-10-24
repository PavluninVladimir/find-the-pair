'use strict';

const pluginFetchAPI = {
    name: 'fetchAPI',
    version: '0.1.0',
    register: async function (server, options) {

        // Create a route for example

        server.route({
            method: 'POST',
            path: options.url,
            handler: function (request, h) {
                return h.response('hello, world').code(401);
            }
        });

        // etc ...
        // await someAsyncMethods();
    }
};

export default pluginFetchAPI;