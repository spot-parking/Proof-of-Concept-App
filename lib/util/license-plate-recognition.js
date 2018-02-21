const openalpr = require('@spot-parking/node-openalpr');
const Promise = require('bluebird');

module.exports = {
    /**
     * Snap a photo and return a Promise containing the image buffer.
     *
     * @returns {Promise<Buffer>}
     */
    start: () => {
        return new Promise((resolve, reject) => {
            try {
                openalpr.Start();

                console.log(`Running OpenALPR (${openalpr.GetVersion()})`);

                resolve(true);
            } catch (ex) {
                reject(ex);
            }
        });
    },

    stop: () => {
        return new Promise((resolve, reject) => {
            try {
                console.log(`Stopping OpenALPR...`);
                openalpr.Stop();

                resolve();
            } catch (ex) {
                reject(ex);
            }
        });
    },

    processImage: (path) => {
        return new Promise((resolve, reject) => {
            openalpr.IdentifyLicense(path, {
                country_code: 'sg' // TODO Not working. how to fix?
            }, (error, output) => {
                if (error != null) {
                    reject(error);
                }

                resolve(output);
            })
        });
    }
};
