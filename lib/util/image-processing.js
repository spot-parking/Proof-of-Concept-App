const Raspistill = require('node-raspistill').Raspistill;

module.exports = {
    /**
     * Snap a photo and return a Promise containing the image buffer.
     *
     * @returns {Promise<Buffer>}
     */
    snapPhoto: () => {
        // Get new instance of PiCamera.

        let camera = new Raspistill({
            noFileSave: false,
            encoding: 'jpg',
            output: `${ __dirname }/${ moment().format('x') }.jpg`,
            noPreview: true,
            shutterspeed: 1/120, // Set shutterspeed to 1/120 of a second.
            // contrast: 0,
            // brightness: 50,
        });

        return camera.takePhoto();
    }
};