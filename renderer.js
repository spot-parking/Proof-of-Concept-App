// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const camera = require('./lib/util/camera.js');
const moment = require('moment';
const Promise = require('bluebird');
const request = require('request-promise');

const cameraBtn = document.querySelector('#camera-btn');
// const imageDisplay = document.querySelector('#image-window');
const logDisplay = document.querySelector('#log-console');

function triggerCamera() {
    cameraBtn.setAttribute('disabled', 'true');

    log(`Capturing image...`);

    camera
        .snapPhoto(moment().format('x'))
        .then(imageBuffer => {
            log(`Captured image, sending to cloud for analysis...`);
            // imageDisplay.setAttribute('src', `data:image/jpeg;base64,${imageBuffer.toString('base64')}`);
            // TODO Send to cloud.
            return getLicensePlate(imageBuffer);
        })
        .then(result => {
            cameraBtn.removeAttribute('disabled');
        })
        .catch(error => {
            log(`Error encountered while taking photo!\n${JSON.stringify(error, null, 4)}`);
            cameraBtn.removeAttribute('disabled');
        });
}

function getLicensePlate(imageBuffer) {
    // request
    return new Promise((resolve, reject) => {
        log(`Image Buffer : ${imageBuffer}`);
        log(`Image Buffer JSON : ${JSON.stringify(imageBuffer, null, 4)}`);
        resolve(true);
    });
}

function log(text) {
    logDisplay.appendChild(document.createTextNode(`${text}`));
    logDisplay.appendChild(document.createElement('br'));
}

document
    .querySelector('#camera-btn')
    .addEventListener('click', triggerCamera);