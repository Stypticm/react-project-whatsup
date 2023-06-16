export type MessageProps = {
    contactName: string;
    timestamp: string;
    textMessage: string;
    uid: string;
}

export type ContactProps = {
    contactName: string;
    contactPhone: string;
    uid: string;
    messages: MessageProps[];
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    contacts: ContactProps[];
}