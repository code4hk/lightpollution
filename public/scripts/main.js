// Require JS  Config File
//TODO separate this config and the execution logic for easier import
//better export here, just trigger exe outside
//bad for client side as need another wrap
console.log('setting up requirejs main config');
console.log(requirejs);
// require.config({});
//did not pick up require, as require define earlier in karma

requirejs(["controllers/controllers"], function(controller) {
	console.log('controllers');
	console.log(controller);
});
requirejs(["app",  "jquery"], function(App, $) {
	App.initialize();
    console.log('app init');
});
