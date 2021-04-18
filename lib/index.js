"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(source, map) {
    this.callback(null, `
        const styles = \`${source}\`;
        export default styles;
    `, map);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map