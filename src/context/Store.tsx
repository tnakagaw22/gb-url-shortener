import React, { createContext, useReducer } from "react";
import Reducer from './AppReducer'

import { Link } from '../models/Link';


interface IContextProps {
    state: GlobalState;
    dispatch: ({ type, payload }: { type: string, payload: any }) => void;
}

interface GlobalState  {
    links: Link[],
    isLinkLoading: boolean,
    linkLoadError: string
};

const initialState: GlobalState = {
    links: [],
    isLinkLoading: true,
    linkLoadError: ''
};

const Store = (props: any) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const value = { state, dispatch };

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
};

export const Context = createContext({} as IContextProps);
export default Store;