import { useSection } from "@/context/section-context";
import { ChevronUp } from "lucide-react";

export default function ScrollDownButton() {
    const { activeSection} = useSection();
    return (
        <button
            onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`md:hidden fixed z-30 bottom-4 right-4 cursor-pointer flex items-center justify-center w-8 h-8 p-2 rounded-full border border-foregrounds bg-card backdrop-blur-sm transform transition duration-300 ease-in-out 
                    ${
                        activeSection === "hero"
                            ? "translate-y-12"
                            : "translate-y-0"
                    }
                    
                    `}
        >
            <ChevronUp className="w-4 h-4" />
        </button>
    );
}
