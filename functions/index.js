const functions = require('firebase-functions');
const axios = require('axios');
const urlMetadata = require('url-metadata');

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

exports.meta = functions.https.onRequest((request, response) => {
    const url = request.query.url || request.body.url;
    if (!url) {
        response.status(400).send('URL is required');
        return;
    }
    urlMetadata(url)
        .then(metadata => {
            let { title, image, description } = metadata;
            image = image || metadata['og:image'];
            description = description || metadata['og:description'];
            response
                .status(200)
                .send({
                   title,
                   image,
                   description
                });
        })
        .catch(() => {
            response.status(500).send('Unknown error');
        });
});
