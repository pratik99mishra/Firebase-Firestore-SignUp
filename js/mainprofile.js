var name = document.getElementById("name");
var email = document.getElementById("email");
var zipcode = document.getElementById("zipcode");
var phone = document.getElementById("phone");
var password = document.getElementById("password");

var nameRef = firebase.database().ref().child("name")
nameRef.on('value', function(datasnapshot){
    name.innertext = datasnapshot.val();
});