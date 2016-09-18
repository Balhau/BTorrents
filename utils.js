var Util = {};

Util.http = function(host,method,pdata,headers,onSuccess,onError){
  $.ajax({
    url: host,
    headers: headers,
    data: JSON.stringify(pdata),
    type: method,
    success:onSuccess,
    error:onError
  });
};

Util.call=function(f,args){
  if(typeof f === 'function'){
    f(args);
  }
};
