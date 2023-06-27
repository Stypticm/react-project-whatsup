
import { Types, StateType, initialState, } from './types';

type ReducerAction = {
    type: Types;
    payload?: number | string | boolean | [];
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
        case Types.DIALOG_QUIT:
            return {
                ...state, isDialogQuit: !state.isDialogQuit
            }
        case Types.DIALOG_CREATE_CHAT:
            return {
                ...state, isDialogCreateChat: !state.isDialogCreateChat
            }
        case Types.OFF_BLUR:
            return {
                ...state, isBlur: false
            }
        case Types.CHAT_INDEX:
            return {
                ...state, chatIndex: action.payload as number
            }
        case Types.CHAT_IS_OPEN:
            return {
                ...state, chatIsOpen: true
            }
        case Types.SET_AUTH:
            return {
                ...state,
                isRegistered: !state.isRegistered
            }
        case Types.LOGIN_IN:
            return {
                ...state,
                isLoginIn: !state.isLoginIn
            }
        case Types.SET_USER:
            return {
                ...state,
                current_email: action.payload as string
            }
        case Types.SET_CONTACTS:
            return {
                ...state,
                contacts: action.payload as []
            }
        case Types.SET_MESSAGES:
            return {
                ...state,
                messages: action.payload as []
            }
        case Types.DELETE_ALL:
            return {
                ...state,
                isDialogDeleteAllMessages: !state.isDialogDeleteAllMessages
            }
        default: throw new Error('Unexpected action');
    }
}
