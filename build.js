const path = require('path');
const fse = require('fs-extra');
const { execSync } = require('child_process');

const build = './build';
const builtSchemas = build + '/schema'
const schemas = './src/schema';

fse.emptyDirSync(build);

execSync('tsc --build');

fse.copySync(schemas, builtSchemas, {
    filter: file => path.extname(file) === '.ts' ? false : true,
});
