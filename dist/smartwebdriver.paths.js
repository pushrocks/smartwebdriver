"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartwebdriver.plugins");
exports.packageBaseDir = plugins.path.join(__dirname, '../');
exports.assetDir = plugins.path.join(exports.packageBaseDir, './assets/');
exports.chromeDriverDir = plugins.path.join(exports.assetDir, 'chromedriver');
// ensure directories
plugins.smartfile.fs.ensureEmptyDirSync(exports.assetDir);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR3ZWJkcml2ZXIucGF0aHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHdlYmRyaXZlci5wYXRocy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9EQUFtRDtBQUV4QyxRQUFBLGNBQWMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDcEQsUUFBQSxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQTtBQUN6RCxRQUFBLGVBQWUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFBO0FBRXhFLHFCQUFxQjtBQUNyQixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBUSxDQUFDLENBQUEifQ==