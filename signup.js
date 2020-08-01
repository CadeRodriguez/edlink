var firebaseConfig = {
    apiKey: "AIzaSyDQqS1OuU1s8cwkyQDcgqQV9vquxFZAfTU",
    authDomain: "partheanedlink.firebaseapp.com",
    databaseURL: "https://partheanedlink.firebaseio.com",
    projectId: "partheanedlink",
    storageBucket: "partheanedlink.appspot.com",
    messagingSenderId: "244645197259",
    appId: "1:244645197259:web:23e5b88a5ab02d3faa324e",
    measurementId: "G-N60RNK9K3L"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  firebase.auth();
  var db = firebase.firestore();
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

//signing up users
$("#form1").submit(function(e) {
  e.preventDefault();
    // what the user inputs is saved in a variable: email_input
      var email = document.getElementById("newEmailInput").value;
      console.log(email);
    // what the user inputs is saved in a variable: password_input
      var password = document.getElementById("newPassInput").value;
      console.log(password);
    // call signUp
    signUp();
    // call EmailVerification here in hopes that it will only send emails for new users
    sendEmailVerification();
})

//signing in users
$("#login").submit(function(e) {
  e.preventDefault();
    console.log("button click!");
    // call signIn < DOESN'T CURRENTLY WORK
    login();
})


// function for new user sign up in a way that makes sense
function signUp() {
  // what the user inputs is saved in a variable: email_input
    var email = document.getElementById("newEmailInput").value;
  // what the user inputs is saved in a variable: password_input
    var password = document.getElementById("newPassInput").value;
  // save user info to database
    function saveUserToDatabase(email,password){
      doc = db.collection("users").add({
        email: email,
        password: password,
      })
    }
// print to console that the user info is actually saved so we know it works
  console.log("infoSaved");
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  alert("signed up!");
  console.log("signedUp!");
}

// function to send email verification to prevent bots or something idk this is completely optional
function sendEmailVerification() {
  firebase.auth().currentUser.sendEmailVerification().then(function() {
    // email verification sent
    alert("email verification sent!");
  });
}

function login() {
// retrieve email and password input
  var email = document.getElementById('email_input').value;
  var password = document.getElementById('pass_input').value;
  // actual sign-in command
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // handling errors such as incorrect info
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      // CHANGETHIS: i would like to change this so that it doesn't alert but rather shows up on the webpage so it looks classier
      alert('wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}
