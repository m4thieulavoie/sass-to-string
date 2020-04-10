module.exports = function (source, map) {
  this.callback(
    null,
    `
      const styles = \`${source}\`;
      export default styles;
    `,
    map
  );
};
