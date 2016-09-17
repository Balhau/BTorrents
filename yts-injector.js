$(document).ready(function() {
  syncLocalData(function(url,user,pass,token){

    tClient = new TransmissionClient(url,user,pass,pass,token);
    tClient.sessionToken = sessionToken

    console.log(tClient);

    var links=document.getElementById('movie-info').getElementsByTagName('p')[0].getElementsByTagName('a');
    Array.from(links).forEach(
      function(link){
        link.onclick=function(){
          var l=this.href;
          this.href="#";
          tClient.addTorrent(l,
          function(){
            alert("Torrent added successfully");
          },
          function(){
            alert("Error while downloading torrent");
          }
        )
      };
    });
  });
});
