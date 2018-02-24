// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const _ = require('lodash');
const camera = require('./lib/util/camera.js');
const fs = require('fs');
const moment = require('moment');
const request = require('request-promise');

const cameraBtn = document.querySelector('#camera-btn');
// const imageDisplay = document.querySelector('#image-window');
const logDisplay = document.querySelector('#log-console');

function triggerCamera() {
    cameraBtn.setAttribute('disabled', 'true');

    log(`Capturing image...`);

    const filePath = `${ __dirname }/${  moment().format('x') }.jpg`;

    camera
        .snapPhoto(filePath)
        .then(imageBuffer => {
            log(`Captured image, sending to cloud for analysis...`);
            // imageDisplay.setAttribute('src', `data:image/jpeg;base64,${imageBuffer.toString('base64')}`);
            // TODO Send to cloud.
            return getLicensePlate(filePath);
        })
        .then(response => {
            if (_.isArray(response.results)) {
                _.forEach(response.results, result => {
                    log(`Result: ${result.plate} (Confidence: ${result.confidence}%)`);
                    log(`    -> Candidates: ${JSON.stringify(_.map(result.candidates, candidate => { return candidate.plate }))}`);
                });
            }

            cameraBtn.removeAttribute('disabled');
        })
        .catch(error => {
            log(`Error encountered while taking photo!\n${JSON.stringify(error, null, 4)}`);
            cameraBtn.removeAttribute('disabled');
        });
}

function getLicensePlate(filePath) {
    return request
        .post({
            uri:`http://159.65.8.52/lpr`,
            json: true,
            formData: {
                file: {
                    value: fs.createReadStream(filePath),
                    options: {
                        filename: `image.jpeg`,
                        contentType: 'image/jpeg'
                    }
                }
            }
        })
}

function log(text) {
    logDisplay.appendChild(document.createTextNode(`${text}`));
    logDisplay.appendChild(document.createElement('br'));
}

document
    .querySelector('#camera-btn')
    .addEventListener('click', triggerCamera);