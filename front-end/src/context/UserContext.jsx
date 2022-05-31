import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext()

function UserProvider({ children }) {
    const { authenticaded, register, logout } = useAuth()

    return ( 
        <Context.Provider value={{register, authenticaded, logout }} >
            {children}
        </Context.Provider>

    )
}

export {Context, UserProvider }