// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const imageProcessingUtil = require('./lib/util/image-processing.js');
const request = require('request-promise');

const cameraBtn = document.querySelector('#camera-btn');
// const imageDisplay = document.querySelector('#image-window');
const logDisplay = document.querySelector('#log-console');

function triggerCamera() {
    cameraBtn.setAttribute('disabled', true);

    log(`Capturing image...`);

    imageProcessingUtil
        .snapPhoto()
        .then(imageBuffer => {
            log(`Captured image, sending to cloud for analysis...`);
            // imageDisplay.setAttribute('src', `data:image/jpeg;base64,${imageBuffer.toString('base64')}`);
            // TODO Send to cloud.
            cameraBtn.setAttribute('disabled', false);
        })
        .catch(error => {
            log(`Error encountered while taking photo!\n${JSON.stringify(error, null, 4)}`);
            cameraBtn.setAttribute('disabled', false);
        });
}

function log(text) {
    logDisplay.appendChild(document.createTextNode(`${text}`));
    logDisplay.appendChild(document.createElement('br'));
}

function getLicensePlate(imageBuffer) {
    // request
}

document
    .querySelector('#camera-btn')
    .addEventListener('click', triggerCamera);