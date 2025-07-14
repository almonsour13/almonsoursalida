"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SectionContextType = {
    activeSection: string;
    setActiveSection: (section: string) => void;
};

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const SectionProvider = ({ children }: { children: ReactNode }) => {
    const [activeSection, setActiveSection] = useState("home");

    return (
        <SectionContext.Provider value={{ activeSection, setActiveSection }}>
            {children}
        </SectionContext.Provider>
    );
};

export const useSection = () => {
    const context = useContext(SectionContext);
    if (!context) {
        throw new Error("useSection must be used within a SectionProvider");
    }
    return context;
};
