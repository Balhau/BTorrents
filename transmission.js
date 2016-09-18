/**
This is a javascript API for the Transmission Daemon REST service. This will give a bunch of methods you can use to call transmission daemon.
This needs the inclusion of utils.js
*/
var TransmissionClient=function(host,user,pass,token){
  this.user=user;
  this.pass=pass;
  this.endpoint=host;
  this.sessionToken=token;

  var uber = this;

  var parseSessionToken=function(text){
    var sToken = null;
    try{
      sToken=text.split("X-Transmission-Session-Id")[2].split(":")[1].trim().split("</code>")[0];
    }
    catch(err){}
    return sToken;
  };


  var rpc=function(){
    return uber.endpoint+"/transmission/rpc";
  };

  var callFunction=function(f,args){
    if(typeof f === 'function'){
      f(args);
    }
  };

  var getAuthToken=function(user,pass){
    return "Basic "+btoa(user+":"+pass);
  };

  this.getSession=function(onSuccess,onError){
    Util.http("POST",{"method":"session-get"},
      onSuccess,
      onError
    );
  };

  this.getStats=function(onSuccess,onError){
    Util.http("POST",{ "method" : "session-stats" },
    onSuccess,onError);
  };

  this.getTorrents=function(onSuccess,onError){
    Util.http("POST",{ "method" : "torrent-get",
                  "arguments" : {
                    "fields" : [
                      "id", "name", "status", "errorString", "announceResponse", "recheckProgress", "sizeWhenDone",
                      "leftUntilDone", "rateDownload", "rateUpload", "trackerStats", "metadataPercentComplete", "totalSize",
                      "status", "peersSendingToUs", "seeders", "peersGettingFromUs", "leechers", "eta", "uploadRatio"
                    ]
                  }
                },
                onSuccess,onError
    );
  }

  this.addTorrent=function(torrentlink,onSuccess,onError){
    Util.http("POST",{
      "method":"torrent-add",
        "arguments": {
          "paused":false,
          "filename": torrentlink
        }
      }
    ,onSuccess,onError);
  };

};
