// Dependencies
var helper = require('./app/lib.js');

helper.testURl('https://www.google.com', function(err, result){
	console.log('Error', err)
	console.log('Result', result)
});