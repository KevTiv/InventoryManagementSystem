import {auth} from '../Utils/Firebase/firebase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";


export const handleGoogleAuth= ( isToken: () => void )=>{

  const provider = new GoogleAuthProvider();
  
  // signInWithRedirect(auth, provider);
  // getRedirectResult(auth);
  signInWithPopup(auth, provider)
  .then((result) => {
    sessionStorage.removeItem('Auth Token');
    sessionStorage.removeItem('User Info');
    sessionStorage.removeItem('Photo Url');
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    // The signed-in user info.
    const user = result!.user.displayName;
    const photoUrl = result!.user.photoURL;

    sessionStorage.setItem('Auth Token', token!);
    sessionStorage.setItem('User Info', user!);
    sessionStorage.setItem('Photo Url', photoUrl!);
    //navigate();
    isToken();
    
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    
    console.error("ERROR MESSAGE: ",errorCode," - ",errorMessage, "User: ",email, " Cred: ",credential);
  });
}