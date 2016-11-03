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

if(Array.from == undefined){
  Array.from=function(a){
    var out=[];
    for(var i=0;i<a.length;i++){
       out[i]=a[i];
    }
    return out;
  }
}
