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
    installLocal() {
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
            yield plugins.smartshell.execSilent(`(cd ${paths.chromeDriverDir} && chmod -x *)`);
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
    startLocal() {
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
    stopLocal() {
        return __awaiter(this, void 0, void 0, function* () {
            this.childProcess.kill();
        });
    }
}
exports.SmartWebdriver = SmartWebdriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR3ZWJkcml2ZXIuY2xhc3Nlcy5zbWFydHdlYmRyaXZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0d2ViZHJpdmVyLmNsYXNzZXMuc21hcnR3ZWJkcml2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9EQUFtRDtBQUNuRCxnREFBK0M7QUFFL0MsSUFBSSxPQUFPLEdBQUc7SUFDWixNQUFNLEVBQUU7UUFDTix5REFBeUQ7UUFDekQsT0FBTyxFQUFFLE1BQU07UUFDZixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7UUFDbEIsT0FBTyxFQUFFLDZDQUE2QztLQUN2RDtDQUNGLENBQUE7QUFVRDtJQUtFOztPQUVHO0lBQ0gsWUFBYSxVQUErQjtRQVBwQyxjQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQSxDQUFDLDRDQUE0QztRQUUvRSxlQUFVLEdBQVksS0FBSyxDQUFBO1FBTWpDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztRQUV0QyxDQUFDO0lBQ0gsQ0FBQztJQUVLLFlBQVk7O1lBQ2hCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDakMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztnQkFDakMsNkRBQTZEO2dCQUM3RCxPQUFPLEVBQUUsS0FBSztnQkFDZCxPQUFPLEVBQUUsaURBQWlEO2dCQUMxRCxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7Z0JBQ3hCLE9BQU8sRUFBRSxPQUFPO2dCQUNoQix3RUFBd0U7Z0JBQ3hFLE1BQU0sRUFBRSxVQUFVLE9BQU87b0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQ3RCLENBQUM7Z0JBQ0QsVUFBVSxFQUFFLFVBQVUsV0FBVyxFQUFFLGNBQWMsRUFBRSxXQUFXO29CQUM1RCx5Q0FBeUM7Z0JBQzNDLENBQUM7YUFDRixFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUs7Z0JBQ1osRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDUixtQkFBbUI7b0JBQ25CLFNBQVM7Z0JBQ1gsQ0FBQztnQkFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQTtnQkFDekIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1lBRUYsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFBO1lBQ2xCLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxLQUFLLENBQUMsZUFBZSxpQkFBaUIsQ0FBQyxDQUFBO1lBQ2xGLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDbEMsT0FBTyxDQUFDLFFBQVEsQ0FBQywwRkFBMEYsQ0FBQztpQkFDekcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZHLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ1osS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQ2pCLENBQUMsQ0FBQyxDQUFBO1lBQ0osTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQTtRQUM1QixDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNHLFVBQVU7O1lBQ2QsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUNqQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDO2dCQUMvQixPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7Z0JBQ3hCLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixZQUFZLEVBQUU7b0JBQ1osS0FBSyxFQUFFLFNBQVM7aUJBQ2pCO2FBQ0YsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLO2dCQUNaLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDaEIsTUFBTSxDQUFBO2dCQUNSLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7Z0JBQ3pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUNoQixDQUFDLENBQUMsQ0FBQTtZQUNGLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDM0IsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDRyxTQUFTOztZQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDMUIsQ0FBQztLQUFBO0NBRUY7QUEvRUQsd0NBK0VDIn0=