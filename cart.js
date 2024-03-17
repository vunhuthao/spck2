import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore,collection,getDocs,query,onSnapshot,deleteDoc,doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAQXm4jPJlv05o4qJqc41DWDEapmddo9GE",
  authDomain: "spck-3848c.firebaseapp.com",
  projectId: "spck-3848c",
  storageBucket: "spck-3848c.appspot.com",
  messagingSenderId: "1082942817239",
  appId: "1:1082942817239:web:c1693434e3dd51eecd0192",
  measurementId: "G-6E37XN59H3"
};

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const q = query(collection(db, "cart"));

const querySnapshot = await getDocs(q);

onSnapshot(q, (querySnapshot) => {
    let productCart ='';
    let tt = 0;
    querySnapshot.forEach((doc) => {
        let y = `${doc.data().sl}`*`${doc.data().price}`;
        productCart += `
        <tr>
            <td>${doc.data().name}</td>
            <td>${doc.data().price},000đ</td>
            <td>${doc.data().sl}</td>
            <td>`+y+`,000đ</td>
            <td><button id="delete_${doc.id}">Xoá</button></td>
          </tr>
        `
        tt = tt+y;
        addListener();
      });
      document.getElementById('showcart').innerHTML = productCart;
      document.getElementById('tt').innerHTML = "Tổng tiền: "+tt+",000 đồng";
  });
 const addListener = async () => {
    const queryS = await getDocs(collection(db, "cart"));
  
    queryS.forEach((data) => {
      const removeB = document.querySelector(`#delete_${data.id}`);
      removeB.addEventListener("click", async () => {
        await deleteDoc(doc(db, "cart", data.id));
      });
    });
  };

  

