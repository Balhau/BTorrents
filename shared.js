var USER_NAME_KEY ="USER_NAME";
var USER_PASS_KEY="PASSWORD";
var API_KEY="API";

//Default values
var service_url="http://webpt.balhau.net";
var api_url="rasp.daemon.com";
var user_name="username";
var user_pass="user_password";

//Default urls Pattern
/*var downloadPatterns=[
  {
    'pattern':'https://www.youtube.com/watch?',
    'poster': 'http://pi.balhau.net/youtube/downloader'
  }
];

//Default api
var api={
  'start_torrents' : 'http://pi.balhau.net/starttorrents',
  'stop_torrents' : 'http://pi.balhau.net/stoptorrents'
}
*/


//Method that keep in sync the localdata and the
//Callback to execute after the processing is done
//localvariables

//Basic http auth
var getAuthToken = function(user,name){
  return "Basic "+btoa(user+":"+name);
}


var syncLocalData=function(callback){

    chrome.storage.local.get(API_KEY,function(data){
      if(data[API_KEY]){
        //Load variables into localstore
        console.log("Load api_url from localstore: "+data[API_KEY]);
        api_url = data[API_KEY]
      }
      saveLocalStore(api_url,user_name,user_pass);
      callback(api_url,user_name,user_pass);
    });

  chrome.storage.local.get(USER_NAME_KEY,function(data){
    if(data[USER_NAME_KEY]){
      //Load variables into localstore
      console.log("Load api_url from localstore: "+data[USER_NAME_KEY]);
      user_name = data[USER_NAME_KEY]
    }
    saveLocalStore(api_url,user_name,user_pass);
    callback(api_url,user_name,user_pass);
  });

  chrome.storage.local.get(USER_PASS_KEY,function(data){
    if(data[USER_PASS_KEY]){
      //Load variables into localstore
      console.log("Load api_url from localstore: "+data[USER_PASS_KEY]);
      user_pass = data[USER_PASS_KEY]
    }
    saveLocalStore(api_url,user_name,user_pass);
    callback(api_url,user_name,user_pass);
  });

};



var saveLocalStore=function(url,user,pass){
  var sdata={};
  sdata[API_KEY] = url;
  sdata[USER_NAME_KEY]=user;
  sdata[USER_PASS_KEY]=pass;
  chrome.storage.local.set(
    sdata,
    function(){
      console.log("Stored context data into localstore:")
    }
  )
};

var clearLocalData=function(){
  chrome.storage.local.clear(function(data){
    console.log("Localdata Cleared");
  });
  syncLocalData();
};
