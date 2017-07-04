"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartwebdriver.plugins");
const paths = require("./smartwebdriver.paths");
let drivers = {
    chrome: {
        // https://chromedriver.storage.googleapis.com/index.html
        version: '2.30',
        arch: process.arch,
        baseURL: 'https://chromedriver.storage.googleapis.com'
    }
};
class SmartWebdriver {
    /**
     * the constructor
     */
    constructor(optionsArg) {
        this.installed = plugins.smartq.defer(); // wether SmartDriver is installed all right
        this._installed = false;
        if (optionsArg.provider === 'local') {
        }
    }
    getLocalClient() {
        let options = {};
        if (!process.env.CI) {
            options = {
                desiredCapabilities: { browserName: 'chrome' }
            };
        }
        else {
            options = {
                desiredCapabilities: { browserName: 'chrome' },
                host: 'selenium-standalone-chrome'
            };
        }
        let client = plugins.webdriverio.remote(options);
        return client;
    }
    installSmart() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!process.env.CI) {
                let done = plugins.smartq.defer();
                plugins.seleniumStandalone.install({
                    // https://selenium-release.storage.googleapis.com/index.html
                    version: '3.4',
                    baseURL: 'https://selenium-release.storage.googleapis.com',
                    basePath: paths.assetDir,
                    drivers: drivers,
                    // proxy: 'localhost', // see https://github.com/request/request#proxies
                    logger: function (message) {
                        console.log(message);
                    },
                    progressCb: function (totalLength, progressLength, chunkLength) {
                        // progress might be implemented later on
                    }
                }, (err, child) => {
                    if (err) {
                        // console.log(err)
                        // return
                    }
                    this.childProcess = child;
                    done.resolve();
                });
                yield done.promise;
                yield plugins.smartdelay.delayFor(1000);
                yield plugins.smartshell.exec(`(cd ${paths.chromeDriverDir} && chmod +x *)`);
                let done2 = plugins.smartq.defer();
                plugins.download('https://selenium-release.storage.googleapis.com/3.4/selenium-server-standalone-3.4.0.jar')
                    .pipe(plugins.fs.createWriteStream(plugins.path.join(paths.assetDir, 'selenium-server/3.4-server.jar')))
                    .on('finish', () => {
                    done2.resolve();
                });
                return yield done2.promise;
            }
        });
    }
    /**
     * Starts the SmartWebdriver instance
     */
    startSmart() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!process.env.CI) {
                let done = plugins.smartq.defer();
                plugins.seleniumStandalone.start({
                    version: '3.4',
                    basePath: paths.assetDir,
                    drivers: drivers,
                    spawnOptions: {
                        stdio: 'inherit'
                    }
                }, (err, child) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    this.childProcess = child;
                    done.resolve();
                });
                return yield done.promise;
            }
        });
    }
    /**
     * stops the SmartWebdriver instance
     */
    stopSmart() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!process.env.CI) {
                this.childProcess.kill();
            }
        });
    }
}
exports.SmartWebdriver = SmartWebdriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR3ZWJkcml2ZXIuY2xhc3Nlcy5zbWFydHdlYmRyaXZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0d2ViZHJpdmVyLmNsYXNzZXMuc21hcnR3ZWJkcml2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9EQUFtRDtBQUNuRCxnREFBK0M7QUFJL0MsSUFBSSxPQUFPLEdBQUc7SUFDWixNQUFNLEVBQUU7UUFDTix5REFBeUQ7UUFDekQsT0FBTyxFQUFFLE1BQU07UUFDZixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7UUFDbEIsT0FBTyxFQUFFLDZDQUE2QztLQUN2RDtDQUNGLENBQUE7QUFVRDtJQUtFOztPQUVHO0lBQ0gsWUFBWSxVQUErQjtRQVBuQyxjQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQSxDQUFDLDRDQUE0QztRQUUvRSxlQUFVLEdBQVksS0FBSyxDQUFBO1FBTWpDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN0QyxDQUFDO0lBQ0gsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLE9BQU8sR0FBUSxFQUFFLENBQUE7UUFDckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsT0FBTyxHQUFHO2dCQUNSLG1CQUFtQixFQUFFLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRTthQUMvQyxDQUFBO1FBQ0gsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sT0FBTyxHQUFHO2dCQUNSLG1CQUFtQixFQUFFLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRTtnQkFDOUMsSUFBSSxFQUFFLDRCQUE0QjthQUNuQyxDQUFBO1FBQ0gsQ0FBQztRQUNELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE9B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