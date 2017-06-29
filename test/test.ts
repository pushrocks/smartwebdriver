import { expect, tap } from 'tapbundle'
import * as smartwebdriver from '../dist/index'

tap.test('should install webdrivers', async () => {
  await smartwebdriver.install()
})

tap.test('should start the server', async () => {
  await smartwebdriver.start()
})

tap.start()
