import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCXnnSQn19614q0gZGdgpZzSpcgvUklAwQ",
    authDomain: "messenger-31bfe.firebaseapp.com",
    projectId: "messenger-31bfe",
    storageBucket: "messenger-31bfe.appspot.com",
    messagingSenderId: "768381579238",
    appId: "1:768381579238:web:1902bac8681bec7a4a3027"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

type Message = {
    contactName: string;
    timestamp: Date;
    textMessage: string;
}

type Contact = {
    contactName: string;
    contactPhone: string;
    messages: Message[];
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    contacts: Contact[];
}


export const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const userCredential = signInWithEmailAndPassword(auth, email, password)
        return (await userCredential).user;
    } catch (err) {
        console.error(err);
        return err;
    }
};

export const registerWithEmailAndPassword = async (user: User, password: string) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, user.email, password);

        await addDoc(collection(db, "users"), {
            ...user,
            uid: response.user.uid,
            authProvider: "local"
        });

        return;
    } catch (err) {
        console.error(err);
        return err;
    }
};