import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore,addDoc,collection } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
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

const name = document.getElementById("name");
const price = document.getElementById("price");
const image = document.getElementById("url");
const des = document.getElementById("des");
const rate = document.getElementById("rate");
const nd = document.getElementById("nd");

document.getElementById("addB").addEventListener("click", async () => {
    if (name.value && price.value && image.value) {
     const docRef = await addDoc(collection(db, "spck"), {
        name: name.value,
        price: price.value,
        image: image.value,
        des: des.value,
      });
      alert("ok");
    } else {
      alert("sai");
    }
});
document.getElementById("addB2").addEventListener("click", async () => {
   const docRef = await addDoc(collection(db, "comment"), {
      nd: nd.value,
      rate: rate.value,
    });
    alert("ok");
});

