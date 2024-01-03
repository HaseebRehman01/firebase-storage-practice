//  "strict mode"
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
 import { getStorage , ref  ,uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
// console.log(storage)
 const firebaseConfig = {
   apiKey: "AIzaSyAlCt9QgdziE69kGc0IZnjDIqMpNvb_-OU",
   authDomain: "auth-practice-feb12.firebaseapp.com",
   projectId: "auth-practice-feb12",
   storageBucket: "auth-practice-feb12.appspot.com",
   messagingSenderId: "1019160864521",
   appId: "1:1019160864521:web:0213b8114d85409ecfd5d8"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
  // Initialize Firebase storage
 const storage = getStorage();

 


 const uploadFile = async () => {
  try {
    const file = document.querySelector("#image");
    const url = await uploadFileOnFirebaseStorage(file);
    console.log("File uploaded successfully. Download URL:", url);
  } catch (error) {
    console.error('Error during file upload:', error.message);
  }
};
//this function will never save multiple images it saves one then replace that one if updated 
const uploadFileOnFirebaseStorage = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const fileName = file.files[0].name;
      // const fileFormat = fileName.slice(fileName.lastIndexOf("."));
      const storageRef = ref(storage, `collection/id6767hgjhy`);
      const uploadTask = uploadBytesResumable(storageRef, file.files[0]);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.error('Error during upload:', error.message);
          reject(error);
        },
        async () => {
          // Upload completed successfully, now we can get the download URL
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            console.error('Error getting download URL:', error.message);
            reject(error);
          }
        }
      );
    } catch (error) {
      console.error('Error setting up upload:', error.message);
      reject(error);
    }
  });
};

// Call the function to initiate the file upload
















 
 
//  const uploadFileOnFirebaseStorage = (file)=>{
//   return new Promise((resolve,reject)=>{
//     const fileName = file.files[0].name
//     const fileFormat = fileName.slice(fileName.lastIndexOf("."))
//       const storageRef = ref(storage, `collection/id6767hgjhy${fileFormat}`);
//       const uploadTask = uploadBytesResumable(storageRef, file.files[0]);

//       // Listen for state changes, errors, and completion of the upload.
// uploadTask.on('state_changed',
// (snapshot) => {
//   // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//   console.log('Upload is ' + progress + '% done');
//   switch (snapshot.state) {
//     case 'paused':
//       console.log('Upload is paused');
//       break;
//     case 'running':
//       console.log('Upload is running');
//       break;
//   }
// }, 
// (error) => {
//   reject(error)
//   // A full list of error codes is available at
//   // https://firebase.google.com/docs/storage/web/handle-errors
//   switch (error.code) {
//     case 'storage/unauthorized':
//       // User doesn't have permission to access the object
//       break;
//     case 'storage/canceled':
//       // User canceled the upload
//       break;

//     // ...

//     case 'storage/unknown':
//       // Unknown error occurred, inspect error.serverResponse
//       break;
//   }
// }, 
// () => {
//   // Upload completed successfully, now we can get the download URL
//   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//     resolve(downloadURL)
//   });
// }
// );
//   })
//    }


//  const uploadFile = async ()=>{
//   try{
//     const file = document.querySelector("#image")
//     const url = await uploadFileOnFirebaseStorage(file)
//   }
// catch(error){
// console.log(error)
// }




//  }



 const uploadBtn = document.querySelector("#uploadBtn")

 uploadBtn.addEventListener("click",uploadFile)




 const file = document.querySelector("#image")



 file.addEventListener("change" , (e)=>{
const selectedImage = document.querySelector("#selectedImage")
selectedImage.hidden = false
const  temporaryUrl =  URL.createObjectURL(e.target.files[0]) //this method makes temporary url
console.log(temporaryUrl)
selectedImage.src = temporaryUrl 
})