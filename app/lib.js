/*
 * Some helpers
 *
 */


// Dependencies
var url   = require('url');
var http  = require('http');
var https = require('https');

// Container for all the helpers
var helper = {};

// Create a string of random alphanumeric characters, of a given length
helper.createRandomString = function(strLength){
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength){
    // Define all the possible characters that could go into a string
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    // Start the final string
    var str = '';
    for(i = 1; i <= strLength; i++) {
        // Get a random charactert from the possibleCharacters string
        var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
        // Append this character to the string
        str+=randomCharacter;
    }
    // Return the final string
    return str;
  } else {
    return false;
  }
};

// Create a not too good string of random alphanumeric characters (always returns the same string. Testing only)
helper.createNotTooGoodRandomString = function(strLength){
  return 'abcdefghijklmnopqrstuvwxyz0123456789';
};

// test if url responce ok
helper.testURl = function(strUrl, method, callback){
  strUrl = typeof(strUrl) == 'string' && strUrl.length > 0 ? strUrl : false;

  // set callback if method is a function (method it is optional parameter)
  if(typeof(method) == 'function' && callback == undefined){
    callback = method;
    method = 'GET';
  }
  else
    method = typeof(method) == 'string' && ['GET', 'POST'].indexOf(method.toUpperCase()) > -1 ? method.toUpperCase() : false;
  try{ 
    if(strUrl && method){
      // Create url obj from string
      var _url = url.parse(strUrl);
      

      // Configure the request details
      var requestDetails = _url;
      requestDetails.method = method

      // Instantiate the request object
      var req = https.request(requestDetails,function(res){
          // Grab the status of the sent request
          var status =  res.statusCode;
          // Callback successfully if the request went through
          if(status == 200 || status == 201){
            callback(false, true);
          } else {
            callback(false, false);
          }
      });

      // Bind to the error event so it doesn't get thrown
      req.on('error',function(e){
        callback(e);
      });

      // Add the payload
      req.write('');

      // End the request
      req.end();
      
    } else {
      callback(new Error('Invalid arguments.'))
    }
  }
  catch(err){
    callback(err)
  }
};

module.exports = helper;