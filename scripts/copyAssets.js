/* copy assets

This is a simple "hack" to copy vendor libraries from node_modules
into the app so that we're not publishing the entire node_modules
directory to Domo. 

Ideally you would use something like Gulp, Browserify, Webpack, or any
combination for production apps

*/

const fs = require('fs-extra');
const path = require('path');

const NODE_SOURCE = path.resolve(process.cwd(), 'node_modules');
const LIB_DESTINATION = path.resolve(process.cwd(), 'src/scripts/lib'); 

const nodeModulesToCopy = [
  '@domoinc/query/dist/',
  'ryuu.js/dist/'
];

nodeModulesToCopy.forEach(file => {
  fs.copy(path.resolve(NODE_SOURCE, file), LIB_DESTINATION);
});