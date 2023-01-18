"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
class Debug {
    constructor() {
        this.enabled = true;
    }
    error(...messages) {
        if (!this.enabled)
            return;
        console.error(consts_1.Colors.FgRed, ...messages, consts_1.Colors.Reset);
    }
    log(...messages) {
        if (!this.enabled)
            return;
        console.error(...messages);
    }
    info(...messages) {
        if (!this.enabled)
            return;
        console.error(consts_1.Colors.FgBlue, ...messages, consts_1.Colors.Reset);
    }
    success(...messages) {
        if (!this.enabled)
            return;
        console.error(consts_1.Colors.FgGreen, ...messages, consts_1.Colors.Reset);
    }
}
exports.default = new Debug();
//# sourceMappingURL=Debug.js.map