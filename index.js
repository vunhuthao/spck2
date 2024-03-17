import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth,signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore,collection,getDocs,onSnapshot,query,addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
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
const user = auth.currentUser;

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
const db = getFirestore(app);

const q = query(collection(db, "comment"));
const querySnapshot = await getDocs(q);
onSnapshot(q, (querySnapshot) => {
  let ndHtml ='';
  let x = 0;
  querySnapshot.forEach((doc) => {
    x=x+1;
      ndHtml += `
      <div>
       <h2>Bình luận ${x}</h1> 
       <p>${doc.data().nd}</p>       
      </div>
      `
      //console.log("nd"+`${doc.data().nd}`);
    });
    document.getElementById('show_1').innerHTML = ndHtml;
    //console.log(ndHtml);
});
const nd = document.getElementById("nd");
document.getElementById("addB2").addEventListener("click", async () => {
  if (nd!=null){
  const docRef = await addDoc(collection(db, "comment"), {
     nd: nd.value,
   });
   alert("Đã bình luận");  } else{
    alert("Nhập nội dung bình luận");
   }
});


