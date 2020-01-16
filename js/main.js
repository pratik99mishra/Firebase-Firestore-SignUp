//initialize firebase firestore
var db = firebase.firestore();

function registeruser(){

  var email=document.getElementById('email').value;
  var password=document.getElementById('password').value;
  var name=document.getElementById('name').value;
  var zipcode=document.getElementById('zipcode').value;
  var phone=document.getElementById('phone').value;


  firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
    //alert('user Register Successfully');
    var id=firebase.auth().currentUser.uid;
    firebase.database().ref('Messages/'+id).set({
       name : name,
       zipcode : zipcode,
       phone : phone, 
    })
    window.location.replace("http://localhost/SignUp-Form/Login.html");
}).catch(function(error){
    var errorcode=error.code;
    var errormsg=error.message;
});
 
 
// Add a new document in collection "Users"
  db.collection("Users").doc().set({
  name: name,
  email: email,
  zipcode: zipcode,
  phone: phone,
  password: password
})
.then(function() {
  console.log("Document successfully written!");
})
.catch(function(error) {
  console.error("Error writing document: ", error);
});
}


(function($) {

    $(".toggle-password").click(function() {

        $(this).toggleClass("zmdi-eye zmdi-eye-off");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
          input.attr("type", "text");
        } else {
          input.attr("type", "password");
        }
      });

})(jQuery);


//Refrence messages Collection
var messagesRef = firebase.database().ref('messages');


document.getElementById('signup-form').addEventListener('submit',submitForm);

//submit form
function submitForm(e){
  e.preventDefault();
  
  //Get Values
  var name = getInputval('name');
  var email = getInputval('email');
  var zipcode = getInputval('zipcode');
  var phone = getInputval('phone');
  var password = getInputval('password');

  //save message
  saveMessage(name, email, zipcode, phone, password);

  //show alert
  document.querySelector('.alert').style.display = 'block';

  //Hide alert after 3 second
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none'; 
  },3000);

  //Clear Form
  document.getElementById('signup-form').reset();

}

//Function to get form values 
function getInputval(id){
  return document.getElementById(id).value;
}


//save message to firebase
function saveMessage(name, email, zipcode, phone, password){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email: email,
    zipcode: zipcode,
    phone: phone,
    password: password
  });
}




