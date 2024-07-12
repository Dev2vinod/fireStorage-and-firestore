

         // Import the functions you need from the SDKs you need
    import { initializeApp,getApp  } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";

    // firebase firestore
    import { getFirestore ,collection, addDoc,getDocs ,query, where
  
  
    } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
  
  
     /// fire storage paart
  
     import { getStorage ,ref ,uploadBytes ,uploadBytesResumable, getDownloadURL,listAll ,deleteObject 
  
  
      } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
  
  
      // fire base auth
    import {getAuth ,
       createUserWithEmailAndPassword,
       onAuthStateChanged ,
       signInWithEmailAndPassword ,
       signOut ,GoogleAuthProvider,getRedirectResult 
  
  
    } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

  
  
    const firebaseConfig = {
      apiKey: "AIzaSyAtlby0Myb4XRtKHtX0EllJsNRSoWZ6Svo",
      authDomain: "store-data-ba338.firebaseapp.com",
      projectId: "store-data-ba338",
      storageBucket: "store-data-ba338.appspot.com",
      messagingSenderId: "743729553629",
      appId: "1:743729553629:web:59507db6aa0334ac9dbb34"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);
    
    
   




     const imageCollection =collection(db,"cars")
//    const carstorageref =ref(storage,"car")
    var file =document.getElementById("file");
    var uploadBtn =document.getElementById("uploadBtn");
    var pic =document.getElementById("pic");
    var show =document.getElementById("show");
    
    
    uploadBtn.addEventListener("click",()=>{
        console.log(file.files[0].name)
        const storageRef = ref(storage, `image/${file.files[0].name}`);
        uploadBtn.disabled =true

  
    uploadBytes(storageRef, file.files[0]).then((snapshot) => {
        console.log('Uploaded a blob or file!');

        getDownloadURL(ref(storage, `image/${file.files[0].name}`))
         .then((url) => {

            // add url+category
            addDoc(imageCollection,{url,category:"car"})
            .then(()=>{
                console.log("url updated to db")
                uploadBtn.disabled =false
            })
            //  pic.src =url
            getImageFromDb()

            console.log(url)})

        .catch ((error)=>{
            console.log(error,"url error ")
        uploadBtn.disabled =true

        })   
         


      })
      .catch ((error)=>{
        console.log(error,"error in upload file" )
        uploadBtn.disabled =true

    }) 

      
    
 })

  async function getImageFromDb(){
    const querySnapshot =await getDocs(collection(db,"cars"))
    querySnapshot.forEach((doc) => {

        // <img src="alto.webp" alt="" id="pic" width="300px">
        let card =`<img src="${doc.data().url}" alt="" id="${doc.id}" width="200px"></img>`

        show.innerHTML +=card
        console.log("car url from db" ,doc.data().url)

            //  pic.src +=`${doc.data().url}`

        
    });
  }

  getImageFromDb()