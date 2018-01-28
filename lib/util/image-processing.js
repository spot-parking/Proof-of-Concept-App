const PiCamera = require('pi-camera');
const moment = require('moment');

class Camera {
    constructor() {
        // Honestly, we don't care about the other options for now except that
        // we're want the camera to be take photos.
        this.instance = new PiCamera({
            mode: 'photo',
            output: `${ __dirname }/${ moment().format('x') }.jpg`,
            nopreview: true
        });
    }

    snapPhoto() {

    }
}

module.exports = new Camera();
