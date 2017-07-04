import { expect, tap } from 'tapbundle'
import * as smartdelay from 'smartdelay'

import * as smartwebdriver from '../dist/index'

let mySmartwebdriver: smartwebdriver.SmartWebdriver

tap.test('should create a SmartWebdriver instance', async () => {
  mySmartwebdriver = new smartwebdriver.SmartWebdriver()
  expect(mySmartwebdriver).to.be.instanceof(smartwebdriver.SmartWebdriver)
})

tap.test('should get a valid client', async () => {
  let client = (await mySmartwebdriver.getLocalClient()).client
  await client.init().url('https://google.com')
  let text = await client.getText('#_eEe')
  await client.end()
  await client.init().url('https://thalia.de').click('[data-test="loginLink"]').end()
  expect(text).to.equal('Google.de angeboten auf: English')
})

tap.test('should be able to kill the server', async () => {
  await mySmartwebdriver.stopSmart()
})

tap.start()
