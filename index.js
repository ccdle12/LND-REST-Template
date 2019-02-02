const request = require('request')
const options = {
    url: '',
    // Work-around for self-signed certificates.
    rejectUnauthorized: false,
    json: true,
    headers: {
      'Grpc-Metadata-macaroon': '',
    },
}

request.get(options, function(error, response, body) {
  console.log(body);
});
