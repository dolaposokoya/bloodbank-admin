import React, { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [session, setsession] = useState('')
    return (
        <div>
            <UserContext.Provider value={[session, setsession]}>
                {props.children}
            </UserContext.Provider>
        </div>
    )
}

