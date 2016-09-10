var TransmissionClient=function(user,pass){
  this.user=user;
  this.pass=pass;
  this.sessionToken="sessionToken";

  var getAuthToken=function(user,pass){
    return "Basic "+btoa(user+":"+name);
  };

  var parseSessionToken=function(text){
    return text.split("X-Transmission-Session-Id")[2].split(":")[1].trim().split("</code>")[0]
  };

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
  };

}

TransmissionClient.prototype.getSession=function(){
  postMessage({"method":"session-get"});
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
