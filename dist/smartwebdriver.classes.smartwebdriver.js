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
    getClient() {
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
            yield plugins.smartdelay.delayFor(3000);
            yield plugins.smartshell.exec(`(cd ${paths.chromeDriverDir} && chmod a+x *)`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR3ZWJkcml2ZXIuY2xhc3Nlcy5zbWFydHdlYmRyaXZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0d2ViZHJpdmVyLmNsYXNzZXMuc21hcnR3ZWJkcml2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9EQUFtRDtBQUNuRCxnREFBK0M7QUFJL0MsSUFBSSxPQUFPLEdBQUc7SUFDWixNQUFNLEVBQUU7UUFDTix5REFBeUQ7UUFDekQsT0FBTyxFQUFFLE1BQU07UUFDZixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7UUFDbEIsT0FBTyxFQUFFLDZDQUE2QztLQUN2RDtDQUNGLENBQUE7QUFVRDtJQUtFOztPQUVHO0lBQ0gsWUFBWSxVQUFnQztRQVBwQyxjQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQSxDQUFDLDRDQUE0QztRQUUvRSxlQUFVLEdBQVksS0FBSyxDQUFBO1FBTWpDLGVBQWU7SUFDakIsQ0FBQztJQUVLLFNBQVM7O1lBQ2IsSUFBSSxPQUFPLEdBQVEsRUFBRSxDQUFBO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixNQUFNLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtnQkFDekIsTUFBTSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7Z0JBQ3ZCLE9BQU8sR0FBRztvQkFDUixtQkFBbUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUU7aUJBQy9DLENBQUE7WUFDSCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sT0FBTyxHQUFHO29CQUNSLG1CQUFtQixFQUFFLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRTtvQkFDOUMsSUFBSSxFQUFFLDRCQUE0QjtpQkFDbkMsQ0FBQTtZQUNILENBQUM7WUFDRCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FB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