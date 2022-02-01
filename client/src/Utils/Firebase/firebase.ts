import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// const { initializeAppCheck, ReCaptchaV3Provider, getToken } = require("firebase/app-check");
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.

// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider(process.env.REACT_APP_RECAPTCHA_SITE_KEY),

//   // Optional argument. If true, the SDK automatically refreshes App Check
//   // tokens as needed.
//   isTokenAutoRefreshEnabled: true
// });

// export const passToken =()=>{
//   getToken(appCheck)
//   .then(() => {
//     console.log('success')
//   })
//   .catch((err:any) => {
//     console.error(err.message)
//   })
// } 
export const uploadImage = (file:File, name:string, destination:string, setURL:(downloadURL:string)=>void, setUploadComplete: () => void) => {

    //const storageRef = ref(storage, 'images');
    // console.log(file.type, '<-- type');
    // const spaceRef = ref(storage, `image/brands/${name}`);
    const spaceRef = ref(storage, `${destination}${name}`);
    const metadata = {
        // contentType: 'image/jpeg',
        contentType: file.type,
    };
    
    const uploadTask = uploadBytesResumable(spaceRef, file, metadata);
    console.log('uploadTask : ', uploadTask)
    uploadTask.on('state_changed', 
        (snapshot: { bytesTransferred: number; totalBytes: number; state: any; }) => {
            // Observe state change events such as progress, pause, and resume
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
        (error:any) => {
            // Handle unsuccessful uploads
            console.error(error);
        }, 
        () => {
            console.log('uploadTask2 : ', uploadTask)
            
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                console.log('uploadTask.snapshot.ref: ',uploadTask.snapshot.ref);
                //setImgUrl(downloadURL);
                // setValue('brand_img', downloadURL);
                setURL(downloadURL);
                setUploadComplete();
            }).catch((error) => {
                switch (error.code) {
                    case 'storage/object-not-found':
                        console.log('File doesn\'t exist');
                        break;
                    case 'storage/unauthorized':
                        console.log('User doesn\'t have permission to access the object');
                        break;
                    case 'storage/canceled':
                        console.log('User canceled the upload');
                        break;
                    case 'storage/unknown':
                        console.log('Unknown error occurred, inspect the server response')
                        break;
                }
            });
            
        }
    );
};
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
