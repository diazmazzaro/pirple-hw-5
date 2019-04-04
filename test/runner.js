/*
 * Test runner
 *
 */

 // Override the NODE_ENV variable
 process.env.NODE_ENV = 'testing';

// Application logic for the test runner
_app = {};

// Holder of all tests
_app.tests = {};

// Dependencies
_app.tests.unit = require('./lib-unit');

// Count all the tests
_app.countTests = function(){
  var counter = 0;
  for(var key in _app.tests){
     if(_app.tests.hasOwnProperty(key)){
       var subTests = _app.tests[key];
       for(var testName in subTests){
          if(subTests.hasOwnProperty(testName)){
            counter++;
          }
       }
     }
  }
  return counter;
};

// Run all the tests, collecting the errors and successes
_app.currentRun = [];
_app.runTests = function(){
  var errors = [];
  var successes = 0;
  var limit = _app.countTests();
  var counter = 0;
  _app.currentRun = [];
  for(var key in _app.tests){
     if(_app.tests.hasOwnProperty(key)){
       var subTests = _app.tests[key];
       for(var testName in subTests){
          if(subTests.hasOwnProperty(testName)){
            (function(){
              var tmpTestName = testName;
              var testValue = subTests[testName];
              // Call the test
              try{
                testValue(function(){

                  // If it calls back without throwing, then it succeeded, so log it in green
                  _app.currentRun.push('\x1b[32m✓\x1b[0m ' + tmpTestName);
                  counter++;
                  successes++;
                  if(counter == limit){
                    _app.produceTestReport(limit,successes,errors);
                  }
                });
              } catch(e){
                // If it throws, then it failed, so capture the error thrown and log it in red
                errors.push({
                  'name' : testName,
                  'error' : e
                });
                _app.currentRun.push('\x1b[31mx\x1b[0m ' + tmpTestName);
                counter++;
                if(counter == limit){
                  _app.produceTestReport(limit,successes,errors);
                }
              }
            })();
          }
       }
     }
  }
};


// Product a test outcome report
_app.produceTestReport = function(limit,successes,errors){

  console.log('\x1b[32m\x1b[1m     ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ \x1b[0m');
  console.log('\x1b[32m\x1b[1m    ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌\x1b[0m');
  console.log('\x1b[32m\x1b[1m    ▐░▌       ▐░▌ ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀█░█▀▀▀▀ \x1b[0m');
  console.log('\x1b[32m\x1b[1m    ▐░▌       ▐░▌     ▐░▌     ▐░▌          ▐░▌               ▐░▌     \x1b[0m');
  console.log('\x1b[32m\x1b[1m    ▐░▌       ▐░▌     ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     \x1b[0m');
  console.log('\x1b[32m\x1b[1m    ▐░▌       ▐░▌     ▐░▌     ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░▌     \x1b[0m');
  console.log('\x1b[32m\x1b[1m    ▐░▌       ▐░▌     ▐░▌     ▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀█░▌     ▐░▌     \x1b[0m');
  console.log('\x1b[32m\x1b[1m    ▐░▌       ▐░▌     ▐░▌     ▐░▌                    ▐░▌     ▐░▌     \x1b[0m');
  console.log('\x1b[32m\x1b[1m    ▐░█▄▄▄▄▄▄▄█░▌     ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄█░▌     ▐░▌     \x1b[0m');
  console.log('\x1b[32m\x1b[1m    ▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░▌     \x1b[0m');
  console.log('\x1b[32m\x1b[1m     ▀▀▀▀▀▀▀▀▀▀▀       ▀       ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀       ▀      \x1b[0m');

  console.log("");
  console.log("\x1b[32m\x1b[1m------------------------ BEGIN TEST REPORT --------------------------\x1b[0m");
  _app.currentRun.forEach(function(txt){ console.log(txt) })
  console.log("");
  console.log("   Total Tests: ",limit);
  console.log("   Pass: \x1b[32m\x1b[1m",successes, "\x1b[0m");
  console.log("   Fail: \x1b[31m\x1b[1m",errors.length, "\x1b[0m");
  console.log("");

  // If there are errors, print them in detail
  if(errors.length > 0){
    console.log("\x1b[32m\x1b[1m----------------------- \x1b[31m\x1b[1mBEGIN ERROR DETAILS \x1b[32m\x1b[1m-------------------------\x1b[0m");

    console.log("");
    errors.forEach(function(testError){
      console.log('\x1b[31m%s\x1b[0m',testError.name);
      console.log(testError.error);
      console.log("");
    });
    console.log("");
    console.log("\x1b[32m\x1b[1m------------------------ \x1b[31m\x1b[1mEND ERROR DETAILS \x1b[32m\x1b[1m--------------------------\x1b[0m");
  }
  console.log("");
  console.log("\x1b[32m\x1b[1m------------------------- END TEST REPORT ---------------------------\x1b[0m");
  
  process.exit(0);

};

// Run the tests
_app.runTests();
