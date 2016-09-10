/**
This is a javascript API for the Transmission Daemon REST service. This will give a bunch of methods you can use to call transmission daemon.

*/
var TransmissionClient=function(host,user,pass){
  this.user=user;
  this.pass=pass;
  this.endpoint=host;
  this.sessionToken="sessionToken";

  var rpc=function(){
    return "http://"+endpoint+"/transmission/rpc";
  }

  var getAuthToken=function(user,pass){
    return "Basic "+btoa(user+":"+name);
  };

  var parseSessionToken=function(text){
    return text.split("X-Transmission-Session-Id")[2].split(":")[1].trim().split("</code>")[0]
  };

  var postMessage=function(pdata){
    var authToken = getAuthToken(user,pass)
    $.ajax({
      url: rpc(),
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
  };
}


TransmissionClient.prototype.getSession=function(){
  postMessage({"method":"session-get"});
};

TransmissionClient.prototype.getStats=function(){
  postMessage({ "method" : "session-stats" });
};

TransmissionClient.prototype.getTorrents=function(){
  postMessage({ "method" : "torrent-get",
                "arguments" : {
                  "fields" : [
                    "id", "name", "status", "errorString", "announceResponse", "recheckProgress", "sizeWhenDone",
                    "leftUntilDone", "rateDownload", "rateUpload", "trackerStats", "metadataPercentComplete", "totalSize",
                    "status", "peersSendingToUs", "seeders", "peersGettingFromUs", "leechers", "eta", "uploadRatio"
                  ]
                }
              });
}