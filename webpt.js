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


WebPT.Piratebay.API=function(host){
  this.host=host;
};
