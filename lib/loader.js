export default function (source, map) {
    this.callback(null, `
        const styles = \`${source}\`;
        export default styles;
    `, map);
}
//# sourceMappingURL=loader.js.map