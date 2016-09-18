//Event that run right after page DOM loaded
document.addEventListener('DOMContentLoaded', function() {

  var tClient = null;

  syncLocalData(function(url,user,pass,token){
    tClient = new TransmissionClient(url,user,pass,pass,token);
  });

  var addTorrent=function(url){
    tClient.addTorrent(url,
      function(){alert("Added torrent: "+url);},
      function(){alert("Error while sending torrent");}
    )
  };

  var renderResults = function(result,number){
    var renderHtml = "";

    result.message.slice(0,number).forEach(function(tinfo){
      renderHtml += "<div class='torrentInfo'>";
      renderHtml += "<div class='name'>"+tinfo.name+"</div>";
      renderHtml += "<p><a href='#' data='"+btoa(tinfo.magnetLink)+"'>MagnetLink</a></p>";
      renderHtml += "<p><a href='#' data='"+btoa(tinfo.magnetLink)+"'>TorrentLink</a></p>";
      renderHtml += "<p><span>"+tinfo.date+"</span></p>";
      renderHtml += "<p><span>Seeders: "+tinfo.seeders+"</span></p>";
      renderHtml += "<p><span>Leechers: "+tinfo.leechers+"</span></p>";
      renderHtml += "</div>";
    });

    divResults.innerHTML = renderHtml;

    var aEl = divResults.getElementsByTagName('a');
    Array.from(aEl).forEach(function(el){
      var data = el.getAttribute("data");
      el.onclick = function(){
        addTorrent(atob(data));
      }
    });
  };

  var render100 = function(result){
    renderResults(result,100);
  }

  var renderError = function(xhr){
      divResults.innerHTML="Error while retrieving data"
  };

  var txtSearch   = document.getElementById('txtSearch');
  var btnSearch   = document.getElementById('btnSearch');
  var divResults  = document.getElementById('divResults');

  btnSearch.addEventListener('click',function(){
    var pb=new WebPT.PirateBay.API(service_url);
    pb.searchTorrents(txtSearch.value,0,render100,renderError);
  });
});
