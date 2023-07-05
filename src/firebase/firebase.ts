import { ContactProps, User } from "@helpers/interfaces";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc, updateDoc, getDoc } from "firebase/firestore";

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


export const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const userCredential = signInWithEmailAndPassword(auth, email, password);
        return (await userCredential).user;
    } catch (err) {
        console.error(err);
        return err;
    }
};

export const registerWithEmailAndPassword = async (user: User, password: string) => {
    try {
        await createUserWithEmailAndPassword(auth, user.email, password);

        await setDoc(doc(db, "users", user.email), {
            ...user,
            authProvider: "local"
        });
        return;
    } catch (err) {
        console.error(err);
        return err;
    }
};

export const addContact = async (email: string, contact: ContactProps) => {
    try {
        const currentContacts = await getContacts(email);

        const contactRef = doc(db, "users", email)
        await updateDoc(contactRef, {
            contacts: [
                ...currentContacts.contacts,
                {
                    ...contact
                }
            ]
        })
        return;
    } catch (err) {
        console.error(err);
        return err;
    }
}

export const getContacts = async (email: string) => {
    try {
        const contactRef = doc(db, "users", email)
        const contactSnap = await getDoc(contactRef)
        return contactSnap.data();
    } catch (err) {
        console.error(err);
        return err;
    }
}