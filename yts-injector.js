$(document).ready(function() {
  syncLocalData(function(url,user,pass,token){
    tClient = new TransmissionClient(url,user,pass,pass,token);
    console.log(tClient);
  });

  var links=document.getElementById('movie-info').getElementsByTagName('p')[0].getElementsByTagName('a');

  Array.from(links).forEach(
    function(link){
      link.onclick=function(){
        var l=this.href;
        var validLink = l.split(".torrent").length != 1;
        console.log(l.split(".torrent"));
        if(validLink){
          tClient.addTorrent(l,
          function(){
              alert("Torrent added successfully");
          },
          function(){
            alert("Error while downloading torrent");
          }
        )
      }
      return false;
    };
  });

});
