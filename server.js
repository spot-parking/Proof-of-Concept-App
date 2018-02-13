const licensePlateRecognitionUtil = require('./lib/util/license-plate-recognition');

licensePlateRecognitionUtil
    .start()
    .then(() => {
        return licensePlateRecognitionUtil
            .processImage(`/Users/stevetan/Downloads/lp.jpg`)
    })
    .then(result => {
        console.log(`RESULT: ${JSON.stringify(result, null, 4)}`);

        return licensePlateRecognitionUtil.stop();
    })
    .then(() => {
        console.log(`Server stopped.`);
    });


