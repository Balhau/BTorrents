var Util = {};

Util.http = function(method,pdata,onSuccess,onError){
  var authToken = getAuthToken(uber.user,uber.pass);

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
    type: method,
    success:function(data){
      console.log(data);
      callFunction(onSuccess,data);
    },
    error:function(xhr, textStatus, errorThrown){
      console.log(uber);
      uber.sessionToken=parseSessionToken(xhr.responseText);
      if(uber.sessionToken==null){
        callFunction(onError,xhr);
      }
      alert("Acquired session token, click again to proceed with operations");
      console.log("Retrieved session-token: "+uber.sessionToken);
    }
  });
};
