const net = require('net')
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const url = require('url') 
// const port = process.env.PORT ? process.env.PORT - 100 : 3333
const port=3333;
process.env.ELECTRON_START_URL = `http://localhost:${port}`


const client = new net.Socket()

let startedElectron = false
const tryConnection = async () => { 
  client.connect({ port }, async () => {
    client.end()
    if (!startedElectron) {
  

      console.log('starting electron')
      startedElectron = true 

      const { stdout, stderr } = await exec('yarn electron');
      console.log('stdout:', stdout);
      console.error('stderr:', stderr);
    }
  })
}

try {
  tryConnection()
} catch (error) {
  console.error(error)
}

client.on('error', () => {
  setTimeout(tryConnection, 1000)
})