// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const imageProcessingUtil = require('./lib/util/image-processing.js');

function triggerCamera() {
    let cameraBtn = document
        .querySelector('#camera-btn');

    cameraBtn
        .setAttribute('disabled', true);
    cameraBtn
        .setAttribute('value', `Capturing image...`);

    imageProcessingUtil
        .snapPhoto()
        .then(imageBuffer => {
            // document
            //     .querySelector('#image-window')
            //     .setAttribute('src', imageBuffer.toString('base64'));

            cameraBtn
                .setAttribute('disabled', false);

            cameraBtn
                .setAttribute('value', `Take photo`);
        })
        .catch(error => {
            window.alert(JSON.stringify(error));
        });
}

document
    .querySelector('#camera-btn')
    .addEventListener('click', triggerCamera);