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
exports.install = () => __awaiter(this, void 0, void 0, function* () {
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
    }, done.resolve);
    yield done.promise;
    let done2 = plugins.smartq.defer();
    plugins.download('https://selenium-release.storage.googleapis.com/3.4/selenium-server-standalone-3.4.0.jar')
        .pipe(plugins.fs.createWriteStream(plugins.path.join(paths.assetDir, 'selenium-server/3.4-server.jar')))
        .on('finish', () => {
        done2.resolve();
    });
    return yield done2.promise;
});
exports.start = () => __awaiter(this, void 0, void 0, function* () {
    let done = plugins.smartq.defer();
    plugins.seleniumStandalone.start({
        version: '3.4',
        basePath: paths.assetDir,
        drivers: drivers,
        spawnOptions: {
            stdio: 'inherit'
        }
    }, done.resolve);
    return yield done.promise;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsb0RBQW1EO0FBQ25ELGdEQUErQztBQUUvQyxJQUFJLE9BQU8sR0FBRztJQUNaLE1BQU0sRUFBRTtRQUNOLHlEQUF5RDtRQUN6RCxPQUFPLEVBQUUsTUFBTTtRQUNmLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtRQUNsQixPQUFPLEVBQUUsNkNBQTZDO0tBQ3ZEO0NBQ0YsQ0FBQTtBQUVVLFFBQUEsT0FBTyxHQUFHO0lBQ25CLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7SUFFakMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztRQUNqQyw2REFBNkQ7UUFDN0QsT0FBTyxFQUFFLEtBQUs7UUFDZCxPQUFPLEVBQUUsaURBQWlEO1FBQzFELFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtRQUN4QixPQUFPLEVBQUUsT0FBTztRQUNoQix3RUFBd0U7UUFDeEUsTUFBTSxFQUFFLFVBQVUsT0FBTztZQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3RCLENBQUM7UUFDRCxVQUFVLEVBQUUsVUFBVSxXQUFXLEVBQUUsY0FBYyxFQUFFLFdBQVc7WUFDNUQseUNBQXlDO1FBQzNDLENBQUM7S0FDRixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUVoQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDbEIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNsQyxPQUFPLENBQUMsUUFBUSxDQUFDLDBGQUEwRixDQUFDO1NBQ3pHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZHLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDWixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDakIsQ0FBQyxDQUFDLENBQUE7SUFDSixNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFBO0FBQzVCLENBQUMsQ0FBQSxDQUFBO0FBRVUsUUFBQSxLQUFLLEdBQUc7SUFDakIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNqQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDO1FBQy9CLE9BQU8sRUFBRSxLQUFLO1FBQ2QsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO1FBQ3hCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLFlBQVksRUFBRTtZQUNaLEtBQUssRUFBRSxTQUFTO1NBQ2pCO0tBQ0YsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDaEIsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUMzQixDQUFDLENBQUEsQ0FBQSJ9