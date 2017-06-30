import * as plugins from './smartwebdriver.plugins'
import * as paths from './smartwebdriver.paths'

let drivers = {
  chrome: {
    // https://chromedriver.storage.googleapis.com/index.html
    version: '2.30',
    arch: process.arch,
    baseURL: 'https://chromedriver.storage.googleapis.com'
  }
}

// types
export type TProvider = 'local' | 'sauce'

// interfaces
export interface ISmartdriverOptions {
  provider: TProvider
}

export class SmartWebdriver {
  private installed = plugins.smartq.defer() // wether SmartDriver is installed all right
  childProcess
  private _installed: boolean = false

  /**
   * the constructor
   */
  constructor (optionsArg: ISmartdriverOptions) {
    if (optionsArg.provider === 'local') {
      
    }
  }

  async installLocal () {
    let done = plugins.smartq.defer()
    plugins.seleniumStandalone.install({
      // https://selenium-release.storage.googleapis.com/index.html
      version: '3.4',
      baseURL: 'https://selenium-release.storage.googleapis.com',
      basePath: paths.assetDir,
      drivers: drivers,
      // proxy: 'localhost', // see https://github.com/request/request#proxies
      logger: function (message) {
        console.log(message)
      },
      progressCb: function (totalLength, progressLength, chunkLength) {
        // progress might be implemented later on
      }
    }, (err, child) => {
      if (err) {
        // console.log(err)
        // return
      }
      this.childProcess = child
      done.resolve()
    })

    await done.promise
    await plugins.smartshell.execSilent(`(cd ${paths.chromeDriverDir} && chmod -x *)`)
    let done2 = plugins.smartq.defer()
    plugins.download('https://selenium-release.storage.googleapis.com/3.4/selenium-server-standalone-3.4.0.jar')
      .pipe(plugins.fs.createWriteStream(plugins.path.join(paths.assetDir, 'selenium-server/3.4-server.jar')))
      .on('finish', () => {
        done2.resolve()
      })
    return await done2.promise
  }

  /**
   * Starts the SmartWebdriver instance
   */
  async startLocal () {
    let done = plugins.smartq.defer()
    plugins.seleniumStandalone.start({
      version: '3.4',
      basePath: paths.assetDir,
      drivers: drivers,
      spawnOptions: {
        stdio: 'inherit'
      }
    }, (err, child) => {
      if (err) {
        console.log(err)
        return
      }
      this.childProcess = child
      done.resolve()
    })
    return await done.promise
  }

  /**
   * stops the SmartWebdriver instance
   */
  async stopLocal () {
    this.childProcess.kill()
  }

}
