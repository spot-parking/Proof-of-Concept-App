'use strict';

const fs = require('fs');
const Boom = require('boom');
const Hapi = require('hapi');
const path = require('path');
const streamToPromise = require('stream-to-promise');
const uuid = require('uuid/v4');

const licensePlateRecognitionUtil = require('./lib/util/license-plate-recognition');

const server = Hapi.server({ port: 3000, host: 'localhost' });

server.route({
    method: 'POST',
    path: '/lpr',
    config: {
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },

        handler: (request) => {
            let data = request.payload;

            if (data.file != null) {
                console.log(`data.file: ${JSON.stringify(data.file, null, 4)}`);

                let fileName = data.file.hapi.filename;
                let filePath = path.join(__dirname, "/lpr-uploads/", uuid());

                console.log(`filePath: ${filePath}`);

                fs.mkdirSync(filePath);

                filePath = path.join(filePath, fileName);

                const file = fs.createWriteStream(filePath);

                const promise = streamToPromise(file)
                    .then(() => {
                        return licensePlateRecognitionUtil
                            .processImage(filePath)
                    })
                    .catch(error => {
                        throw Boom.badData(error);
                    });

                data.file.pipe(file);

                return promise;
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


