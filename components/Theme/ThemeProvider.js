import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}) => {

    const [theme, setTheme] = useState("light");

    const toggleTheme = () =>{
        setTheme((previousTheme) => (previousTheme === "light" ? "dark" : "light"))
    }

    const themeStyle = theme === "light" ? lightTheme : darkTheme;

    return(
        <ThemeContext.Provider value={{theme, themeStyle, toggleTheme}}>
            {
                children
            }
        </ThemeContext.Provider>
    )
}

const lightTheme = {
    backgroundColor: "white",
    color: "black"
}

const darkTheme = {
    backgroundColor: "black",
    color: "white"
}