//Event that run right after page DOM loaded
document.addEventListener('DOMContentLoaded', function() {

  var txtSearch       = document.getElementById('txtSearch');
  var btnSearch       = document.getElementById('btnSearch');
  var btnSearchNext   = document.getElementById('btnSearchNext')
  var btnSearchPrev   = document.getElementById('btnSearchPrev')
  var divResults      = document.getElementById('divResults');
  var chkDisplayYTS   = document.getElementById('displayYTS');
  var btnYtsPrevious  = document.getElementById('ytsPrevious');
  var btnYtsNext      = document.getElementById('ytsNext');
  var divYts          = document.getElementById('divYts');

  var ytsCurrPage     = 1;
  var searchCurrPage  = 0;

  syncLocalData(function(url,user,pass,token){
    tClient = new TransmissionClient(url,user,pass,pass,token);
  });

  var addTorrent=function(url){
    tClient.addTorrent(url,
      function(){alert("Added torrent:");},
      function(){alert("Error while adding torrent");}
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

  btnSearchPrev.addEventListener('click',function(){
    if(searchCurrPage>0) searchCurrPage--;
    loadTorrents(txtSearch.value,searchCurrPage);
  });

  btnSearchNext.addEventListener('click',function(){
    searchCurrPage++;
    loadTorrents(txtSearch.value,searchCurrPage);
  });

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
      renderHtml += "<p class='ytsDsc'><a target='_blank' href='"+tinfo.rottenTomatoesCritics.url+"'>"+tinfo.rottenTomatoesCritics.description+":"+tinfo.rottenTomatoesCritics.value+"</a></p>";
      renderHtml += "<p class='ytsDsc'><a target='_blank' href='"+tinfo.getRottenTomatoesAudience.url+"'>"+tinfo.getRottenTomatoesAudience.description+":"+tinfo.getRottenTomatoesAudience.value+"</a></p>";
      renderHtml += "<p class='ytsDsc'><a target='_blank' href='"+tinfo.imdb.url+"'>"+tinfo.imdb.description+":"+tinfo.imdb.value+"</a></p>";
      renderHtml += "<p class='ytsDsc'>Likes: "+tinfo.likes+"</p>";
      tinfo.torrentLinks.forEach(function(link){
        renderHtml += "<p class='ytsDsc'><a href='#' data='"+btoa(link.url)+"'>"+link.description+"</a>";
      });
      renderHtml += "</div>";
    });

    divYts.innerHTML=renderHtml;

    var aLinks = Array.from(divYts.getElementsByTagName("a")).slice(3);
    addEventToAnchors(aLinks);
  };

  var renderTorrentResults = function(result,number){
    var renderHtml = "";

    result.message.slice(0,number).forEach(function(tinfo){
      renderHtml += "<div class='torrentInfo'>";
      renderHtml += "<div class='name'><b>"+tinfo.title+"</b></div>";
      renderHtml += "<div class='name'>"+tinfo.description+"</div>";
      renderHtml += "<p><a href='#' data='"+btoa(tinfo.magnetLink)+"'>MagnetLink</a></p>";
      renderHtml += "<p><a href='#' data='"+btoa(tinfo.magnetLink)+"'>TorrentLink</a></p>";
      renderHtml += "<p><span>"+tinfo.date+"</span></p>";
      renderHtml += "<p><span>Seeders: "+tinfo.seeders+"</span></p>";
      renderHtml += "<p><span>Leechers: "+tinfo.leechers+"</span></p>";
      renderHtml += "</div>";
    });

    divResults.innerHTML = renderHtml;

    addEventToAnchors(divResults.getElementsByTagName("a"));
  };

  var addEventToAnchors=function(anchors){
    Array.from(anchors).forEach(function(el){
      var data = el.getAttribute("data");
      el.onclick = function(){
        addTorrent(atob(data));
      }
    });
  }

  var render100 = function(result){
    renderTorrentResults(result,100);
  }

  var renderError = function(xhr){
      divResults.innerHTML="Error while retrieving data"
  };

  var loadTorrents=function(query,page){
    divResults.innerHTML="<img class='loading' src='loading.gif'></img>";
    divResults.style.backgroundColor = window.getComputedStyle(document.body).backgroundColor;
    var pb=new WebPT.PirateBay.API(service_url);
    pb.searchTorrents(query,page,render100,renderError);
  }

  btnSearch.addEventListener('click',function(){
    searchCurrPage=0;
    loadTorrents(txtSearch.value,searchCurrPage);
  });
});
