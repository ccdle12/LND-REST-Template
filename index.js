const express = require('express')
const app = express()

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


app.get('/getinfo', async (req, res) => {
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

// Server the app.
const port = '8085'
app.listen(port, () => console.log(`Server running on port: ${port}`))
