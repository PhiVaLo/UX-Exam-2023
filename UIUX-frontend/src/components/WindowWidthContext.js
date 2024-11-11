import React, { createContext, useState, useEffect } from "react";

export const WindowWidthContext = createContext();

export const WindowWidthProvider = ({ children }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <WindowWidthContext.Provider value={windowWidth}>
            {children}
        </WindowWidthContext.Provider>
    );
};
