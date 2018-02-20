const licensePlateRecognitionUtil = require('./lib/util/license-plate-recognition');
const path = require('path');

licensePlateRecognitionUtil
    .start()
    .then(() => {
        return licensePlateRecognitionUtil
            .processImage(path.join(__dirname, `lp-1.jpg`));
    })
    .then(result => {
        console.log(`RESULT 1: ${JSON.stringify(result, null, 4)}`);

        return licensePlateRecognitionUtil
            .processImage(path.join(__dirname, `lp-2.jpg`));
    })
    .then(result => {
        console.log(`RESULT 2: ${JSON.stringify(result, null, 4)}`);

        return licensePlateRecognitionUtil.stop();
    })
    .then(() => {
        console.log(`Server stopped.`);
    });


