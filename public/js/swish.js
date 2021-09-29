import axios from 'axios';

const fs = require('fs');
const https = require('https');
const axios = require('axios');

const agent = new https.Agent({
  cert: fs.readFileSync('./ssl/public.pem', { encoding: 'utf8' }),
  key: fs.readFileSync('./ssl/private.key', { encoding: 'utf8' }),
  ca: fs.readFileSync('./ssl/Swish_TLS_RootCA.pem', { encoding: 'utf8' }),
});

// Using Axios as HTTP library
const client = axios.create({
  httpsAgent: agent
});



// getUUID is a custom function to generate a UUID
const instructionId = getUUID();

// Setup the data object for the payment
const data = {
  payeePaymentReference: '0123456789',
  callbackUrl: 'https://example.com/swishcallback',
  payeeAlias: '1231181189',
  currency: 'SEK',
  payerAlias: '4671234768',
  amount: '100',
  message: 'Danails kök & catering'
};

client.put(
`https://mss.cpc.getswish.net/swish-cpcapi/api/v2/paymentrequests/${instructionId}`,
  data
).then((res) => {
   console.log('Payment request created')
})