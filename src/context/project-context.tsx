"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ProjectContextType = {
    selectedProjectTitle: string;
    setSelectedProjectTitle: (name: string) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const [selectedProjectTitle, setSelectedProjectTitle] = useState("");

    return (
        <ProjectContext.Provider
            value={{ selectedProjectTitle, setSelectedProjectTitle }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProject must be used within a ProjectProvider");
    }
    return context;
};
