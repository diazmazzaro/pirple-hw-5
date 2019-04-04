/*
 * Unit Tests
 *
 */

// Dependencies
var helpers = require('./../app/lib.js');
var assert = require('assert');

// Holder for Tests
var unit = {};


// Assert that the createRandomString function is returning an string
unit['helpers.createRandomString should return an string'] = function(done){
  var val = helpers.createRandomString(10);
  assert.equal(typeof(val), 'string');
  done();
};

// Assert that the createRandomString function is returning an string with 10 chars length
unit['helpers.createRandomString should return a 10 chars length string'] = function(done){
  var val = helpers.createRandomString(10);
  assert.equal(val.length, 10);
  done();
};

// Assert thar the createRandomString is real random.
unit['helpers.createRandomString should return random'] = function(done){
  var val1 = helpers.createRandomString(10);
  var val2 = helpers.createRandomString(10);
  assert.notEqual(val1, val2);
  done();
};

// Assert thar the createRandomString is real random.
unit['helpers.createNotTooGoodRandomString should return random'] = function(done){
  var val1 = helpers.createNotTooGoodRandomString(10);
  var val2 = helpers.createNotTooGoodRandomString(10);
  assert.notEqual(val1, val2);
  done();
};


// // Logs.list should callback an array and a false error
// unit['logs.list should callback a false error and an array of log names'] = function(done){
//   logs.list(true,function(err,logFileNames){
//       assert.equal(err, false);
//       assert.ok(logFileNames instanceof Array);
//       assert.ok(logFileNames.length > 1);
//       done();
//   });
// };

// // Logs.truncate should not throw if the logId doesnt exist
// unit['logs.truncate should not throw if the logId does not exist, should callback an error instead'] = function(done){
//   assert.doesNotThrow(function(){
//     logs.truncate('I do not exist',function(err){
//       assert.ok(err);
//       done();
//     })
//   },TypeError);
// };

// // exampleDebuggingProblem.init should not throw (but it does)
// unit['exampleDebuggingProblem.init should not throw when called'] = function(done){
//   assert.doesNotThrow(function(){
//     exampleDebuggingProblem.init();
//     done();
//   },TypeError);
// };

// Export the tests to the runner
module.exports = unit;
