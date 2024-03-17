import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth,
    createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyAQXm4jPJlv05o4qJqc41DWDEapmddo9GE",
  authDomain: "spck-3848c.firebaseapp.com",
  projectId: "spck-3848c",
  storageBucket: "spck-3848c.appspot.com",
  messagingSenderId: "1082942817239",
  appId: "1:1082942817239:web:c1693434e3dd51eecd0192",
  measurementId: "G-6E37XN59H3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const signupB = document.querySelector("#Button");

signupB.addEventListener("click", () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#pass").value;
    const pass2 = document.getElementById("pass2").value;

    if (pass2==password){
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    alert("OK");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("lỗi");
  });
} else {
  alert("Vui lòng xác nhận lại mật khẩu")
}
})

