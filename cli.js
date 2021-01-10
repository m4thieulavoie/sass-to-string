const fs = require("fs-extra");
const path = require("path");
const sass = require("sass");

let config = {};
try {
  // eslint-disable-next-line global-require
  config = require("../../.sass-to-string.js");
  // eslint-disable-next-line no-empty
} catch (e) {
} finally {
  config = {
    src: "src",
    dist: "dist",
    prepare: (scss) => scss,
    ...config,
  };
}

const cliArgs = process.argv.slice(2);
cliArgs.forEach((arg) => {
  const [key, value] = arg.split("=");
  config[key.replace("--", "")] = value;
});

const srcDirectory = config.src;
const isVerbose = "verbose" in config;

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
      const fileContent = fs.readFileSync(subDirectoryToSearch).toString();
      const data = config.prepare(fileContent);
      const result = sass
        .renderSync({
          data,
        })
        .css.toString();

      const distDirectory = config.dist;
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