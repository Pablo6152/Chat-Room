import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from 'firebase/firestore';

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
const db = getFirestore(app);

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

async function sendMessage(roomId, user, text) {
    try {
        await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            text: text.trim(),
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error(error);
    }
}

function getMessages(roomId, callback) {
    return onSnapshot(
        query(
            collection(db, 'chat-rooms', roomId, 'messages'),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            callback(messages);
        }
    );
}

export { loginWithGoogle, sendMessage, getMessages };
