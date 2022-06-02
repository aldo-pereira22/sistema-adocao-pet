import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext()

function UserProvider({ children }) {
    const { authenticaded, register, logout, login } = useAuth()

    return ( 
        <Context.Provider value={{register, authenticaded, logout, login }} >
            {children}
        </Context.Provider>

    )
}

export {Context, UserProvider }