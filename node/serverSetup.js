var express = require('express'),
	path = require('path');

function setupEnv(app) {
	var useLiveReload = false;
	var args = process.argv;
	console.log('args:' + args + '\tENV' + app.get('env'));

	var liveReloadPort = 35730;
	var excludeList = ['.woff', '.flv'];

	var VIEW_DIR = '';
	var STATIC_DIR = '';
	var ADDITIONAL_STATIC_DIR;
	if ('development' == app.get('env')) {
		console.log('using dev');
		VIEW_DIR = path.join(__dirname, 'views');
		STATIC_DIR = path.join(__dirname, '../public');
		useLiveReload = true;
		if (args[2]) {
			ADDITIONAL_STATIC_DIR = path.join(__dirname, args[2]);
		}

	} else if ('production' == app.get('env')) {
		console.log('using prd');
		VIEW_DIR = path.join(__dirname, 'views');
		STATIC_DIR = path.join(__dirname, '../public');
		// STATIC_DIR = path.join(__dirname, 'dist');//TODO
		//pseudo prd actually. remove the dist deps TODO
	}

	app.set('port', process.env.PORT || 3001);
	console.log('mount on :' + STATIC_DIR);
	console.log('additional' + ADDITIONAL_STATIC_DIR);
	app.use(express.static(STATIC_DIR));
	if (ADDITIONAL_STATIC_DIR) {
		app.use(express.static(ADDITIONAL_STATIC_DIR));
	}
	// app.use('/static', express.static(STATIC_DIR));
	app.set('views', VIEW_DIR);
	//after static and before the dynamic routes
	if (useLiveReload) {
		console.log('use live reload'+liveReloadPort);
		//try injecting
		app.use(require('connect-livereload')({
			port: liveReloadPort,
			excludeList: excludeList
		}));
	}
}

module.exports.setupEnv = setupEnv;