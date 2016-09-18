/**
* This is the javascript API for the webpt web services
*/
var WebPT = {};

WebPT.PirateBay = {};

/**
* TorrentInfo information
*/
WebPT.PirateBay.TorrentInfo = function(name,magnetLink,torrentLink,date,seeders,leechers){
  this.name=name;
  this.torrentLink=torrentLink;
  this.date=date;
  this.seeders=seeders;
  this.leechers=leechers;
};



WebPT.PirateBay.API=function(host){
  this.host=host;
};

WebPT.PirateBay.API.prototype.searchTorrents = function(query,page,onSuccess,onError){
  Util.http(
    this.host+"/ws/piratebay/torrents","PUT",{
      "query" : query,
      "page"  : page,
      "order" : "99",
    },{
      "Content-Type" : "application/json"
    },onSuccess,onError
  );
};
