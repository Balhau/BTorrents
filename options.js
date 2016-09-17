//Execute after DOM loaded

document.addEventListener('DOMContentLoaded', function() {

  var btnTestCredentials  = document.getElementById('btnTestCredentials');
  var btnSaveOptions      = document.getElementById('btnSaveOptions');
  var txtApiEndpoint      = document.getElementById('apiEndpoint');
  var txtUser             = document.getElementById('user');
  var txtPassword         = document.getElementById('password');

  var tClient = new TransmissionClient(txtApiEndpoint.value,txtUser.value,txtPassword.value);

  var updateTransmission=function(){
    tClient.user=txtUser.value;
    tClient.pass=txtPassword.value;
    tClient.endpoint = txtApiEndpoint.value;
  }

  btnTestCredentials.addEventListener('click',function(){
    updateTransmission()
    //saveURLLocalStore(txtPatternValue.value);
    //txtCurrValue.innerTexalert("Testing credentials": + txtUser.value + "," + txtPassword.value);t=txtPatternValue.value;
    //alert("Testing credentials: " + txtUser.value + "," + txtPassword.value);
    tClient.getSession(
      function(){
        alert("Autentication Succeded");
      },
      function(){
        alert("Autentication Failed");
      }
    );

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
