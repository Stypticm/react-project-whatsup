export type MessageProps = {
    contactName: string;
    timestamp: string;
    textMessage: string;
    uid: string;
}

export type ContactProps = {
    contactName: string;
    contactPhone: string;
    contactEmail: string;
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

export interface DialogCreateFormProps {
    phoneNumber: string;
}

export interface SignUpFormValues extends User {
    password: string;
}

export interface IFormProps {
    email: string;
    password: string;
}