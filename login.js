import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAQXm4jPJlv05o4qJqc41DWDEapmddo9GE",
  authDomain: "spck-3848c.firebaseapp.com",
  projectId: "spck-3848c",
  storageBucket: "spck-3848c.appspot.com",
  messagingSenderId: "1082942817239",
  appId: "1:1082942817239:web:c1693434e3dd51eecd0192",
  measurementId: "G-6E37XN59H3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginB = document.querySelector("#Button");
loginB.addEventListener("click", () =>{
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#pass").value;

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => { 
    const user = userCredential.user;
    window.location.replace("index.html");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Tên đăng nhập hoặc mật khẩu không đúng");
  });
})

const open2=document.getElementById("open2");
const modal_container_2 =  document.getElementById("modal-container-2");
open2.addEventListener("click",()=>{
      modal_container_2.classList.add("show");
})

document.getElementById("btn-close-2").addEventListener("click",()=>{
  modal_container_2.classList.remove("show");
})

