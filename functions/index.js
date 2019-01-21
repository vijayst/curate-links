const functions = require('firebase-functions');
const axios = require('axios');

exports.valid = functions.https.onRequest((request, response) => {
    const url = request.query.url || request.body.url;
    if (!url) {
        response.status(400).send('URL is required');
        return;
    }
    axios
        .head(url)
        .then(res => {
            const iframe = !res.headers['x-frame-options'];
            response
                .status(200)
                .send({
                    valid: true,
                    iframe
                });
        })
        .catch(() => {
            response.status(200).send({ valid: false });
        });
});
