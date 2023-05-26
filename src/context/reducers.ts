// State 
type StateType = {
    isOpen: boolean;
    isBlur: boolean;
    isOpenDialog: boolean;
    chatId: null | string;
    chatIsOpen: boolean;
}

enum MessageType {
    incoming = 0,
    outgoing = 1
}

export type Message = {
    id: string;
    message: string;
    type?: MessageType;
}

export type ChatType = {
    id: string;
    contactName: string;
    avatar: string;
    lastMessage: string;
    timestamp: Date;
    messages: {
        message: Message;
    }
}

export const initialState: StateType = {
    isOpen: false,
    isBlur: false,
    isOpenDialog: false,
    chatId: null,
    chatIsOpen: false
}

// Action
export enum Types {
    OPEN_CLOSE = 'OPEN_CLOSE',
    OPEN_CLOSE_DIALOG = 'OPEN_CLOSE_DIALOG',
    BLUR = 'BLUR',
    OFF_BLUR = 'OFF_BLUR',
    ADD_CHAT = 'ADD_CHAT',
    CHAT_ID = 'CHAT_ID',
    CHAT_IS_OPEN = 'CHAT_IS_OPEN'
}

type ReducerAction = {
    type: Types;
    payload?: string | ChatType;
}

export const reducer = (state: StateType, action: ReducerAction): typeof initialState => {
    const { type } = action;
    switch (type) {
        case Types.OPEN_CLOSE:
            return {
                ...state, isOpen: false
            }
        case Types.OPEN_CLOSE_DIALOG:
            return {
                ...state, isOpenDialog: !state.isOpenDialog
            }
        case Types.BLUR:
            return {
                ...state, isBlur: !state.isBlur
            }
        case Types.OFF_BLUR:
            return {
                ...state, isBlur: false
            }
        case Types.CHAT_ID:
            return {
                ...state, chatId: action.payload as string
            }
        case Types.CHAT_IS_OPEN:
            return {
                ...state, chatIsOpen: true
            }
        default: throw new Error('Unexpected action');
    }
}
