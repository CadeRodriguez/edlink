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
  var storage = firebase.storage();

  function sLinks(){ //shows links and hides design
      document.getElementById('linksPart').style.display='block';
      document.getElementById('designPart').style.display='none';
  }

  function sDesign(){ //shows design and hides links
      document.getElementById('linksPart').style.display='none';
      document.getElementById('designPart').style.display='block';
  }


// code to change picture
var chooseImage = document.getElementById('chooseImage');
var imgFile = document.getElementById('imgFile');
  chooseImage.addEventListener("click",function(){
    imgFile.click();
  });

imgFile.addEventListener("change", handleFiles, false);

function handleFiles() {
  if (this.files.length){
    for (let i = 0; i < this.files.length; i++) {
    var profileImage = document.getElementById("profileImage");


    profileImage.src = URL.createObjectURL(this.files[i]);
    var userId = "tNelH5tZvedOWMJM16Jd8GLQj493";
  }
  var previewImage = document.getElementById("previewImage");
  previewImage.src = profileImage.src;
  console.log(profileImage.src);
// uploading to storage
  // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();
  // Create a storage reference from our storage service
    var storageRef = storage.ref();
  // referencing blob carrying user image
    var file = this.files[0];
  // setting metadata
    var metadata = {
      contentType: 'image/jpeg'
    };
  // upload image with metadata
    var uploadTask = storageRef.child('userImages/' + userId).put(file, metadata);


  }
}


  $('#form1').submit(function(e) {
  	e.preventDefault(); //keeps page from refreshing
      console.log('posted!');

  	// So this block stores the link the user inputs, but doesn't do anything with it yet
      var link_link_input = document.getElementById('link_link_input');
      var hyperlink = link_link_input.value;
    // This block stores the title, for when the link is posted
  	  var link_title_input = document.getElementById('link_title_input');
  	  var post_text = link_title_input.value; // setting a new variable with the value

  	//Posts everything
      addPost(post_text, hyperlink);

    // saves information by calling saveWebElements
    console.log("calling saveWebElements");
       saveWebElements(post_text, hyperlink);
    //Deletes whats in the input after user submits
      link_link_input.value = '';
      link_title_input.value = '';
  });

  // saveItemToDatabase function
  function saveWebElements(post_text,hyperlink){
    // saving the inputted information in new documents (should be titled after userId)
    var userId = "tNelH5tZvedOWMJM16Jd8GLQj493";
      doc = db.collection("users").doc(userId).collection("page").add({
          title: post_text,
          link: hyperlink,
    })
    .catch(function(error){
      console.error("error writing document:", error);
    });
  }

  function addPost(post_text, hyperlink, doc) {

  //background card
  	var post_card = document.createElement('a'); // creates an a tag
  	var breakline = document.createElement('br');
  // x to delete cards
    var x = document.createElement('p');

  	post_card.classList.add('post_card');
  	post_card.href = hyperlink;
  	post_card.setAttribute('target', '_blank');

  	// Title

  	var post_text_elem = document.createElement('div'); // creates a span
  	post_text_elem.innerHTML = post_text; //returns the content of the HTML to variable
    // setting id of x element
       x.classList.add('delete');
    // set innerHTML of x
       x.innerHTML = "delete card";
    post_card.appendChild(x);
  	post_card.appendChild(post_text_elem);

    // attaching the x onto the phone-preview
      document.getElementById('phone-preview').appendChild(x);
  	  document.getElementById('phone-preview').appendChild(post_card);
  	  document.getElementById('phone-preview').appendChild(breakline);

  // remove card when clicked
  x.addEventListener("click", function() {
    var userId = "tNelH5tZvedOWMJM16Jd8GLQj493";

    db.collection("users").doc(userId).collection("page").get()
      .then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
          console.log(doc.id);

            var post_card_id = doc.id;
            post_card.id = post_card_id;


        document.getElementById(post_card_id).remove();
        x.remove();
        db.collection("users").doc(userId).collection("page").doc(post_card_id).delete();
      })
    })

    });
  //
  	//drag and drop

  }

  function customtheme(){
  	var inp1 = document.getElementById('custom-inp1').value;
  	var inp2 = document.getElementById('custom-inp2').value;
  	document.getElementById('phone-preview').style.backgroundImage = 'linear-gradient(#'+inp1+', #'+inp2+')';
    var userId = "tNelH5tZvedOWMJM16Jd8GLQj493";
    doc = db.collection("users").doc(userId).collection("gradient").doc("gradients").set({
          gradient: 'linear-gradient(#'+inp1+', #'+inp2+')'
    });
  }

  function optheme(){
  	document.getElementById('phone-preview').style.backgroundImage = 'linear-gradient(yellow, #FF30AC)';
    var userId = "tNelH5tZvedOWMJM16Jd8GLQj493";
    doc = db.collection("users").doc(userId).collection("gradient").doc("gradients").set({
          gradient: "linear-gradient(yellow, #FF30AC)"
    });
  }

  function bgtheme(){
  	document.getElementById('phone-preview').style.backgroundImage = 'linear-gradient(#4BFFD4, #3787FF)';
    var userId = "tNelH5tZvedOWMJM16Jd8GLQj493";
    doc = db.collection("users").doc(userId).collection("gradient").doc("gradients").set({
          gradient: 'linear-gradient(#4BFFD4, #3787FF)'
    });
  }

  function pptheme(){
  	document.getElementById('phone-preview').style.backgroundImage = 'linear-gradient(#FF96CE, #933FFF)';
    var userId = "tNelH5tZvedOWMJM16Jd8GLQj493";
    doc = db.collection("users").doc(userId).collection("gradient").doc("gradients").set({
          gradient: 'linear-gradient(#FF96CE, #933FFF)'
    });
  }

  function bwtheme(){
  	document.getElementById('phone-preview').style.backgroundImage = 'linear-gradient(yellow, #5FFE78)';
    var userId = "tNelH5tZvedOWMJM16Jd8GLQj493";
    doc = db.collection("users").doc(userId).collection("gradient").doc("gradients").set({
          gradient: 'linear-gradient(yellow, #5FFE78)'
    });
  }

  const draggables = document.querySelectorAll('.draggable')
  const containers = document.querySelectorAll('#links-container')

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging')
    })
  })

  containers.forEach(container => {
    container.addEventListener('dragover', e => {
      e.preventDefault()
      const afterElement = getDragAfterElement(container, e.clientY)
      const draggable = document.querySelector('.dragging')
      if (afterElement == null) {
        container.appendChild(draggable)
      } else {
        container.insertBefore(draggable, afterElement)
      }
    })
  })

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
  }
// END OF CADE'S CODE ------------------------------------------>


// function to load the user's webpage
  function loadPage(){
      var userId = "tNelH5tZvedOWMJM16Jd8GLQj493";
    db.collection("users").doc(userId).collection("page").get().then(function(querySnapshot) {
    // this is why i'm getting those undefined returns
      querySnapshot.forEach(function(doc) {
      // setting doc data for link as hyperlink
          var hyperlink = doc.data().link;
      // setting doc data for title as post_text
      	   var post_text = doc.data().title;
            addPost(post_text, hyperlink);
      // bringing back gradient
        });
      })
  // bringing back profile picture
    // referencing data location
      var storage = firebase.storage();
      var storageRef = storage.ref();
    // downloading image url from storageRef
      storageRef.child('userImages/' + userId).getDownloadURL().then(function(url) {
        var profileImage = document.getElementById("profileImage");
          profileImage.src = url;
        var previewImage = document.getElementById("previewImage");
          previewImage.src = profileImage.src;
  // bringing back gradients
    db.collection("users").doc(userId).collection("gradient").get().then(function(querySnapshot) { querySnapshot.forEach(function(doc) {
      document.getElementById('phone-preview').style.backgroundImage = doc.data().gradient;
    })
    })
      })
  }
// calling the function above when the page comes back
$(document).ready(function(){
    loadPage();
});
