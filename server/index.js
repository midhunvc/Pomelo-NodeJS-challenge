'use strict';
const Hapi = require('@hapi/hapi');
const config = require('./config/config');
const converter = require('./controller/jsonController');
const pager = require('./controller/pager')

//  function to start the server
const init = async () => {
    const server = Hapi.server({
        port: config.config.port,
        host: config.config.host
    });
// post api for json conversion 
    server.route({
            method: 'POST',
            path: '/jsonConvert',
            handler: function (request, h) {
                try {
                    // calling a function to convert the json and storing in a variable ...
                    const result = converter.convert(request.payload.data);
                    if(result){
                        return result;
                    }
                } catch (error) {
                    return ({
                        status: 'failed'
                    }) ;
                }
            }
        });
   
    server.route({
            method: 'GET',
            path: '/pagination',
            handler: async (request, reply) =>{
                try {
                    const result = await pager.pagination();
                    console.log(result);
                    if(result){
                        return result;
                    }
                 
                } catch (error) {
                    return ({
                        status: 'failed'
                    }) ;
                }
            }
        });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();