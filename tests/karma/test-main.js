//what files are included by karma in window?

var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/karma\/.*Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

var testConfig = {
    // Karma serves files from '/base'
    baseUrl: '/base/public/scripts/',
    //failing to load. not hounoursed in plugin?
    // mainConfigFile: '../../public/scripts/main.js',

    paths: {
        "chai": "../../node_modules/chai/chai"
    },

    // shim: {
    //   "angular": {
    //     "exports": "angular"
    //   },
    // },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start,
    nodeRequire: require
};
// testConfig.__proto__=mainConfig;
//TODO here override it not extend it
// for(var prop in mainConfig){
//     testConfig[prop]=mainConfig[prop];
// }


// testConfig.paths["chai"]="node_modules/chai/chai.js";

//ugly wrapper to pick up the global require variable
requirejs.config(require);
//better use extend
console.log("require");
// console.log(require.s.contexts._.config);


console.log("requirejs");
console.log(requirejs.s.contexts._.config);

requirejs.config(testConfig);
