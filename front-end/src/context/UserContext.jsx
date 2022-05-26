import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext()

function UserProvider({ children }) {
    const { authenticaded, register } = useAuth()

    return ( 
        <Context.Provider value={{register, authenticaded }} >
            {children}
        </Context.Provider>

    )
}

export {Context, UserProvider }