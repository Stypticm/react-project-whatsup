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
        const currentContacts = await getContacts(email) as User;
        const currentMessages = await getMessages(email, index ? index : 0);

        const companionUser = await getCompanionUsers(contact.contactPhone);
        const companionEmail = companionUser?.email;
        const companionRef = doc(db, "users", companionEmail ? companionEmail : "null");
        const companionContacts = await getContacts(companionEmail ? companionEmail : "null") as User;
        const companionIndex = companionContacts?.contacts.findIndex(item => item.contactEmail === email);
        const companionMessages = await getMessages(companionEmail ? companionEmail : "null", companionIndex ? companionIndex : 0);
        const companionIsConnected = companionContacts?.contacts[companionIndex ? companionIndex : 0]

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

        if (companionIsConnected) {
            await updateDoc(companionRef, {
                ...companionContacts,
                contacts: companionContacts.contacts.map((item: ContactProps, i: number) => {
                    if (i === companionIndex) {
                        return {
                            ...item,
                            messages: [...companionMessages, message]
                        }
                    }
                    return item;
                })
            })
        } else {
            await updateDoc(companionRef, {
                ...companionContacts,
                contacts: [...companionContacts.contacts, contact]
            }).then(() => {
                updateDoc(companionRef, {
                    ...companionContacts,
                    contacts: companionContacts.contacts.map((item: ContactProps, i: number) => {
                        if (i === companionIndex) {
                            return {
                                ...item,
                                messages: [...companionMessages, message]
                            }
                        }
                        return item;
                    })
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