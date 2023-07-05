// Types
export type StateType = {
    isOpen: boolean;
    isDialogQuit: boolean;
    isDialogCreateChat: boolean;
    isBlur: boolean;
    isOpenDialog: boolean;
    chatIndex: number | null;
    chatIsOpen: boolean;
    isRegistered: boolean;
    isLoginIn: boolean;
    current_email: string;
    isDialogDeleteAllMessages: boolean;
    contacts: [];
    messages: [];
}


// State initial
export const initialState: StateType = {
    isOpen: true,
    isDialogQuit: false,
    isDialogCreateChat: false,
    isBlur: false,
    isOpenDialog: false,
    chatIndex: null,
    chatIsOpen: false,
    isRegistered: true,
    isLoginIn: false,
    current_email: '',
    isDialogDeleteAllMessages: false,
    contacts: [],
    messages: [],
}

// Action
export enum Types {
    OPEN_CLOSE = 'OPEN_CLOSE',
    OPEN_CLOSE_DIALOG = 'OPEN_CLOSE_DIALOG',
    OFF_BLUR = 'OFF_BLUR',
    ADD_CHAT = 'ADD_CHAT',
    CHAT_INDEX = 'CHAT_INDEX',
    CHAT_IS_OPEN = 'CHAT_IS_OPEN',
    GET_MESSAGES = 'GET_MESSAGES',
    SET_AUTH = 'SET_AUTH',
    DIALOG_QUIT = 'DIALOG_QUIT',
    DIALOG_CREATE_CHAT = 'DIALOG_CREATE_CHAT',
    SET_CONTACTS = 'SET_CONTACTS',
    LOGIN_IN = 'LOGIN_IN',
    SET_USER = 'SET_USER',
    SET_MESSAGES = 'SET_MESSAGES',
    DELETE_ALL = 'DELETE_ALL',
}