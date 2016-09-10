//Execute after DOM loaded

document.addEventListener('DOMContentLoaded', function() {

  var btnTestCredentials  = document.getElementById('btnTestCredentials');
  var btnSaveOptions      = document.getElementById('btnSaveOptions');
  var txtApiEndpoint      = document.getElementById('apiEndpoint');
  var txtUser             = document.getElementById('user');
  var txtPassword         = document.getElementById('password');

  btnTestCredentials.addEventListener('click',function(){
    //saveURLLocalStore(txtPatternValue.value);
    //txtCurrValue.innerText=txtPatternValue.value;
    alert("Testing credentials");
  });

  btnSaveOptions.addEventListener('click',function(){
    alert("Saving options");
  });

  syncLocalData(function(url,user_name,user_pass){
    txtApiEndpoint.value = url;
    txtUser.value = user_name;
    txtPassword.value = user_pass;
  });
});
