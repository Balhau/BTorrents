//Execute after DOM loaded
document.addEventListener('DOMContentLoaded', function() {

  var btnTestCredentials  = document.getElementById('btnTestCredentials');
  var btnSaveOptions      = document.getElementById('btnSaveOptions');
  var txtApiEndpoint      = document.getElementById('apiEndpoint');
  var txtUser             = document.getElementById('user');
  var txtPassword         = document.getElementById('password');

  var sync=function(){
    syncLocalData(function(url,user_name,user_pass,stoken){
      txtApiEndpoint.value = url;
      txtUser.value = user_name;
      txtPassword.value = user_pass;
      sessionToken=stoken;
      tClient = new TransmissionClient(txtApiEndpoint.value,txtUser.value,txtPassword.value);
      tClient.sessionToken = sessionToken
      console.log("TCLIENT");
      console.log(tClient);
    });
  };

  sync();

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
    saveLocalStore(txtApiEndpoint.value,txtUser.value,txtPassword.value,tClient.sessionToken);
  });
});
