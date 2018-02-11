// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const imageProcessingUtil = require('./lib/util/image-processing.js');

function triggerCamera() {
    imageProcessingUtil
        .snapPhoto()
        .then(imageBuffer => {
            window.alert(`Image Captured!\n${JSON.stringify(imageBuffer, null, 4)}`);

            document
                .querySelector('#image-window')
                .setAttribute('src', imageBuffer.toString('base64'));
        })
        .catch(error => {
            window.alert(JSON.stringify(error));
        })
}

document
    .querySelector('#camera-btn')
    .addEventListener('click', triggerCamera);