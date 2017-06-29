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
    constructor() {
        this._installed = false;
    }
    install() {
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
    start() {
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
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            this.childProcess.kill();
        });
    }
}
exports.SmartWebdriver = SmartWebdriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR3ZWJkcml2ZXIuY2xhc3Nlcy5zbWFydHdlYmRyaXZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0d2ViZHJpdmVyLmNsYXNzZXMuc21hcnR3ZWJkcml2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9EQUFtRDtBQUNuRCxnREFBK0M7QUFFL0MsSUFBSSxPQUFPLEdBQUc7SUFDWixNQUFNLEVBQUU7UUFDTix5REFBeUQ7UUFDekQsT0FBTyxFQUFFLE1BQU07UUFDZixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7UUFDbEIsT0FBTyxFQUFFLDZDQUE2QztLQUN2RDtDQUNGLENBQUE7QUFFRDtJQUtFO1FBSFEsZUFBVSxHQUFZLEtBQUssQ0FBQTtJQUtuQyxDQUFDO0lBRUssT0FBTzs7WUFDWCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ2pDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pDLDZEQUE2RDtnQkFDN0QsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsT0FBTyxFQUFFLGlEQUFpRDtnQkFDMUQsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO2dCQUN4QixPQUFPLEVBQUUsT0FBTztnQkFDaEIsd0VBQXdFO2dCQUN4RSxNQUFNLEVBQUUsVUFBVSxPQUFPO29CQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUN0QixDQUFDO2dCQUNELFVBQVUsRUFBRSxVQUFVLFdBQVcsRUFBRSxjQUFjLEVBQUUsV0FBVztvQkFDNUQseUNBQXlDO2dCQUMzQyxDQUFDO2FBQ0YsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLO2dCQUNaLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ1IsbUJBQW1CO29CQUNuQixTQUFTO2dCQUNYLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7Z0JBQ3pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUNoQixDQUFDLENBQUMsQ0FBQTtZQUVGLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQTtZQUNsQixNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sS0FBSyxDQUFDLGVBQWUsaUJBQWlCLENBQUMsQ0FBQTtZQUNsRixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ2xDLE9BQU8sQ0FBQyxRQUFRLENBQUMsMEZBQTBGLENBQUM7aUJBQ3pHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQyxDQUFDO2lCQUN2RyxFQUFFLENBQUMsUUFBUSxFQUFFO2dCQUNaLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUNqQixDQUFDLENBQUMsQ0FBQTtZQUNKLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUE7UUFDNUIsQ0FBQztLQUFBO0lBRUssS0FBSzs7WUFDVCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ2pDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7Z0JBQy9CLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtnQkFDeEIsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLFlBQVksRUFBRTtvQkFDWixLQUFLLEVBQUUsU0FBUztpQkFDakI7YUFDRixFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUs7Z0JBQ1osRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUNoQixNQUFNLENBQUE7Z0JBQ1IsQ0FBQztnQkFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQTtnQkFDekIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUMzQixDQUFDO0tBQUE7SUFFSyxJQUFJOztZQUNSLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDMUIsQ0FBQztLQUFBO0NBRUY7QUFwRUQsd0NBb0VDIn0=