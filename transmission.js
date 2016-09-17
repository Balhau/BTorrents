/**
This is a javascript API for the Transmission Daemon REST service. This will give a bunch of methods you can use to call transmission daemon.

*/
var TransmissionClient=function(host,user,pass){
  this.user=user;
  this.pass=pass;
  this.endpoint=host;
  this.sessionToken=null;

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
    return "http://"+uber.endpoint+"/transmission/rpc";
  };

  var callFunction=function(f){
    if(typeof f === 'function'){
      f();
    }
  };

  var getAuthToken=function(user,pass){
    return "Basic "+btoa(user+":"+pass);
  };

  var postMessageData = function(pdata,onSuccess,onError){
    var authToken = getAuthToken(transmission.user,transmission.pass);

    console.log(uber)

    var headers = {
      'Authorization' : authToken,
      'Content-Type':'application/json; charset=UTF-8',
      'X-Transmission-Session-Id' : uber.sessionToken,
    };

    $.ajax({
      url: rpc(),
      headers: headers,
      data: JSON.stringify(pdata),
      type:"POST",
      success:function(data){
        console.log(data);
        callFunction(onSuccess);
      },
      error:function(xhr, textStatus, errorThrown){
        console.log(uber);
        uber.sessionToken=parseSessionToken(xhr.responseText);
        if(uber.sessionToken==null){
          callFunction(onError);
        }
        alert("Acquired session token, click again to proceed with operations");
        console.log("Retrieved session-token: "+uber.sessionToken);
      }
    });
  };

  this.getSession=function(onSuccess,onError){
    postMessageData({"method":"session-get"},
      onSuccess,
      onError
    );
  };

  this.getStats=function(onSuccess,onError){
    postMessageData({ "method" : "session-stats" },
    onSuccess,onError);
  };

  this.getTorrents=function(onSuccess,onError){
    postMessageData({ "method" : "torrent-get",
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

  var transmission = this;
};
