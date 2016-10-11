var decorateMovies = function() {
  console.log("Event listener ENTERRED");
  var getSpanLike=function(el){
    var jsonValue = JSON.parse(decodeURIComponent(el.getAttribute('flashvars').split("=")[1].split("&")[0]));
    var divClosing=el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var spanLike=divClosing.getElementsByClassName('mtm _5pcm')[0].getElementsByTagName('button')[0].parentNode;
    var btn=spanLike.getElementsByTagName('button')[0];

    var bHD = document.createElement('button');
    bHD.setAttribute('class',btn.getAttribute('class'));

    var bSD = document.createElement('button');
    bSD.setAttribute('class',btn.getAttribute('class'));

    var aHD = document.createElement('a');
    aHD.setAttribute('href',jsonValue.video_data.progressive.hd_src);
    aHD.setAttribute('target','_blank');
    aHD.innerText="Download HD";

    var aSD = document.createElement('a');
    aSD.setAttribute('href',jsonValue.video_data.progressive.sd_src);
    aSD.setAttribute('target','_blank')
    aSD.innerText="Download SD";

    bHD.appendChild(aHD);
    bSD.appendChild(aSD);
    spanLike.appendChild(bHD);
    spanLike.appendChild(bSD);
  }

  var embeds=document.getElementsByTagName('embed');

  console.log(embeds);

  for(var i=0;i<embeds.length;i++){
    console.log(embeds[i]);
    getSpanLike(embeds[i]);
  }
};


setTimeout(decorateMovies,5000);
