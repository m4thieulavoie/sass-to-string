const fs = require('fs-extra');
const path = require('path');
const sass = require('sass');

const cliArgs = process.argv.slice(2);
const argsMap = {};

cliArgs.forEach(arg => {
  const [key, value] = arg.split('=');
  argsMap[key] = value;
})

const transformSassFilesToEsModules = (directoryToSearch, pattern) => {
  fs.readdirSync(directoryToSearch).forEach((subDirectoryToSearch) => {
    subDirectoryToSearch = path.resolve(directoryToSearch, subDirectoryToSearch);

    const stat = fs.statSync(subDirectoryToSearch);
    if (stat.isDirectory()) {
      transformSassFilesToEsModules(subDirectoryToSearch, pattern)
    }

    if (stat.isFile() && subDirectoryToSearch.endsWith(pattern)) {
      const result = sass.renderSync({
        file: subDirectoryToSearch
      }).css.toString()

      const distDirectory = argsMap.dist || 'dist';
      const computedPath = path.resolve(__dirname, distDirectory, subDirectoryToSearch.replace('/src/', `/${distDirectory}/`) + '.js');
      const content = `const styles = \`${result}\`; export default styles;`;
      fs.outputFile(computedPath, content, (error) => {
          if(error) {
            console.error({ error })
          }
      });
    }
  });
};

transformSassFilesToEsModules('./src', '.scss');
