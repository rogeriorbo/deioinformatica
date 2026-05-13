import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
// Using initializeFirestore instead of getFirestore to pass settings
export const db = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
}, firebaseConfig.firestoreDatabaseId); 
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (error) {
        console.error("Login failed", error);
        if (error.code !== 'auth/popup-closed-by-user') {
            alert("Erro ao fazer login: " + error.message + "\n\nDica: Se você estiver visualizando dentro do editor, clique no botão 'Open in New Tab' (ícone de nova janela no canto superior da pré-visualização) para abrir o site em uma nova aba. O navegador pode bloquear popups dentro da área restrita.");
        }
        throw error;
    }
};

export const logout = async () => {
    await signOut(auth);
};
