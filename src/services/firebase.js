import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

const firebaseConfig = {
    // TODO: Add your Firebase configuration here
    apiKey: "AIzaSyCE6N8NMxDOmb_xDa5fcIlbRNmhhzgs3hs",
    authDomain: "chat-app-pba.firebaseapp.com",
    projectId: "chat-app-pba",
    storageBucket: "chat-app-pba.appspot.com",
    messagingSenderId: "1006912520166",
    appId: "1:1006912520166:web:439729c68d303fe0e1a027"
}
const app = initializeApp(firebaseConfig)

// ...


// ...

async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        const { user } = await signInWithPopup(auth, provider);

        return { uid: user.uid, displayName: user.displayName };
        
    } catch (error) {
        if (error.code !== 'auth/cancelled-popup-request') {
            console.error(error);
        }

        return null;
    }
}

export { loginWithGoogle };