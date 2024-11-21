//(----------------------------------------------CONTACT US FORM FIREBASE INTEGRATION STARTS---------------------------------------------)

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyArnmUuPEy1oU7nboJBtOMi3MrOfKlaDa4",
    authDomain: "rethinkwaste-722006.firebaseapp.com",
    databaseURL: "https://rethinkwaste-722006-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "rethinkwaste-722006",
    storageBucket: "rethinkwaste-722006.firebasestorage.app",
    messagingSenderId: "280942212070",
    appId: "1:280942212070:web:e403f694dde22836d71c27"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
// Till here everything permanent.

// Reference contactInfo collections
var contactInfo = firebase.database().ref("contactqueries");

//Listening submission
document.querySelector(".contact-form").addEventListener("submit",submitForm);

function submitForm(e)
{
    e.preventDefault();
    
    //Getting input Values
    let name = document.querySelector(".name").value;
    let email = document.querySelector(".email").value;    
    let message = document.querySelector(".message").value;
    console.log(name,email,message);

    saveContactInfo(name, email, message);
}

// Save Infos to Firebase 
function saveContactInfo(name, email, message)
{
    let newContactInfo = contactInfo.push();
    newContactInfo.set({
        name: name,
        email: email,        
        message: message,
    });
}
