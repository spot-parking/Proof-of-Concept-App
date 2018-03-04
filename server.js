'use strict';

const Boom = require('boom');
const Hapi = require('hapi');
const path = require('path');

const licensePlateRecognitionUtil = require('./lib/util/license-plate-recognition');

const server = Hapi.server({ port: 3000, host: 'localhost' });

server.route({
    method: 'POST',
    path: '/lpr',
    config: {
        payload: {
            output: 'file',
            parse: true,
            allow: 'multipart/form-data',
            maxBytes: 10485760,
            uploads: `${path.join(__dirname, "/lpr-uploads/")}`
        },

        handler: (request) => {
            let data = request.payload;

            if (data.file != null) {
                console.log(`data.file: ${JSON.stringify(data.file, null, 4)}`);

                let filePath = data.file.path;

                console.log(`filePath: ${filePath}`);

                licensePlateRecognitionUtil
                    .processImage(filePath)
                    .catch(error => {
                        throw Boom.badData(error);
                    });

                return promise;
            } else {
                console.log(`data.file is null: ${JSON.stringify(data)}`);
            }
        }
    }
});

async function bootstrap() {
    await licensePlateRecognitionUtil.start();

    await server.start();

    console.log(`Server running at: ${server.info.uri}`);
}

bootstrap()
    .catch(error => {
        console.log(`Error: ${JSON.stringify(error, null, 4)}`);
    });


