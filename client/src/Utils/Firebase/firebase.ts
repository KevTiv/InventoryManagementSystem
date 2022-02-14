import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);

export const uploadImage = (file:File, name:string, destination:string, setURL:(downloadURL:string)=>void, setUploadComplete: () => void) => {

    const spaceRef = ref(storage, `${destination}${name}`);
    const metadata = {
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
                break;
            case 'running':
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
