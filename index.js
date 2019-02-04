const express = require('express')
const app = express()

const request = require('request')

const bodyParser = require("body-parser");

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.get('/getinfo', async (req, res) => {
    console.log('request hit')
    let options = createOptions('getinfo')
    let lndRes = await doRequest(options, null)

    res.json({ message: lndRes })
})

app.post('/payinvoice', async (req, res) => {
    console.log('pay invoice hit')
    console.log(req.body.invoice)
    let reqBody = {
        payment_request: req.body.invoice
    }
    let options = createOptions('channels/transactions', reqBody)
    let lndRes = await doPostRequest(options, reqBody)

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

function doPostRequest(options) {
  return new Promise(function (resolve, reject) {
    request.post(options, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}
function createOptions(requestType, reqBody) {
  console.log(`In Create options: ${reqBody}`)
  return options = {
    url: `https://:8080/v1/${requestType}`,

    // Work-around for self-signed certificates.
    rejectUnauthorized: false,
    json: true,
    headers: {
      'Grpc-Metadata-macaroon': '',
    },
    form: JSON.stringify(reqBody)  
  }
}

// Server the app.
const port = '8085'
app.listen(port, () => console.log(`Server running on port: ${port}`))
