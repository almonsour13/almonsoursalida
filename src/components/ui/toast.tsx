import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
    message: string;
    type: "success" | "error";
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className={cn(
                "fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border",
                "min-w-[300px] max-w-[400px]",
                type === "success" 
                    ? "bg-green-50 border-green-200 text-green-800" 
                    : "bg-red-50 border-red-200 text-red-800"
            )}
        >
            {type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            ) : (
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            )}
            <p className="text-sm font-medium flex-1">{message}</p>
            <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
}
