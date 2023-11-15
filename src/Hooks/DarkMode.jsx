import { createContext, useContext, useState } from "react";

const MyContext = createContext()

export const MyProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false)
    return (
        <MyContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </MyContext.Provider>
    )
}

export const useDarkMode = () => {
    return useContext(MyContext)
}