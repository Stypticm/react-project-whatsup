import React, { createContext, useReducer, PropsWithChildren } from "react";

// Types
import { StateType, initialState } from "./types";

// Reducer
import { reducer } from "./reducers";

const AppContext = createContext<{
    state: StateType;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
});


const AppProvider: React.FC = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };