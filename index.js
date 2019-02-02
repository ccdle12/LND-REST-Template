const express = require('express')
const app = express()

const request = require('request')


app.get('/getinfo', async (req, res) => {
    let options = createOptions('getinfo')
    let lndRes = await doRequest(options)

    res.json({ message: lndRes })
})

function doRequest(options) {
  return new Promise(function (resolve, reject) {
    request(options, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

function createOptions(requestType) {
  return options = {
    url: `https://<some-url>/v1/${requestType}`,

    // Work-around for self-signed certificates.
    rejectUnauthorized: false,
    json: true,
    headers: {
      'Grpc-Metadata-macaroon': '',
    },
  }
}

// Server the app.
const port = '8085'
app.listen(port, () => console.log(`Server running on port: ${port}`))
