import { expect, tap } from 'tapbundle'
import * as smartdelay from 'smartdelay'

import * as smartwebdriver from '../dist/index'

let mySmartwebdriver: smartwebdriver.SmartWebdriver

tap.test('should create a SmartWebdriver instance', async () => {
  mySmartwebdriver = new smartwebdriver.SmartWebdriver({provider: 'local'})
  expect(mySmartwebdriver).to.be.instanceof(smartwebdriver.SmartWebdriver)
})

tap.test('should install the drivers', async () => {
  await mySmartwebdriver.installLocal()
})

tap.test('should start the server', async () => {
  await mySmartwebdriver.startLocal()
})

tap.test('server should stay alive', async () => {
  await smartdelay.delayFor(3000)
})

tap.test('should be able to kill the server', async () => {
  await mySmartwebdriver.stopLocal()
})

tap.start()
