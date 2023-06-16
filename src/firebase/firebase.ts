import { ContactProps, MessageProps, User } from "@helpers/interfaces";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc, updateDoc, getDoc, getDocs, collection, query, where, arrayUnion } from "firebase/firestore";

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

export const getAllUsers = async () => {
    try {
        const usersRef = collection(db, "users");
        const usersSnap = await getDocs(usersRef);
        const users = usersSnap.docs.map(doc => doc.data());
        return users;
    } catch (err) {
        console.error(err);
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

export const getMessages = async (email: string, index: number) => {
    try {
        const userRef = query(collection(db, "users"), where("email", "==", email));
        const userSnap = await getDocs(userRef);

        // const contactRef = doc(db, "users", email)
        // const contactSnap = await getDoc(contactRef)

        const messages = userSnap.docs[0].data().contacts[index].messages;
        return messages;
    }
    catch (err) {
        console.error(err);
        return err;
    }
}

export const addContact = async (email: string, contact: ContactProps) => {
    try {
        const contactRef = doc(db, "users", email)
        await updateDoc(contactRef, {
            contacts: arrayUnion(contact)
        })
        return;
    } catch (err) {
        console.error(err);
        return err;
    }
}


export const addMessage = async (email: string, index: number | null, message: MessageProps, contact: ContactProps) => {
    try {
        const currentMessages = await getMessages(email, index ? index : 0);

        const currentContacts = await getContacts(email);

        const contactRef = doc(db, "users", email)


        await updateDoc(contactRef, {
            ...currentContacts,
            contacts: currentContacts.contacts.map((item: ContactProps, i: number) => {
                if (i === index) {
                    return {
                        ...item,
                        messages: [...currentMessages, message]
                    }
                }
                return item;
            })
        })


        return;
    } catch (err) {
        console.error(err);
        return err;
    }
}