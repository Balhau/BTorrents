//Event that run right after page DOM loaded


//This will check the url against a list of recognized patterns
var getPattern=function(downloadPatterns,url){
  for(var i=0;i<downloadPatterns.length;i++){
    if(url!=null && url.split(downloadPatterns[i].pattern).length>1){
      return downloadPatterns[i];
    }
  }
  return null;
};

var tClient = null;

document.addEventListener('DOMContentLoaded', function() {
  //After syncTheLocalData we can start processing the data
  syncLocalData(function(url,user,pass,token){
      tClient = new TransmissionClient(url,user,pass,token);
      tClient.sessionToken = token;
    });
  });
