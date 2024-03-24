import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth,signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore,collection,getDocs,query,doc,onSnapshot,addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
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

let x = 1;
document.getElementById("bPlus").addEventListener("click", ()=>{
      x = x + 1;
      document.getElementById("sol").value = x;
      document.getElementById("p5").innerHTML= x;
  })
document.getElementById("bMinus").addEventListener("click", ()=>{
      x = x - 1;
      document.getElementById("p5").innerHTML= x;
      document.getElementById("sol").value = x;
  
})

onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const idP = localStorage.getItem('id');  
        if(`${doc.id}`==idP){
            document.getElementById("name1").innerHTML=(`${doc.data().name}`);
            document.getElementById("name2").innerHTML=(`${doc.data().name}`);
            document.getElementById("price").innerHTML=(`${doc.data().price}`+",000đ");
            document.getElementById("prc").value=`${doc.data().price}`;
            document.getElementById("nd").innerHTML=`${doc.data().des}`;
            document.getElementById("div2_1").innerHTML= `<img src=${doc.data().image} width="400px" height="400px">`
            const button=document.getElementById("Button");
            button.addEventListener("click",async () => {
              const name=`${doc.data().name}`;
              const price=document.getElementById("prc").value;
              const docRef = await addDoc(collection(db, "cart"), {
                name: `${doc.data().name}`,
                sl: x,
                price: price*x,
                image: `${doc.data().image}`,
              });
})}})});

const open2 = document.getElementById("open2");
const modal_container_2 =  document.getElementById("modal-container-2");
open2.addEventListener("click",()=>{
  onAuthStateChanged(auth, (user) => {
      modal_container_2.classList.add("show");
  });
})

document.getElementById("btn-close-2").addEventListener("click",()=>{
  modal_container_2.classList.remove("show");
})