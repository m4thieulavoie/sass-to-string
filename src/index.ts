export default function (source: string, map: any) {
  this.callback(
    null,
    `
        const styles = \`${source}\`;
        export default styles;
    `,
    map
  );
}
