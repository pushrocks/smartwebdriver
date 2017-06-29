import { expect, tap } from 'tapbundle'
import * as smartwebdriver from '../dist/index'

let mySmartwebdriver: smartwebdriver.SmartWebdriver

tap.test('should create a SmartWebdriver instance', async () => {
  mySmartwebdriver = new smartwebdriver.SmartWebdriver()
  expect(mySmartwebdriver).to.be.instanceof(smartwebdriver.SmartWebdriver)
})

tap.test('should install the drivers', async () => {
  await mySmartwebdriver.install()
})

tap.test('should start the server', async () => {
  await mySmartwebdriver.start()
})

tap.test('should be able to kill the server', async () => {
  await mySmartwebdriver.stop()
})

tap.start()
