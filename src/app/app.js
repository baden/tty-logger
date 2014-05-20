var
    // Load native UI library
    gui = require('nw.gui'),

    // browser window object
    win = gui.Window.get(),

    // os object
    os = require('os'),

    // path object
    path = require('path'),

    // fs object
    fs = require('fs'),

    // TMP Folder
    tmpFolder = path.join(os.tmpDir(), 'TTY-Logger'),

    moment = require('moment');

/**
* Windows 8 Fix
* https://github.com/rogerwang/node-webkit/issues/1021#issuecomment-34358536
 # commented this line so we can watch movies withou the taskbar showing always
(process.platform === 'win32' && parseFloat(os.release(), 10) > 6.1) {
    gui.Window.get().setMaximumSize(screen.availWidth + 15, screen.availHeight + 14);
};

*/
// Create the System Temp Folder. This is used to store temporary data like movie files.

if (!fs.existsSync(tmpFolder)) { fs.mkdir(tmpFolder); }

var deleteFolder = function (path) {
    'use strict';

    if (typeof path !== 'string') { return; }
	try {
		var files = [];
		if (fs.existsSync(path)) {
			files = fs.readdirSync(path);
			files.forEach(function(file, index){
				var curPath = path + "/" + file;
				if(fs.lstatSync(curPath).isDirectory()) {
					deleteFolder(curPath);
				} else {
					fs.unlinkSync(curPath);
				}
			});
			fs.rmdirSync(path);
		}
	} catch(err) {
		console.log('deleteFolder()',err);
	}
}

// Wipe the tmpFolder when closing the app (this frees up disk space)
win.on('close', function(){
    deleteFolder(tmpFolder);
    win.close(true);
});


// Developer Shortcuts
Mousetrap.bind(['shift+f12', 'f12'], function(e) {
	win.showDevTools();
});

Mousetrap.bind(['f5', 'f11'], function(e) {
	win.reloadIgnoringCache();
});

// Special Debug Console Calls!
console.logger = {};
console.logger.log = console.log.bind(console);
console.logger.debug = function() {
	var params = Array.prototype.slice.call(arguments, 1);
	params.unshift('%c[%cDEBUG%c] ' + arguments[0], 'color: black;', 'color: #00eb76;', 'color: black;');
	console.debug.apply(console, params);
}
console.logger.info = function() {
	var params = Array.prototype.slice.call(arguments, 1);
	params.unshift('[%cINFO%c] ' + arguments[0], 'color: blue;', 'color: black;');
	console.info.apply(console, params);
}
console.logger.warn = function() {
	var params = Array.prototype.slice.call(arguments, 1);
	params.unshift('[%cWARNING%c] ' + arguments[0], 'color: #ffc000;', 'color: black;');
	console.warn.apply(console, params);
}
console.logger.error = function() {
	var params = Array.prototype.slice.call(arguments, 1);
	params.unshift('%c[%cERROR%c] ' + arguments[0], 'color: black;', 'color: #ff1500;', 'color: black;');
	console.error.apply(console, params);
}


/**
* Drag n' Drop Torrent Onto PT Window to start playing (ALPHA)
*/
window.ondragover = function(e) { e.preventDefault(); return false };
window.ondrop = function(e) { e.preventDefault(); return false };
var holder = $('body')[0];
holder.ondragover = function () { this.classList.add('dragging'); return false; };
holder.ondragend = function () { this.classList.remove('dragging'); return false; };
holder.ondrop = function (e) { e.preventDefault(); return false; };

/**
 * Show 404 page on uncaughtException
 */
process.on('uncaughtException', function(err) {
    window.console.error(err, err.stack);
});
