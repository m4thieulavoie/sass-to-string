const fs = require("fs-extra");
const path = require("path");
const sass = require("sass");

const cliArgs = process.argv.slice(2);
const argsMap = {};

cliArgs.forEach((arg) => {
  const [key, value] = arg.split("=");
  argsMap[key] = value;
});

const srcDirectory = argsMap["--src"] || "src";
const isVerbose = "--verbose" in argsMap;

const log = (content) => {
  if (!isVerbose) {
    return;
  }

  console.log(`sass-to-string: ${content}`);
};

const transformSassFilesToEsModules = (directoryToSearch, pattern) => {
  fs.readdirSync(directoryToSearch).forEach((subDirectory) => {
    const subDirectoryToSearch = path.resolve(directoryToSearch, subDirectory);

    const stat = fs.statSync(subDirectoryToSearch);
    if (stat.isDirectory()) {
      transformSassFilesToEsModules(subDirectoryToSearch, pattern);
    }

    if (stat.isFile() && subDirectoryToSearch.endsWith(pattern)) {
      log(`Reading file ${subDirectory}`);
      const result = sass
        .renderSync({
          file: subDirectoryToSearch,
        })
        .css.toString();

      const distDirectory = argsMap["--dist"] || "dist";
      const computedPath = path.resolve(
        __dirname,
        distDirectory,
        `${subDirectoryToSearch.replace(
          `/${srcDirectory}/`,
          `/${distDirectory}/`
        )}.js`
      );
      const content = `const styles = \`${result}\`; export default styles;`;
      fs.outputFile(computedPath, content, (error) => {
        if (error) {
          console.error({ error });
        } else {
          log(`Successfully created ${subDirectory}.js`);
        }
      });
    }
  });
};

transformSassFilesToEsModules(`./${srcDirectory}`, ".scss");
