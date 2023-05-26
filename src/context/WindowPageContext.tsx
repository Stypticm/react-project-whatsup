import React, { createContext, useReducer, PropsWithChildren } from "react";

// Reducer
import { reducer } from "./reducers";

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

const InitialState: StateType = {
    isOpen: false,
    isBlur: false,
    isOpenDialog: false,
    chatId: null,
    chatIsOpen: false
}

const AppContext = createContext<{
    state: StateType;
    dispatch: React.Dispatch<any>;
}>({
    state: InitialState,
    dispatch: () => null
});


const AppProvider: React.FC = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(reducer, InitialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };