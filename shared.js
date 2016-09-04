var API_KEY="API_KEY";
var API=null;
var api_url="http://pi.balhau.net/api/description";
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
    }else{
      //Load localstore into variables
      saveURLLocalStore(api_url);
    }
    callback(api_url);
  });
}

var saveURLLocalStore=function(url){
  var sdata={};
  sdata[API_KEY] = url;
  chrome.storage.local.set(
    sdata,
    function(){
      console.log("Stored apiURL into localstore:")
    }
  )
};

var clearLocalData=function(){
  chrome.storage.local.clear(function(data){
    console.log("Localdata Cleared");
  });
  syncLocalData();
};
