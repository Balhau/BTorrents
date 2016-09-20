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

  var getAuthToken=function(user,pass){
    return "Basic "+btoa(user+":"+pass);
  };

  var post=function(data,onSuccess,onError){
    var authToken = getAuthToken(uber.user,uber.pass);

    var buildHeaders=function(aToken,sToken) {
      return {
        'Authorization' : aToken,
        'Content-Type':'application/json; charset=UTF-8',
        'X-Transmission-Session-Id' : sToken,
      };
    };

    var onSuccessW = function(data){
      Util.call(onSuccess,data);
    };

    var onErrorBuilder = function(tryNumber){
      return function(xhr, textStatus, errorThrown){
        uber.sessionToken=parseSessionToken(xhr.responseText);
        console.log("Not sessionToken, trying"+tryNumber);
        if(tryNumber>0){
          postWithRetry(tryNumber-1,buildHeaders(authToken,uber.sessionToken));
          return;
        }else{
          Util.call(onError,xhr);
          console.log("Retrieved session-token: "+uber.sessionToken);
        }
      };
    };

    var postWithRetry = function(numberRetry,headers){
      var localOnError = onErrorBuilder(numberRetry);
      if(numberRetry>0){
        Util.http(
          rpc(),"POST",data,headers,onSuccessW,localOnError
        );
      }
    };

    postWithRetry(3,buildHeaders(authToken,uber.sessionToken));
  };

  this.getSession=function(onSuccess,onError){
    post({"method":"session-get"},
      onSuccess,
      onError
    );
  };

  this.getStats=function(onSuccess,onError){
    post({ "method" : "session-stats" },
      onSuccess,
      onError
    );
  };

  this.getTorrents=function(onSuccess,onError){
    post({ "method" : "torrent-get",
                  "arguments" : {
                    "fields" : [
                      "id", "name", "status", "errorString", "announceResponse", "recheckProgress", "sizeWhenDone",
                      "leftUntilDone", "rateDownload", "rateUpload", "trackerStats", "metadataPercentComplete", "totalSize",
                      "status", "peersSendingToUs", "seeders", "peersGettingFromUs", "leechers", "eta", "uploadRatio"
                    ]
                  }
                },
                onSuccess,
                onError
    );
  }

  this.addTorrent=function(torrentlink,onSuccess,onError){
    post({
      "method":"torrent-add",
        "arguments": {
          "paused":false,
          "filename": torrentlink
        }
      }
    ,onSuccess,onError);
  };

};
