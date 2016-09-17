var USER_NAME_KEY ="USER_NAME";
var USER_PASS_KEY="PASSWORD";
var SESSION_TOKEN_KEY = "SESSION_TOKEN_KEY"
var API_KEY="API";

//Default values
var service_url="http://webpt.balhau.net";
var api_url="balhau.net:9091";
var user_name="user";
var user_pass="password";
var sessionToken = null;
var tClient = null;

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

var syncLocalData=function(callback){

    chrome.storage.local.get(API_KEY,function(data){
      if(data[API_KEY]){
        //Load variables into localstore
        console.log("Load api_url from localstore: "+data[API_KEY]);
        api_url = data[API_KEY]
      }
      saveLocalStore(api_url,user_name,user_pass,sessionToken);
      callback(api_url,user_name,user_pass,sessionToken);
    });

  chrome.storage.local.get(USER_NAME_KEY,function(data){
    if(data[USER_NAME_KEY]){
      //Load variables into localstore
      console.log("Load api_url from localstore: "+data[USER_NAME_KEY]);
      user_name = data[USER_NAME_KEY]
    }
    saveLocalStore(api_url,user_name,user_pass,sessionToken);
    callback(api_url,user_name,user_pass,sessionToken);
  });

  chrome.storage.local.get(USER_PASS_KEY,function(data){
    if(data[USER_PASS_KEY]){
      //Load variables into localstore
      console.log("Load api_url from localstore: "+data[USER_PASS_KEY]);
      user_pass = data[USER_PASS_KEY]
    }
    saveLocalStore(api_url,user_name,user_pass,sessionToken);
    callback(api_url,user_name,user_pass,sessionToken);
  });

  chrome.storage.local.get(SESSION_TOKEN_KEY,function(data){
    if(data[SESSION_TOKEN_KEY]){
      //Load variables into localstore
      console.log("Load api_url from localstore: "+data[SESSION_TOKEN_KEY]);
      sessionToken = data[SESSION_TOKEN_KEY]
    }
    saveLocalStore(api_url,user_name,user_pass,sessionToken);
    callback(api_url,user_name,user_pass,sessionToken);
  });

};



var saveLocalStore=function(url,user,pass,stoken){
  var sdata={};
  sdata[API_KEY] = url;
  sdata[USER_NAME_KEY]=user;
  sdata[USER_PASS_KEY]=pass;
  sdata[SESSION_TOKEN_KEY]=stoken

  chrome.storage.local.set(
    sdata,
    function(){
      console.log("************************************");
      console.log("Stored context data into localstore:");
      console.log(sdata);
      console.log("************************************");
    }
  )
};

var clearLocalData=function(){
  chrome.storage.local.clear(function(data){
    console.log("Localdata Cleared");
  });
  syncLocalData();
};


var TorrentUtils = {}

/**
* This will convert integer space to string space representation
*/
TorrentUtils.intToSpace = function(space){
  var sspace=space;
  var div = 1024;
  if(sspace < div) return sspace+"B";
  sspace = sspace/div;
  if(sspace < div) return sspace.toFixed(2)+"Kb";
  sspace = sspace/div;
  if(sspace < div) return sspace.toFixed(2)+"Mb";
  sspace = sspace/div;
  if(sspace < div) return sspace.toFixed(2)+"Gb";
  sspace = sspace/div;
  if(sspace < div) return sspace.toFixed(2)+"Tb";
  sspace = sspace/div;
  if(sspace < div) return sspace.toFixed(2)+"Pb";
  return -1
};
