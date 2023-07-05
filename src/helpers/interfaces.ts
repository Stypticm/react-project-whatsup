export type MessageProps = {
    contactName: string;
    timestamp: Date;
    textMessage: string;
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
    city: string;
    contacts: ContactProps[];
}