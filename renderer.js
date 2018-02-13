// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const imageProcessingUtil = require('./lib/util/image-processing.js');

function triggerCamera() {
    let cameraBtn = document.querySelector('#camera-btn');
    let logDisplay = document.querySelector('#log-console');

    cameraBtn.setAttribute('disabled', true);
    logDisplay.appendChild(document.createTextNode(`Capturing image...`));
    logDisplay.appendChild(document.createElement('br'));

    imageProcessingUtil
        .snapPhoto()
        .then(imageBuffer => {
            let imgElement = document.createElement('img');
            imgElement.setAttribute('src', `data:image/jpeg;base64,${imageBuffer.toString('base64')}`);
            logDisplay.appendChild(imgElement);
            logDisplay.appendChild(document.createElement('br'));
        })
        .catch(error => {
            logDisplay.appendChild(document.createTextNode(`Error encountered while taking photo!\n${JSON.stringify(error, null, 4)}`));
            logDisplay.appendChild(document.createElement('br'));
        })
        .finally(() => {
            cameraBtn.setAttribute('disabled', false);
        });
}

document
    .querySelector('#camera-btn')
    .addEventListener('click', triggerCamera);