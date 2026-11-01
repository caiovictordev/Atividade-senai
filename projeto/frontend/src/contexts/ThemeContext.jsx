import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [tema, setTema] = useState(() => {
        return localStorage.getItem("tema") || "dark";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", tema);
        localStorage.setItem("tema", tema);
    }, [tema]);

    function alternarTema() {
        setTema((temaAtual) =>
            temaAtual === "dark" ? "light" : "dark"
        );
    }

    return (
        <ThemeContext.Provider value={{ tema, alternarTema }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};