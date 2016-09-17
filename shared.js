var USER_NAME_KEY ="USER_NAME";
var USER_PASS_KEY="PASSWORD";
var API_KEY="API";

//Default values
var service_url="http://webpt.balhau.net";
var api_url="balhau.net:9091";
var user_name="pi";
var user_pass="gamma007";
var sessionToken = null;

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


//This method will parse the error message and retrieve the sessionToken value
var parseSessionToken = function(errorMessage){
  return errorMessage.split("X-Transmission-Session-Id")[2].split(":")[1].trim().split("</code>")[0]
}

var postMessage=function(pdata){
  var authToken = getAuthToken("pi","gamma007")
  $.ajax({
    url: "http://balhau.net:9091/transmission/rpc",
    headers:{
      'Authorization' : authToken,
      'Content-Type':'application/json; charset=UTF-8',
      'X-Transmission-Session-Id' : sessionToken,
    },
    data: JSON.stringify(pdata),
    type:"POST",
    success:function(data){
      console.log(data);
    },
    error:function(xhr, textStatus, errorThrown){
      sessionToken=parseSessionToken(xhr.responseText);
      console.log("Retrieved session-token: "+sessionToken);
    }
  });
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
