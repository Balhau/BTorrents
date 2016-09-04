//Execute after DOM loaded

document.addEventListener('DOMContentLoaded', function() {
  syncLocalData(function(url){

    var btnTestCredentials  = document.getElementById('btnTestCredentials');
    var btnSaveOptions      = document.getElementById('btnSaveOptions');
    var txtPatternValue     = document.getElementById('txtPatternValue');
    var txtCurrValue        = document.getElementById('txtCurrValue');

    txtCurrValue.innerText=url;

    txtPatternValue.value=url;

    btnTestCredentials.addEventListener('click',function(){
      //saveURLLocalStore(txtPatternValue.value);
      //txtCurrValue.innerText=txtPatternValue.value;
      alert("Testing credentials")
    });

    btnSaveOptions.addEventListener('click',function()){
      alert("Saving options")
    }

  });
})
