import { ContactProps, MessageProps, User } from "@helpers/interfaces";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc, updateDoc, getDoc, getDocs, collection, query, where, arrayUnion } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGIN_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
}

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
        const userObject = contactSnap.data() as User;
        const contacts = userObject.contacts;
        return contacts;
    } catch (err) {
        console.error(err);
        return err;
    }
}

export const getCurrentUser = async (email: string) => {
    try {
        const userRef = doc(db, "users", email);
        const userSnap = await getDoc(userRef);
        return userSnap.data() as User;
    } catch (err) {
        console.error(err);
        return err;
    }
}

export const getMessages = async (email: string, index: number) => {
    try {
        const userRef = query(collection(db, "users"), where("email", "==", email));
        const userSnap = await getDocs(userRef);
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

const getCompanionUsers = async (contactPhone: string) => {
    try {
        const allUsers = await getAllUsers() as User[];
        const companionUsers = allUsers.find(user => user.phone === contactPhone);
        return companionUsers;
    } catch (err) {
        console.error(err);
    }
}


export const addMessage = async (email: string, index: number | null, message: MessageProps, contact: ContactProps) => {
    try {
        const contactRef = doc(db, "users", email);
        const currentContacts = await getContacts(email) as ContactProps[];
        const currentMessages = await getMessages(email, index ? index : 0);


        const companionUser = await getCompanionUsers(contact.contactPhone);
        const companionEmail = companionUser?.email;
        const companionRef = doc(db, "users", companionEmail ? companionEmail : "null");
        const companionContacts = await getContacts(companionEmail ? companionEmail : "null") as ContactProps[];
        const companionIndex = companionContacts.findIndex(item => item.contactEmail === email);
        const companionMessages = await getMessages(companionEmail ? companionEmail : "null", companionIndex ? companionIndex : 0);

        const companionIsConnected = companionContacts[companionIndex ? companionIndex : 0];

        const contactIndex = currentContacts.findIndex(item => item.contactEmail === companionEmail)
        const contacts = [...currentContacts]

        contacts[contactIndex] = {
            ...contacts[contactIndex],
            messages: [...currentMessages, message]
        }
        await updateDoc(contactRef, { contacts })

        
        const compContacts = [...companionContacts]
        
        compContacts[companionIndex] = {
            ...compContacts[companionIndex],
            messages: [...companionMessages, message]
        }

        if (companionIsConnected) {
            await updateDoc(companionRef, { contacts: [...compContacts]
            })
        } else {
            await updateDoc(companionRef, { contacts: [...compContacts]
            }).then(() => {
                updateDoc(companionRef, {
                    contacts: [...compContacts]
                })
            })

        }


        return;
    } catch (err) {
        console.error(err);
        return err;
    }
}

export const deleteAllMessages = async (email: string, index: number) => {
    try {
        const contactRef = doc(db, "users", email);
        const currentContacts = await getContacts(email) as User;

        await updateDoc(contactRef, {
            ...currentContacts,
            contacts: currentContacts.contacts.map((item: ContactProps, i: number) => {
                if (i === index) {
                    return {
                        ...item,
                        messages: []
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