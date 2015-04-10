'use strict';

var $ = require('jquery');
var Handlebars = require('handlebars');
var App = require('./app');

$(function() {

	Handlebars.registerHelper('eq', function(a, b, options) {
		return a === b ? options.fn(this) : options.inverse(this);
	});

	App.init();
});
