import * as plugins from './smartwebdriver.plugins'

export let packageBaseDir = plugins.path.join(__dirname, '../')
export let assetDir = plugins.path.join(packageBaseDir, './assets/')
export let chromeDriverDir = plugins.path.join(assetDir, 'chromedriver')

// ensure directories
plugins.smartfile.fs.ensureEmptyDirSync(assetDir)
