import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X } from "lucide-react";
import ResumeDownload from "./ResumeDownload";

export default function ResumePanel() {
    const [isExpanded, setIsExpanded] = useState(true);
    const [hasAutoCollapsed, setHasAutoCollapsed] = useState(false);

    // Auto-collapse after 5 seconds on initial load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExpanded(false);
            setHasAutoCollapsed(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleMouseEnter = () => {
        if (hasAutoCollapsed) {
            setIsExpanded(true);
        }
    };

    const handleMouseLeave = () => {
        if (hasAutoCollapsed) {
            setIsExpanded(false);
        }
    };

    const handleClose = () => {
        setIsExpanded(false);
        setHasAutoCollapsed(true);
    };

    return (
        <div
            className="fixed right-6 top-1/2 -translate-y-1/2 z-40"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <AnimatePresence mode="wait">
                {isExpanded ? (
                    <motion.div
                        key="expanded"
                        initial={{ opacity: 0, x: 100, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.9 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1], // Professional easing curve
                        }}
                        className="relative w-72 md:w-80 max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-3rem)]"
                    >
                        {/* Close button - only show after auto-collapse */}
                        {hasAutoCollapsed && (
                            <button
                                onClick={handleClose}
                                className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground border-2 border-foreground flex items-center justify-center hover:bg-accent hover:border-accent transition-colors z-10"
                                aria-label="Close resume panel"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}

                        <ResumeDownload />
                    </motion.div>
                ) : (
                    <motion.div
                        key="collapsed"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                            duration: 0.3,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="relative group cursor-pointer"
                    >
                        {/* Collapsed icon state */}
                        <div className="w-16 h-16 bg-primary border-4 border-foreground flex items-center justify-center transition-all duration-300 group-hover:shadow-brutal">
                            <FileText className="w-8 h-8 text-primary-foreground" />
                        </div>

                        {/* Tooltip */}
                        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <div className="bg-card border-2 border-primary px-3 py-2 whitespace-nowrap">
                                <p className="font-mono text-xs text-foreground">
                                    Hover to view resume
                                </p>
                            </div>
                        </div>

                        {/* Pulse indicator */}
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse-glow" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
