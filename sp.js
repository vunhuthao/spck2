import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth,signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore,addDoc,collection,getDocs,onSnapshot,query } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
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

const q = query(collection(db, "spck"));

const querySnapshot = await getDocs(q);
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
  } else {
    // User is signed out
    // ...
    window.location.replace("login.html");
  }
});

const open = document.getElementById("open");
const close = document.getElementById("btn-close");
const modal_container =  document.getElementById("modal-container");
open.addEventListener("click",()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      modal_container.classList.add("show");
      const uid = user.uid;
    } else {
      window.location.replace("login.html");
    }
  });
})
close.addEventListener("click",()=>{
    modal_container.classList.remove("show");
})
document.getElementById("try").addEventListener("click",()=>{
  signOut(auth).then(() => {
      alert("Đã đăng xuất thành công");
    }).catch((error) => {
      window.location.replace("login.html");
    });
})

onSnapshot(q, (querySnapshot) => {
    let productHtml ='';
    querySnapshot.forEach((doc) => {
        productHtml += `
        <div>
         <h2>${doc.data().name}</h1> 
         <img src="${doc.data().image}" height="150px" width="150px" margin-left="auto">
         <p>Giá: ${doc.data().price},000đ</p>       
         <a href="1.html"><button id="set_${doc.id}">Thông tin</button><a>
        </div>
        `
        addListener2();
      });
      document.getElementById('body2').innerHTML = productHtml;
  });


  const addListener2 = async () => {
    const queryS = await getDocs(collection(db, "spck"));
  
    queryS.forEach((data) => {
      const addB = document.querySelector(`#set_${data.id}`);
      addB.addEventListener("click",() => {
        localStorage.removeItem('id');
        localStorage.setItem('id', `${data.id}`);
        window.location.replace("1.html");
        console.log("thanh cong");
      });
    });
  };
  
