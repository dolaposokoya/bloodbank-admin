import React, { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [SESSION_ID, SETSESSION_ID] = useState('')
    return (
        <div>
            <UserContext.Provider value={[SESSION_ID, SETSESSION_ID]}>
                {props.children}
            </UserContext.Provider>
        </div>
    )
}

