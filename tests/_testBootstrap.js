if (typeof define !== 'function') {
    define = require('amdefine')(module);
}

/*
 * This requirejs is different from which the require.js we used in client side. this is a node adapter
 */
requirejs = require('requirejs');
requirejsConfig = require('../public/scripts/requirejsConfig.json');
// console.log(requirejs);
// console.log(require);
// define(
//     ["../pubic/scripts/main.js"], function(main) {

//         console.log('main loaded');
//     });

//bad, better use a module wrapper
// console.log(requirejs);
// {
//     //Pass the top-level main.js/index.js require
//     //function to requirejs so that node modules
//     //are loaded relative to the top-level JS file.
//     nodeRequire: require
// }

//strange to have ../, work around 
requirejsConfig["baseUrl"]= '../public/scripts/services/'
requirejs.config(requirejsConfig);

require=requirejs;
 // window is not defined!?

// var requirejsConfig = require("../public/scripts/main").requirejsConfig;
// console.log(requirejsConfig);

// console.log('main loaded')



// requirejs(['foo', 'bar'],
// function   (foo,   bar) {
//     //foo and bar are loaded according to requirejs
//     //config, but if not found, then node's require
//     //is used to load the module.
// });