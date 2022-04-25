const { DydxClient } = require('@dydxprotocol/v3-client')
const Web3 = require('web3')
const WebSocket = require('ws')

const HTTP_HOST = 'https://api.dydx.exchange';
const WS_HOST = 'wss://api.dydx.exchange/v3/ws';

// Parameters
const ADDRESS = '0xWalletAddress';         // ENTER YOUR ETHEREUM WALLET ADDRESS
const ETHEREUM_PRIVATE_KEY = 'privatekey'; // ENTER YOUR ETHEREUM PRIVATE KEY

// NOTE: Set up web3 however your prefer to authenticate to your Ethereum account.
web3 = new Web3()
web3.eth.accounts.wallet.add(ETHEREUM_PRIVATE_KEY)

  ; ((async () => {

    client = new DydxClient(HTTP_HOST, { web3 });
    const apiCreds = await client.onboarding.recoverDefaultApiCredentials(ADDRESS);
    client.apiKeyCredentials = apiCreds;

    const keyPairWithYCoordinate = await client.onboarding.deriveStarkKey(
      ADDRESS,
    );


    console.log('API-KEYS = ', apiCreds)
    console.log('STARK-KEYS = ', keyPairWithYCoordinate);

    // const timestamp = new Date().toISOString()
    // const signature = client.private.sign({
    //   requestPath: '/ws/accounts',
    //   method: 'GET',
    //   isoTimestamp: timestamp,
    // });
    // const msg = {
    //   type: 'subscribe',
    //   channel: 'v3_accounts',
    //   accountNumber: '0',
    //   apiKey: apiCreds.key,
    //   signature,
    //   timestamp,
    //   passphrase: apiCreds.passphrase
    // }

    // const ws = new WebSocket(WS_HOST);

    // ws.on('message', (message) => {
    //   console.log('<', message)
    // });

    // ws.on('open', () => {
    //   console.log('>', msg)
    //   ws.send(JSON.stringify(msg))
    // });

    // ws.on('error', (error) => {
    //   console.log('<', error)
    // });

    // ws.on('close', () => {
    //   console.log('Connection closed')
    // });

  })()).then(() => console.log('Done')).catch(console.error);