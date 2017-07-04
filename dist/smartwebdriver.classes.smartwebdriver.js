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
        // nothing here
    }
    getLocalClient() {
        return __awaiter(this, void 0, void 0, function* () {
            let options = {};
            if (!process.env.CI) {
                yield this.installSmart();
                yield this.startSmart();
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
            return { client };
        });
    }
    installSmart() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    /**
     * Starts the SmartWebdriver instance
     */
    startSmart() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    /**
     * stops the SmartWebdriver instance
     */
    stopSmart() {
        return __awaiter(this, void 0, void 0, function* () {
            this.childProcess.kill();
        });
    }
}
exports.SmartWebdriver = SmartWebdriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR3ZWJkcml2ZXIuY2xhc3Nlcy5zbWFydHdlYmRyaXZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0d2ViZHJpdmVyLmNsYXNzZXMuc21hcnR3ZWJkcml2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9EQUFtRDtBQUNuRCxnREFBK0M7QUFJL0MsSUFBSSxPQUFPLEdBQUc7SUFDWixNQUFNLEVBQUU7UUFDTix5REFBeUQ7UUFDekQsT0FBTyxFQUFFLE1BQU07UUFDZixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7UUFDbEIsT0FBTyxFQUFFLDZDQUE2QztLQUN2RDtDQUNGLENBQUE7QUFVRDtJQUtFOztPQUVHO0lBQ0gsWUFBWSxVQUFnQztRQVBwQyxjQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQSxDQUFDLDRDQUE0QztRQUUvRSxlQUFVLEdBQVksS0FBSyxDQUFBO1FBTWpDLGVBQWU7SUFDakIsQ0FBQztJQUVLLGNBQWM7O1lBQ2xCLElBQUksT0FBTyxHQUFRLEVBQUUsQ0FBQTtZQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsTUFBTSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7Z0JBQ3pCLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO2dCQUN2QixPQUFPLEdBQUc7b0JBQ1IsbUJBQW1CLEVBQUUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFO2lCQUMvQyxDQUFBO1lBQ0gsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE9BQU8sR0FBRztvQkFDUixtQkFBbUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUU7b0JBQzlDLElBQUksRUFBRSw0QkFBNEI7aUJBQ25DLENBQUE7WUFDSCxDQUFDO1lBQ0QsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdB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