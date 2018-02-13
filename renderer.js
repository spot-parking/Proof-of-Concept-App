// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const camera = require('./lib/util/camera.js');
const request = require('request-promise');

const cameraBtn = document.querySelector('#camera-btn');
// const imageDisplay = document.querySelector('#image-window');
const logDisplay = document.querySelector('#log-console');

function triggerCamera() {
    cameraBtn.setAttribute('disabled', 'true');

    log(`Capturing image...`);

    camera
        .snapPhoto()
        .then(imageBuffer => {
            log(`Captured image, sending to cloud for analysis...`);
            // imageDisplay.setAttribute('src', `data:image/jpeg;base64,${imageBuffer.toString('base64')}`);
            // TODO Send to cloud.
            cameraBtn.removeAttribute('disabled');
        })
        .catch(error => {
            log(`Error encountered while taking photo!\n${JSON.stringify(error, null, 4)}`);
            cameraBtn.removeAttribute('disabled');
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