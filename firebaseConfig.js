import { initializeApp } from 'firebase/app';
import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
// Using initializeFirestore instead of getFirestore to pass settings
export const db = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
}, firebaseConfig.firestoreDatabaseId); 
export const auth = getAuth(app);

export const loginWithEmail = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Email login error:", error);
        let message = "Erro ao fazer login. Verifique seu e-mail e senha.";
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            message = "E-mail ou senha incorretos.";
        } else if (error.code === 'auth/invalid-email') {
            message = "E-mail inválido.";
        }
        alert(message);
        throw error;
    }
};

export const logout = async () => {
    await signOut(auth);
};
