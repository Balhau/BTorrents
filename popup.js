//Event that run right after page DOM loaded
document.addEventListener('DOMContentLoaded', function() {

  var tClient = null;

  var txtSearch       = document.getElementById('txtSearch');
  var btnSearch       = document.getElementById('btnSearch');
  var divResults      = document.getElementById('divResults');
  var chkDisplayYTS   = document.getElementById('displayYTS');
  var btnYtsPrevious  = document.getElementById('ytsPrevious');
  var btnYtsNext      = document.getElementById('ytsNext');
  var divYts          = document.getElementById('divYts');

  var ytsCurrPage     = 1;

  syncLocalData(function(url,user,pass,token){
    tClient = new TransmissionClient(url,user,pass,pass,token);
  });

  var addTorrent=function(url){
    tClient.addTorrent(url,
      function(){console.log("Added torrent: "+url);},
      function(){console.log("Error while sending torrent");}
    )
  };

  var loadYTSContent = function(page){
    var yts = new WebPT.YTS.API(service_url);
    yts.getYTSPage(page,
      function(data){
        renderYTSResults(data,100);
      },
      function(){
        console.log("Error");
      }
    )
  };

  btnYtsPrevious.addEventListener('click',function(){
    if(ytsCurrPage>1) ytsCurrPage--;
    loadYTSContent(ytsCurrPage);
  });

  btnYtsNext.addEventListener('click',function(){
    ytsCurrPage++;
    loadYTSContent(ytsCurrPage);
  });

  var toggleYTS = function(){
    ytsCurrPage=1;
    btnYtsPrevious.disabled = !chkDisplayYTS.checked;
    btnYtsNext.disabled = !chkDisplayYTS.checked;

    if(chkDisplayYTS.checked === true){
      loadYTSContent(ytsCurrPage);
    }else{
      divYts.innerHTML="";
    }
  }

  chkDisplayYTS.onclick=toggleYTS;

  var renderYTSResults = function(results,number){
    var renderHtml = "";

    results.message.slice(0,number).forEach(function(tinfo){
      renderHtml += "<div class='left ytsInfo'>";
      renderHtml += "<img class='thumbnail' src='"+tinfo.imageURL+"'></img>";
      renderHtml += "<div class='name'>"+tinfo.description+"</div>";
      renderHtml += "<p class='ytsDsc'>Rotten Tomatoes Critics: "+tinfo.rottenTomatoesCritics+"</p>";
      renderHtml += "<p class='ytsDsc'>Rotten Tomatoes Audience: "+tinfo.getRottenTomatoesAudience+"</p>";
      renderHtml += "<p class='ytsDsc'>IMDB: "+tinfo.imdb+"</p>";
      renderHtml += "<p class='ytsDsc'>Likes: "+tinfo.likes+"</p>";
      tinfo.torrentLinks.forEach(function(link){
        renderHtml += "<p class='ytsDsc'><a href='#' data='"+btoa(link.url)+"'>"+link.description+"</a>";
      });
      renderHtml += "</div>";
    });

    divYts.innerHTML=renderHtml;

    addEventToAnchors(divYts);
  };

  var renderTorrentResults = function(result,number){
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

    addEventToAnchors(divResults);
  };

  var addEventToAnchors=function(parent){
    var aEl = parent.getElementsByTagName('a');
    Array.from(aEl).forEach(function(el){
      var data = el.getAttribute("data");
      el.onclick = function(){
        addTorrent(atob(data));
      }
    });
  }

  var render100 = function(result){
    renderResults(result,100);
  }

  var renderError = function(xhr){
      divResults.innerHTML="Error while retrieving data"
  };

  btnSearch.addEventListener('click',function(){
    var pb=new WebPT.PirateBay.API(service_url);
    pb.searchTorrents(txtSearch.value,0,render100,renderError);
  });
});
